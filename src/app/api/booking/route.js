import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase";

const REQUIRED_FIELDS = [
  "packageId",
  "fullName",
  "phone",
  "whatsappNumber",
  "email",
  "cityArea",
  "adPlatform",
  "leadDeliveryMethod",
  "propertyType",
  "propertyLocation",
  "priceRange",
  "propertyCount",
  "targetAudience",
  "campaignDuration",
  "hasContentReady",
  "adLanguage",
  "goals",
  "termsAccepted",
];

function isUsablePaymentUrl(value) {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes("example") || trimmed.includes("ethiopia/api")) {
    // Placeholder / stub hosts — skip payment until a real VPS URL is configured
    return false;
  }
  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Creates a booking with status "pending", then (when configured) calls the
 * external payment service and returns a payment redirect URL.
 *
 * Telebirr logic lives on the VPS payment service — not in this app.
 * Payment failures must NOT fail the booking itself.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const missing = REQUIRED_FIELDS.filter((field) => {
      const value = body[field];
      if (field === "goals") {
        return !Array.isArray(value) || value.length === 0;
      }
      if (field === "termsAccepted") {
        return value !== true;
      }
      if (field === "propertyCount") {
        return value === undefined || value === null || Number(value) <= 0;
      }
      return value === undefined || value === null || value === "";
    });

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const needsOwnPage =
      body.adPlatform === "own_page" || body.adPlatform === "both";

    if (needsOwnPage && !body.facebookPageUrl && !body.instagramPageUrl) {
      return NextResponse.json(
        {
          error:
            "Provide facebookPageUrl and/or instagramPageUrl when using your own page",
        },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = createSupabaseServiceClient();
    } catch (error) {
      console.error("Supabase client error:", error);
      return NextResponse.json(
        {
          error:
            "We couldn’t submit your booking right now. Please try again in a moment.",
        },
        { status: 500 }
      );
    }

    const reference = `GC-${Date.now().toString(36).toUpperCase()}`;
    const termsAcceptedAt = new Date().toISOString();

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        reference,
        status: "pending",
        package_id: body.packageId,
        package_slug: body.packageSlug || null,
        package_title: body.packageTitle || null,
        amount: body.packagePrice ?? null,
        full_name: body.fullName,
        phone: body.phone,
        whatsapp_number: body.whatsappNumber,
        email: body.email,
        company_name: body.companyName || null,
        city_area: body.cityArea,
        ad_platform: body.adPlatform,
        facebook_page_url: body.facebookPageUrl || null,
        instagram_page_url: body.instagramPageUrl || null,
        meta_business_access: body.metaBusinessAccess || null,
        lead_delivery_method: body.leadDeliveryMethod,
        leads_whatsapp_number: body.leadsWhatsappNumber || null,
        property_type: body.propertyType,
        property_location: body.propertyLocation,
        price_range: body.priceRange,
        property_count: Number(body.propertyCount),
        target_audience: body.targetAudience,
        include_ad_budget: Boolean(body.includeAdBudget),
        desired_ad_budget: body.desiredAdBudget || null,
        campaign_duration: body.campaignDuration,
        has_content_ready: body.hasContentReady,
        external_content_url: body.externalContentUrl || null,
        ad_language: body.adLanguage,
        video_url: body.videoUrl || null,
        image_urls: Array.isArray(body.imageUrls) ? body.imageUrls : [],
        logo_url: body.logoUrl || null,
        goals: body.goals,
        additional_notes: body.additionalNotes || null,
        terms_accepted: true,
        terms_accepted_at: termsAcceptedAt,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to create booking" },
        { status: 500 }
      );
    }

    const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL;
    const paymentServiceSecret = process.env.PAYMENT_SERVICE_SECRET;

    if (!isUsablePaymentUrl(paymentServiceUrl)) {
      return NextResponse.json({
        booking,
        paymentUrl: null,
        message: "Booking received. Our team will follow up with next steps.",
      });
    }

    try {
      const base = paymentServiceUrl.replace(/\/$/, "");
      const paymentResponse = await fetch(`${base}/payments/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${paymentServiceSecret}`,
        },
        body: JSON.stringify({
          bookingId: booking.id,
          reference: booking.reference,
          amount: booking.amount,
          currency: "ETB",
          customer: {
            name: body.fullName,
            email: body.email,
            phone: body.phone,
          },
        }),
      });

      if (!paymentResponse.ok) {
        const paymentError = await paymentResponse.text();
        console.error("Payment service error:", paymentError);
        return NextResponse.json({
          booking,
          paymentUrl: null,
          message:
            "Booking received. We’ll contact you shortly to complete payment.",
        });
      }

      const paymentData = await paymentResponse.json();

      return NextResponse.json({
        booking,
        paymentUrl: paymentData.paymentUrl || paymentData.url || null,
      });
    } catch (paymentError) {
      console.error("Payment service unreachable:", paymentError);
      return NextResponse.json({
        booking,
        paymentUrl: null,
        message:
          "Booking received. We’ll contact you shortly to complete payment.",
      });
    }
  } catch (error) {
    console.error("booking error:", error);
    return NextResponse.json(
      {
        error:
          "We couldn’t submit your booking right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
