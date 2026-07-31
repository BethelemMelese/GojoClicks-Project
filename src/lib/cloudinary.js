import { v2 as cloudinary } from "cloudinary";

function configureCloudinary() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary env vars (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)"
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return cloudinary;
}

/**
 * Generate a signed upload payload the browser can use to upload
 * directly to Cloudinary (files never pass through this Next.js app).
 *
 * @param {object} [options]
 * @param {string} [options.folder] - Cloudinary folder, e.g. "gojoclicks/bookings"
 * @param {string[]} [options.allowedFormats]
 */
export function generateUploadSignature(options = {}) {
  const cloudinaryClient = configureCloudinary();
  const timestamp = Math.round(Date.now() / 1000);

  const paramsToSign = {
    timestamp,
    folder: options.folder || "gojoclicks/bookings",
  };

  if (options.allowedFormats?.length) {
    paramsToSign.allowed_formats = options.allowedFormats.join(",");
  }

  const signature = cloudinaryClient.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    signature,
    timestamp,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: paramsToSign.folder,
  };
}

export { configureCloudinary };
