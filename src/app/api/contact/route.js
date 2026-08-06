import { NextResponse } from "next/server";
import { INTEREST_AREA_OPTIONS } from "@/lib/constants/contact";
import { sendContactNotification } from "@/lib/email/contactNotification";
import { enforceRateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const INTEREST_VALUES = new Set(INTEREST_AREA_OPTIONS.map((o) => o.value));

export async function POST(request) {
  const limited = await enforceRateLimit(request, "contact");
  if (limited) return limited;

  try {
    const body = await request.json().catch(() => ({}));
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const interestArea = String(body.interestArea || "").trim();
    const vision = String(body.vision || "").trim();

    const missing = [];
    if (!fullName) missing.push("fullName");
    if (!email) missing.push("email");
    if (!interestArea) missing.push("interestArea");
    if (!vision) missing.push("vision");

    if (missing.length) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address" },
        { status: 400 }
      );
    }

    if (!INTEREST_VALUES.has(interestArea)) {
      return NextResponse.json(
        { error: "Invalid interest area" },
        { status: 400 }
      );
    }

    const result = await sendContactNotification({
      fullName,
      email,
      company: company || null,
      interestArea,
      vision,
    });

    if (result.skipped) {
      return NextResponse.json(
        {
          error:
            "We couldn’t send your request right now. Please try again shortly or email us directly.",
        },
        { status: 503 }
      );
    }

    if (result.ok === false) {
      return NextResponse.json(
        {
          error:
            "We couldn’t send your request right now. Please try again shortly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Request received. Our team will follow up shortly.",
    });
  } catch (error) {
    console.error("contact API error:", error);
    return NextResponse.json(
      {
        error:
          "We couldn’t send your request right now. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
