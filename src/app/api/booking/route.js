import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase";

/**
 * Creates a booking with status "pending", then (when configured) calls the
 * external payment service and returns a payment redirect URL.
 *
 * Telebirr logic lives on the VPS payment service — not in this app.
 * Until PAYMENT_SERVICE_URL is set, this returns the booking and a stub notice.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      packageId,
      packageSlug,
      packageTitle,
      packagePrice,
      clientName,
      clientEmail,
      clientPhone,
      companyName,
      assetUrls = {},
      campaignDetails = {},
    } = body;

    if (!packageId || !clientName || !clientEmail || !clientPhone) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: packageId, clientName, clientEmail, clientPhone",
        },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServiceClient();
    const reference = `GC-${Date.now().toString(36).toUpperCase()}`;

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        reference,
        status: "pending",
        package_id: packageId,
        package_slug: packageSlug,
        package_title: packageTitle,
        amount: packagePrice,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        company_name: companyName || null,
        asset_urls: assetUrls,
        campaign_details: campaignDetails,
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

    if (!paymentServiceUrl) {
      return NextResponse.json({
        booking,
        paymentUrl: null,
        message:
          "Booking created as pending. Payment service is not configured yet (Telebirr deferred).",
      });
    }

    const paymentResponse = await fetch(`${paymentServiceUrl}/payments/start`, {
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
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
        },
      }),
    });

    if (!paymentResponse.ok) {
      const paymentError = await paymentResponse.text();
      console.error("Payment service error:", paymentError);
      return NextResponse.json(
        {
          booking,
          paymentUrl: null,
          error: "Booking saved but payment could not be started",
        },
        { status: 502 }
      );
    }

    const paymentData = await paymentResponse.json();

    return NextResponse.json({
      booking,
      paymentUrl: paymentData.paymentUrl || paymentData.url || null,
    });
  } catch (error) {
    console.error("booking error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
