import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { deleteBookingById } from "@/lib/adminBookings";
import { sendCustomerStatusUpdateEmail } from "@/lib/email/bookingNotification";
import { createSupabaseServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const ALLOWED_STATUS = new Set(["pending", "paid", "failed", "cancelled"]);

export async function DELETE(_request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params?.id;
  if (!id) {
    return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
  }

  try {
    const deleted = await deleteBookingById(id);
    if (!deleted) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json(
      { ok: true, booking: deleted },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("admin booking delete error:", error);
    return NextResponse.json(
      { error: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params?.id;
  if (!id) {
    return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const status = String(body.status || "").trim();

    if (!ALLOWED_STATUS.has(status)) {
      return NextResponse.json(
        { error: "Invalid status. Use pending, paid, failed, or cancelled." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServiceClient();

    const { data: existing, error: fetchError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) {
      console.error("admin booking fetch error:", fetchError);
      return NextResponse.json(
        { error: fetchError.message || "Could not load booking" },
        { status: 500 }
      );
    }

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const previousStatus = existing.status;

    if (previousStatus === status) {
      return NextResponse.json(
        { booking: existing, unchanged: true },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("admin booking update error:", error);
      return NextResponse.json(
        { error: error.message || "Update failed" },
        { status: 500 }
      );
    }

    // Notify customer; never fail the status update if email fails.
    const emailResult = await sendCustomerStatusUpdateEmail(
      data,
      previousStatus
    );

    return NextResponse.json(
      { booking: data, email: emailResult },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("admin booking update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
