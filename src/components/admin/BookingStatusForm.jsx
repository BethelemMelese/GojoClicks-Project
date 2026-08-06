"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import FormSelect from "@/components/ui/FormSelect";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending (awaiting verification)" },
  { value: "paid", label: "Paid (verified)" },
  { value: "failed", label: "Failed / invalid payment" },
  { value: "cancelled", label: "Cancelled" },
];

export default function BookingStatusForm({ bookingId, initialStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus || "pending");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setStatus(initialStatus || "pending");
  }, [initialStatus]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Update failed");
      }

      const saved = data.booking?.status;
      if (saved && saved !== status) {
        throw new Error(
          `Server returned status “${saved}” instead of “${status}”.`
        );
      }

      setMessage(
        data.email?.ok === false
          ? `Status updated to ${saved || status}, but the customer email failed.`
          : data.unchanged
            ? `Status is already ${saved || status}.`
            : `Status updated to ${saved || status}. Customer notified.`
      );
      setStatus(saved || status);
      router.refresh();
      // Return to list so it refetches fresh data (avoids stale cached table)
      window.setTimeout(() => {
        router.push("/admin/bookings");
      }, 600);
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border-soft bg-white p-4 shadow-elev1"
    >
      <h2 className="font-display text-sm font-semibold text-navy">
        Payment verification
      </h2>
      <p className="mt-1 font-body text-sm text-neutral-gray">
        Check the transaction ID and receipt, then update status.
      </p>
      <div className="mt-4 space-y-3">
        <FormSelect
          id="status"
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={STATUS_OPTIONS}
        />
        {error ? <p className="font-body text-sm text-error">{error}</p> : null}
        {message ? (
          <p className="font-body text-sm text-navy">{message}</p>
        ) : null}
        <Button type="submit" variant="primary" disabled={busy}>
          {busy ? "Saving..." : "Save status"}
        </Button>
      </div>
    </form>
  );
}
