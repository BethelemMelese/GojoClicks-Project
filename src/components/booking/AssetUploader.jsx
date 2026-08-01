"use client";

import { useId, useRef, useState } from "react";
import { uploadToCloudinary, formatFileSize } from "@/lib/cloudinaryUpload";
import { cn } from "@/lib/utils/cn";

function normalizeItems(value, multiple) {
  if (multiple) {
    if (!Array.isArray(value)) return [];
    return value
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") return { url: item, name: fileNameFromUrl(item) };
        return {
          url: item.url,
          name: item.name || fileNameFromUrl(item.url),
          size: item.size,
        };
      })
      .filter((item) => item?.url);
  }

  if (!value) return [];
  if (typeof value === "string") {
    return [{ url: value, name: fileNameFromUrl(value) }];
  }
  return value.url
    ? [{ url: value.url, name: value.name || fileNameFromUrl(value.url), size: value.size }]
    : [];
}

function fileNameFromUrl(url) {
  try {
    const path = new URL(url).pathname;
    return decodeURIComponent(path.split("/").pop() || "file");
  } catch {
    return "file";
  }
}

/**
 * Signed Cloudinary uploader with previews.
 * Value shape: { url, name, size? } or array of those when multiple.
 */
export default function AssetUploader({
  label,
  hint,
  accept,
  allowedFormats,
  maxFiles = 1,
  maxSizeBytes,
  resourceType = "image",
  folder,
  multiple = false,
  value,
  onChange,
  onBusyChange,
  error,
}) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localError, setLocalError] = useState("");

  const items = normalizeItems(value, multiple);

  const setBusyState = (next) => {
    setBusy(next);
    onBusyChange?.(next);
  };

  const emit = (nextItems) => {
    if (multiple) onChange?.(nextItems);
    else onChange?.(nextItems[0] || null);
  };

  const validateFile = (file) => {
    if (maxSizeBytes && file.size > maxSizeBytes) {
      return `“${file.name}” is too large (max ${formatFileSize(maxSizeBytes)}).`;
    }
    return null;
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    setLocalError("");
    const remaining = maxFiles - items.length;
    if (remaining <= 0) {
      setLocalError(
        `You can upload up to ${maxFiles} file${maxFiles > 1 ? "s" : ""}.`
      );
      return;
    }

    const selected = files.slice(0, remaining);
    for (const file of selected) {
      const problem = validateFile(file);
      if (problem) {
        setLocalError(problem);
        return;
      }
    }

    setBusyState(true);
    setProgress(0);

    try {
      const uploaded = [];
      for (const file of selected) {
        const result = await uploadToCloudinary(file, {
          resourceType,
          folder,
          allowedFormats,
          onProgress: setProgress,
        });
        if (result.url) {
          uploaded.push({
            url: result.url,
            name: file.name,
            size: file.size || result.bytes,
          });
        }
      }
      emit([...items, ...uploaded].slice(0, maxFiles));
    } catch (err) {
      setLocalError(err.message || "Upload failed. Please try again.");
    } finally {
      setBusyState(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (index) => {
    emit(items.filter((_, i) => i !== index));
    setLocalError("");
  };

  const showError = error || localError;

  return (
    <div className="w-full">
      {label ? <p className="input-label">{label}</p> : null}
      {hint ? (
        <p className="-mt-1 mb-2 font-body text-caption text-neutral-gray">
          {hint}
        </p>
      ) : null}

      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!busy) handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border-soft bg-off-white px-4 py-6 text-center transition duration-300",
          "hover:border-gold/60 hover:bg-[#fff8eb]/50",
          busy && "pointer-events-none opacity-70",
          showError && "border-error/50"
        )}
      >
        <span className="font-display text-sm font-semibold text-navy">
          {busy ? `Uploading… ${progress}%` : "Click to upload or drop files"}
        </span>
        <span className="mt-1 font-body text-caption text-neutral-gray">
          {multiple ? `Up to ${maxFiles} files` : "One file"}
          {maxSizeBytes ? ` · max ${formatFileSize(maxSizeBytes)} each` : ""}
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple && maxFiles > 1}
          disabled={busy || items.length >= maxFiles}
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>

      {busy ? (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full bg-gold transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}

      {items.length > 0 ? (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {items.map((item, index) => {
            const isVideo = resourceType === "video";
            return (
              <li
                key={`${item.url}-${index}`}
                className="flex items-center gap-3 rounded-lg border border-border-soft bg-white p-2 shadow-elev1"
              >
                {isVideo ? (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-navy font-display text-[10px] font-bold uppercase text-gold">
                    Video
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body text-sm font-medium text-navy">
                    {item.name}
                  </p>
                  <p className="mt-0.5 font-body text-[11px] text-neutral-gray">
                    {item.size ? formatFileSize(item.size) : "Uploaded"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="shrink-0 rounded px-2 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-error transition hover:bg-error/5"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {showError ? (
        <p className="mt-1.5 font-body text-caption text-error">{showError}</p>
      ) : null}
    </div>
  );
}
