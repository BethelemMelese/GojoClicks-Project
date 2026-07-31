import { NextResponse } from "next/server";
import { generateUploadSignature } from "@/lib/cloudinary";

/**
 * Returns a Cloudinary signed upload payload.
 * The browser uploads files directly to Cloudinary using this signature.
 */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const signaturePayload = generateUploadSignature({
      folder: body.folder,
      allowedFormats: body.allowedFormats,
    });

    return NextResponse.json(signaturePayload);
  } catch (error) {
    console.error("upload-signature error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}
