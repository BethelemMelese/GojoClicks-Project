import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { createSupabaseServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const ALLOWED_STATUS = new Set(["pending", "paid", "failed", "cancelled"]);

export async function PATCH(request, { params }) {
  if (!isAdminAuthenticated()) {
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

    return NextResponse.json({ booking: data });
  } catch (error) {
    console.error("admin booking update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
