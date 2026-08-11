import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { deleteBookingsByIds, listBookings } from "@/lib/adminBookings";

export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const q = searchParams.get("q") || "";
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";

    const result = await listBookings({ status, q, page, pageSize });
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("admin bookings list error:", error);
    return NextResponse.json(
      { error: error.message || "Could not load bookings" },
      { status: 500 }
    );
  }
}

/** Bulk delete: body `{ ids: string[] }` */
export async function DELETE(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const ids = Array.isArray(body.ids) ? body.ids : [];
    if (ids.length === 0) {
      return NextResponse.json(
        { error: "Provide at least one booking id in ids[]" },
        { status: 400 }
      );
    }

    const result = await deleteBookingsByIds(ids);
    return NextResponse.json(
      { ok: true, ...result },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("admin bookings bulk delete error:", error);
    return NextResponse.json(
      { error: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}
