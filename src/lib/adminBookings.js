import { createSupabaseServiceClient } from "@/lib/supabase";

export async function listBookings({ status, q } = {}) {
  const supabase = createSupabaseServiceClient();
  let query = supabase
    .from("bookings")
    .select(
      "id, reference, status, package_title, amount, full_name, phone, email, payment_transaction_id, payment_proof_url, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (q && String(q).trim()) {
    const term = String(q).trim();
    query = query.or(
      `reference.ilike.%${term}%,full_name.ilike.%${term}%,phone.ilike.%${term}%,email.ilike.%${term}%,payment_transaction_id.ilike.%${term}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("listBookings error:", error);
    throw error;
  }
  return data || [];
}

export async function getBookingById(id) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getBookingById error:", error);
    throw error;
  }
  return data;
}
