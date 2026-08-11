import { createSupabaseServiceClient } from "@/lib/supabase";

const DEFAULT_PAGE_SIZE = 10;

function applyBookingFilters(query, { status, q }) {
  let next = query;
  if (status && status !== "all") {
    next = next.eq("status", status);
  }

  if (q && String(q).trim()) {
    const term = String(q).trim();
    next = next.or(
      `reference.ilike.%${term}%,full_name.ilike.%${term}%,phone.ilike.%${term}%,email.ilike.%${term}%,payment_transaction_id.ilike.%${term}%`
    );
  }

  return next;
}

export async function listBookings({
  status,
  q,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
} = {}) {
  const supabase = createSupabaseServiceClient();
  const safePage = Math.max(1, Number(page) || 1);
  const safeSize = Math.min(50, Math.max(1, Number(pageSize) || DEFAULT_PAGE_SIZE));
  const from = (safePage - 1) * safeSize;
  const to = from + safeSize - 1;

  let query = supabase
    .from("bookings")
    .select(
      "id, reference, status, package_title, amount, full_name, phone, email, payment_transaction_id, payment_proof_url, created_at",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  query = applyBookingFilters(query, { status, q });

  const { data, error, count } = await query;
  if (error) {
    console.error("listBookings error:", error);
    throw error;
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / safeSize));

  return {
    bookings: data || [],
    total,
    page: safePage,
    pageSize: safeSize,
    totalPages,
  };
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

export async function deleteBookingById(id) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .select("id, reference")
    .maybeSingle();

  if (error) {
    console.error("deleteBookingById error:", error);
    throw error;
  }
  return data;
}

/**
 * @param {string[]} ids
 * @returns {Promise<{ deleted: number, ids: string[] }>}
 */
export async function deleteBookingsByIds(ids) {
  const unique = [...new Set((ids || []).map(String).filter(Boolean))];
  if (unique.length === 0) {
    return { deleted: 0, ids: [] };
  }
  if (unique.length > 100) {
    throw new Error("You can delete at most 100 bookings at once");
  }

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .in("id", unique)
    .select("id");

  if (error) {
    console.error("deleteBookingsByIds error:", error);
    throw error;
  }

  const deletedIds = (data || []).map((row) => row.id);
  return { deleted: deletedIds.length, ids: deletedIds };
}
