export const UPLOAD_LIMITS = {
  logo: {
    accept: "image/png,image/jpeg,image/webp,image/svg+xml",
    allowedFormats: ["png", "jpg", "jpeg", "webp", "svg"],
    maxFiles: 1,
    maxSizeBytes: 5 * 1024 * 1024,
    resourceType: "image",
    folder: "gojoclicks/bookings/logos",
  },
  images: {
    accept: "image/png,image/jpeg,image/webp",
    allowedFormats: ["png", "jpg", "jpeg", "webp"],
    maxFiles: 8,
    maxSizeBytes: 5 * 1024 * 1024,
    resourceType: "image",
    folder: "gojoclicks/bookings/images",
  },
  video: {
    accept: "video/mp4,video/quicktime,video/webm",
    allowedFormats: ["mp4", "mov", "webm"],
    maxFiles: 1,
    maxSizeBytes: 80 * 1024 * 1024,
    resourceType: "video",
    folder: "gojoclicks/bookings/videos",
  },
  paymentProof: {
    accept: "image/png,image/jpeg,image/webp,application/pdf",
    allowedFormats: ["png", "jpg", "jpeg", "webp", "pdf"],
    maxFiles: 1,
    maxSizeBytes: 10 * 1024 * 1024,
    /** Cloudinary auto accepts image or raw PDF in one endpoint */
    resourceType: "auto",
    folder: "gojoclicks/bookings/payment-proofs",
  },
};
