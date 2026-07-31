import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase";

/**
 * Look up a booking by id or reference for confirmation / failed pages.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const ref = searchParams.get("ref");

    if (!id && !ref) {
      return NextResponse.json(
        { error: "Provide id or ref query parameter" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServiceClient();

    let query = supabase.from("bookings").select(
      "id, reference, status, package_title, amount, client_name, client_email, created_at"
    );

    query = id ? query.eq("id", id) : query.eq("reference", ref);

    const { data: booking, error } = await query.maybeSingle();

    if (error) {
      console.error("booking status error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to fetch booking" },
        { status: 500 }
      );
    }

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("booking status error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch booking status" },
      { status: 500 }
    );
  }
}
