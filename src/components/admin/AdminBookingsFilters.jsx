"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useTransition, useState } from "react";

export default function AdminBookingsFilters({
  initialStatus = "all",
  initialQuery = "",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(initialQuery);

  useEffect(() => {
    setQ(searchParams.get("q") || "");
  }, [searchParams]);

  const pushFilters = (next) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.status != null) {
      if (!next.status || next.status === "all") params.delete("status");
      else params.set("status", next.status);
    }
    if (next.q != null) {
      const value = String(next.q).trim();
      if (!value) params.delete("q");
      else params.set("q", value);
    }
    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname);
      router.refresh();
    });
  };

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const current = searchParams.get("q") || "";
      if (q === current) return;
      pushFilters({ q });
    }, 300);
    return () => window.clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        name="q"
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Search name, phone, ref, txn…"
        className="input-field min-w-[220px] flex-1"
        aria-label="Search bookings"
      />
      <select
        name="status"
        value={searchParams.get("status") || initialStatus || "all"}
        onChange={(event) => pushFilters({ status: event.target.value })}
        className="input-field w-auto"
        aria-label="Filter by status"
      >
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="failed">Failed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      {isPending ? (
        <span className="font-body text-caption text-neutral-gray">Updating…</span>
      ) : null}
    </div>
  );
}
