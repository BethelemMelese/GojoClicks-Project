/**
 * Browser-side Cloudinary upload via signed endpoint.
 * Files go: browser → Cloudinary (never through Next.js body).
 */

async function getUploadSignature({ folder, allowedFormats } = {}) {
  const response = await fetch("/api/upload-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder, allowedFormats }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Could not get upload signature");
  }
  return data;
}

/**
 * @param {File} file
 * @param {object} options
 * @param {'image'|'video'|'auto'|'raw'} [options.resourceType]
 * @param {string} [options.folder]
 * @param {string[]} [options.allowedFormats]
 * @param {(pct: number) => void} [options.onProgress]
 * @returns {Promise<{ url: string, publicId: string, resourceType: string, bytes: number, format: string }>}
 */
export async function uploadToCloudinary(file, options = {}) {
  const resourceType = options.resourceType || "image";
  const folder = options.folder || `gojoclicks/bookings/${resourceType}`;

  const signature = await getUploadSignature({
    folder,
    allowedFormats: options.allowedFormats,
  });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("signature", signature.signature);
  formData.append("folder", signature.folder);

  if (options.allowedFormats?.length) {
    formData.append("allowed_formats", options.allowedFormats.join(","));
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${signature.cloudName}/${resourceType}/upload`;

  const result = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable || !options.onProgress) return;
      options.onProgress(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onload = () => {
      try {
        const payload = JSON.parse(xhr.responseText || "{}");
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(payload);
          return;
        }
        reject(
          new Error(
            payload.error?.message || `Upload failed (${xhr.status})`
          )
        );
      } catch {
        reject(new Error("Upload failed — invalid response from Cloudinary"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });

  return {
    url: result.secure_url || result.url,
    publicId: result.public_id,
    resourceType: result.resource_type || resourceType,
    bytes: result.bytes,
    format: result.format,
  };
}

export function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
