import { Suspense } from "react";
import AdminBookingsClient from "@/components/admin/AdminBookingsClient";

export const dynamic = "force-dynamic";

export default function AdminBookingsPage() {
  return (
    <Suspense
      fallback={
        <p className="font-body text-sm text-neutral-gray">Loading bookings…</p>
      }
    >
      <AdminBookingsClient />
    </Suspense>
  );
}
