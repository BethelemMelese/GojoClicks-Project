import Link from "next/link";
import { listBookings } from "@/lib/adminBookings";
import { formatEtb } from "@/lib/packages";

export const dynamic = "force-dynamic";

function statusClass(status) {
  if (status === "paid") return "bg-emerald-100 text-emerald-800";
  if (status === "failed") return "bg-red-100 text-red-800";
  if (status === "cancelled") return "bg-neutral-200 text-neutral-700";
  return "bg-[#fff8eb] text-[#8a5a00]";
}

export default async function AdminBookingsPage({ searchParams }) {
  const status = searchParams?.status || "all";
  const q = searchParams?.q || "";

  let bookings = [];
  let loadError = "";
  try {
    bookings = await listBookings({ status, q });
  } catch (error) {
    loadError = error.message || "Could not load bookings";
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
            Operations
          </p>
          <h1 className="mt-1 font-display text-headline-sm font-bold text-navy">
            Bookings
          </h1>
        </div>
        <form className="flex flex-wrap gap-2" method="get">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name, phone, ref, txn…"
            className="input-field min-w-[220px] flex-1"
          />
          <select name="status" defaultValue={status} className="input-field w-auto">
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded bg-gold px-4 py-2 font-display text-sm font-bold text-navy transition hover:brightness-95"
          >
            Filter
          </button>
        </form>
      </div>

      {loadError ? (
        <p className="mt-6 rounded-lg border border-error/30 bg-error/5 px-4 py-3 font-body text-sm text-error">
          {loadError}
        </p>
      ) : null}

      <div className="mt-6 overflow-x-auto rounded-lg border border-border-soft bg-white shadow-elev1">
        <table className="min-w-full text-left font-body text-sm">
          <thead className="bg-off-white text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Txn ID</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-neutral-gray"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t border-border-soft hover:bg-off-white/80"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/bookings/${booking.id}`}
                      className="font-semibold text-navy underline-offset-2 hover:underline"
                    >
                      {booking.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy">
                      {booking.full_name}
                    </div>
                    <div className="text-caption text-neutral-gray">
                      {booking.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{booking.package_title || "—"}</div>
                    <div className="text-caption text-neutral-gray">
                      {booking.amount != null ? formatEtb(booking.amount) : "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-navy">
                    {booking.payment_transaction_id || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${statusClass(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-gray">
                    {booking.created_at
                      ? new Date(booking.created_at).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
