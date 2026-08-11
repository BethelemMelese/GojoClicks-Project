"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { IconTrash } from "@/components/ui/Icons";
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
  const [selected, setSelected] = useState(() => new Set());
  const [deleting, setDeleting] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState(null);
  const debounceRef = useRef(null);
  const selectAllRef = useRef(null);

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
        setSelected(new Set());
      } catch (err) {
        setError(err.message || "Could not load bookings");
        setBookings([]);
        setTotal(0);
        setTotalPages(1);
        setSelected(new Set());
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

  const pageIds = useMemo(() => bookings.map((b) => b.id), [bookings]);
  const selectedCount = selected.size;
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const somePageSelected =
    pageIds.some((id) => selected.has(id)) && !allPageSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = somePageSelected;
    }
  }, [somePageSelected]);

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

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllOnPage = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const requestDelete = (ids) => {
    const unique = [...new Set(ids.filter(Boolean))];
    if (unique.length === 0) return;
    setPendingDeleteIds(unique);
  };

  const confirmDelete = async () => {
    const unique = pendingDeleteIds || [];
    if (unique.length === 0) return;

    setDeleting(true);
    setError("");
    try {
      const response =
        unique.length === 1
          ? await fetch(`/api/admin/bookings/${unique[0]}`, {
              method: "DELETE",
              credentials: "same-origin",
              cache: "no-store",
            })
          : await fetch("/api/admin/bookings", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              credentials: "same-origin",
              cache: "no-store",
              body: JSON.stringify({ ids: unique }),
            });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Delete failed");
      }

      const remainingOnPage = bookings.filter((b) => !unique.includes(b.id));
      const nextPage =
        remainingOnPage.length === 0 && page > 1 ? page - 1 : page;
      setPendingDeleteIds(null);
      await loadBookings(status, q, nextPage);
      if (nextPage !== page) syncUrl(status, q, nextPage);
    } catch (err) {
      setError(err.message || "Delete failed");
      setPendingDeleteIds(null);
    } finally {
      setDeleting(false);
    }
  };

  const deleteDialogDescription =
    pendingDeleteIds?.length === 1
      ? "Permanently delete this booking? This cannot be undone."
      : `Permanently delete ${pendingDeleteIds?.length || 0} selected bookings? This cannot be undone.`;

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

      {selectedCount > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-border-soft bg-off-white px-4 py-3">
          <p className="font-body text-sm text-navy">
            {selectedCount} selected
          </p>
          <button
            type="button"
            disabled={deleting}
            onClick={() => requestDelete([...selected])}
            aria-label={`Delete ${selectedCount} selected`}
            className="inline-flex items-center gap-2 rounded border border-error/40 bg-white px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wide text-error transition hover:bg-error/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconTrash className="h-3.5 w-3.5" />
            {deleting ? "Deleting…" : `Delete selected (${selectedCount})`}
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={() => setSelected(new Set())}
            className="rounded border border-border-soft bg-white px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wide text-navy transition hover:border-gold disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      ) : null}

      {error ? (
        <p className="mt-6 rounded-lg border border-error/30 bg-error/5 px-4 py-3 font-body text-sm text-error">
          {error}
        </p>
      ) : null}

      <div className="mt-6 overflow-x-auto rounded-lg border border-border-soft bg-white shadow-elev1">
        <table className="min-w-full text-left font-body text-sm">
          <thead className="bg-off-white text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={toggleAllOnPage}
                  disabled={loading || bookings.length === 0 || deleting}
                  aria-label="Select all on this page"
                  className="h-4 w-4 accent-navy"
                />
              </th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Txn ID</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-neutral-gray"
                >
                  Loading bookings…
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
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
                    <input
                      type="checkbox"
                      checked={selected.has(booking.id)}
                      onChange={() => toggleOne(booking.id)}
                      disabled={deleting}
                      aria-label={`Select ${booking.reference}`}
                      className="h-4 w-4 accent-navy"
                    />
                  </td>
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
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() => requestDelete([booking.id])}
                      aria-label={`Delete ${booking.reference}`}
                      title="Delete"
                      className="inline-flex rounded p-1.5 text-error transition hover:bg-error/10 disabled:opacity-50"
                    >
                      <IconTrash className="h-4 w-4" />
                    </button>
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
            disabled={loading || deleting || page <= 1}
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
            disabled={loading || deleting || page >= totalPages}
            className="rounded border border-border-soft bg-white px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wide text-navy transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
      <ConfirmDialog
        open={Boolean(pendingDeleteIds?.length)}
        title="Delete booking?"
        description={deleteDialogDescription}
        confirmLabel={
          pendingDeleteIds?.length > 1
            ? `Delete ${pendingDeleteIds.length}`
            : "Delete"
        }
        cancelLabel="Cancel"
        busy={deleting}
        onCancel={() => {
          if (!deleting) setPendingDeleteIds(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
