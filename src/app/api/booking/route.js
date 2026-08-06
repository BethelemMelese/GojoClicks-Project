import { NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/email/bookingNotification";
import { enforceRateLimit } from "@/lib/rateLimit";
import { createSupabaseServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const REQUIRED_FIELDS = [
  "packageId",
  "fullName",
  "phone",
  "whatsappNumber",
  "email",
  "cityArea",
  "adPlatform",
  "leadDeliveryMethod",
  "campaignDuration",
  "hasContentReady",
  "adLanguage",
  "goals",
  "paymentTransactionId",
  "paymentProofUrl",
  "termsAccepted",
];

/**
 * Creates a booking with status "pending".
 * Clients pay first and submit a transaction ID + receipt proof for manual verification.
 */
export async function POST(request) {
  const limited = await enforceRateLimit(request, "booking");
  if (limited) return limited;

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
      return value === undefined || value === null || value === "";
    });

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    if (
      body.campaignDuration === "custom" &&
      !String(body.customCampaignDuration || "").trim()
    ) {
      return NextResponse.json(
        { error: "Enter a custom campaign duration" },
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
        property_type: body.propertyType || null,
        property_location: body.propertyLocation || null,
        price_range: body.priceRange || null,
        property_count:
          body.propertyCount != null && body.propertyCount !== ""
            ? Number(body.propertyCount)
            : null,
        target_audience: body.targetAudience || null,
        include_ad_budget: Boolean(body.includeAdBudget),
        desired_ad_budget: body.desiredAdBudget || null,
        campaign_duration: body.campaignDuration || "10_days",
        custom_campaign_duration:
          body.campaignDuration === "custom"
            ? body.customCampaignDuration || null
            : null,
        has_content_ready: body.hasContentReady,
        external_content_url: body.externalContentUrl || null,
        ad_language: body.adLanguage,
        video_url: body.videoUrl || null,
        image_urls: Array.isArray(body.imageUrls) ? body.imageUrls : [],
        logo_url: body.logoUrl || null,
        goals: body.goals,
        additional_notes: body.additionalNotes || null,
        payment_transaction_id: String(body.paymentTransactionId).trim(),
        payment_proof_url: body.paymentProofUrl || null,
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

    await sendBookingEmails(booking);

    return NextResponse.json({
      booking,
      message:
        "Booking received. Our team will verify your payment and follow up shortly.",
    });
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
