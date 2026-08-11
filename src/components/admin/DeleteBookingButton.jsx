"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function DeleteBookingButton({ bookingId, reference }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
        credentials: "same-origin",
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Delete failed");
      }
      setOpen(false);
      router.push("/admin/bookings");
      router.refresh();
    } catch (err) {
      setError(err.message || "Delete failed");
      setBusy(false);
      setOpen(false);
    }
  };

  return (
    <div className="mt-3 rounded-lg border border-error/25 bg-error/5 p-4">
      <p className="font-display text-sm font-semibold text-navy">
        Danger zone
      </p>
      <p className="mt-1 font-body text-sm text-neutral-gray">
        Permanently remove this booking from the database.
      </p>
      {error ? (
        <p className="mt-2 font-body text-sm text-error">{error}</p>
      ) : null}
      <div className="mt-3">
        <Button
          type="button"
          variant="secondary"
          disabled={busy}
          onClick={() => setOpen(true)}
          className="border-error/40 text-error hover:border-error"
        >
          Delete booking
        </Button>
      </div>

      <ConfirmDialog
        open={open}
        title="Delete booking?"
        description={
          reference
            ? `Permanently delete booking ${reference}? This cannot be undone.`
            : "Permanently delete this booking? This cannot be undone."
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        busy={busy}
        onCancel={() => {
          if (!busy) setOpen(false);
        }}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
