"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatEtb } from "@/lib/packages";

function statusClass(status) {
  if (status === "paid") return "bg-emerald-100 text-emerald-800";
  if (status === "failed") return "bg-red-100 text-red-800";
  if (status === "cancelled") return "bg-neutral-200 text-neutral-700";
  return "bg-[#fff8eb] text-[#8a5a00]";
}

export default function AdminBookingsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialStatus = searchParams.get("status") || "all";
  const initialQ = searchParams.get("q") || "";
  const initialPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const [status, setStatus] = useState(initialStatus);
  const [q, setQ] = useState(initialQ);
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const debounceRef = useRef(null);

  const syncUrl = useCallback(
    (nextStatus, nextQ, nextPage) => {
      const params = new URLSearchParams();
      if (nextStatus && nextStatus !== "all") params.set("status", nextStatus);
      if (nextQ.trim()) params.set("q", nextQ.trim());
      if (nextPage > 1) params.set("page", String(nextPage));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const loadBookings = useCallback(
    async (nextStatus, nextQ, nextPage) => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (nextStatus && nextStatus !== "all") {
          params.set("status", nextStatus);
        }
        if (nextQ.trim()) params.set("q", nextQ.trim());
        params.set("page", String(nextPage));
        params.set("pageSize", String(pageSize));

        const response = await fetch(
          `/api/admin/bookings?${params.toString()}`,
          {
            cache: "no-store",
            credentials: "same-origin",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Could not load bookings");
        }
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
        setTotal(data.total ?? 0);
        setTotalPages(data.totalPages ?? 1);
        setPage(data.page ?? nextPage);
      } catch (err) {
        setError(err.message || "Could not load bookings");
        setBookings([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    loadBookings(status, q, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onFocus = () => loadBookings(status, q, page);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [loadBookings, status, q, page]);

  const handleStatusChange = (event) => {
    const next = event.target.value;
    setStatus(next);
    setPage(1);
    syncUrl(next, q, 1);
    loadBookings(next, q, 1);
  };

  const handleSearchChange = (event) => {
    const next = event.target.value;
    setQ(next);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setPage(1);
      syncUrl(status, next, 1);
      loadBookings(status, next, 1);
    }, 300);
  };

  const goToPage = (nextPage) => {
    const safe = Math.min(totalPages, Math.max(1, nextPage));
    setPage(safe);
    syncUrl(status, q, safe);
    loadBookings(status, q, safe);
  };

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

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
        <div className="flex flex-wrap gap-2">
          <input
            value={q}
            onChange={handleSearchChange}
            placeholder="Search name, phone, ref, txn…"
            className="input-field min-w-[220px] flex-1"
          />
          <select
            value={status}
            onChange={handleStatusChange}
            className="input-field w-auto"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error ? (
        <p className="mt-6 rounded-lg border border-error/30 bg-error/5 px-4 py-3 font-body text-sm text-error">
          {error}
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
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-neutral-gray"
                >
                  Loading bookings…
                </td>
              </tr>
            ) : bookings.length === 0 ? (
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

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-sm text-neutral-gray">
          {loading
            ? "Loading…"
            : total === 0
              ? "No results"
              : `Showing ${from}–${to} of ${total}`}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={loading || page <= 1}
            className="rounded border border-border-soft bg-white px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wide text-navy transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="font-body text-sm text-navy">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={loading || page >= totalPages}
            className="rounded border border-border-soft bg-white px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wide text-navy transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
