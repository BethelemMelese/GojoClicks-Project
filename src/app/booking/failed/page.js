import Link from "next/link";

export const metadata = {
  title: "Payment failed — GojoClicks",
};

/**
 * Shown when payment fails or remains pending.
 * Retry action will be wired once payment service exists.
 */
export default function BookingFailedPage({ searchParams }) {
  const bookingId = searchParams?.id || null;
  const bookingRef = searchParams?.ref || null;

  return (
    <div>
      <h1>Payment not completed</h1>
      <p>
        Your payment failed or is still pending. You can retry when payment is
        connected, or return to packages.
      </p>
      <dl>
        <dt>Booking ID</dt>
        <dd>{bookingId || "—"}</dd>
        <dt>Booking reference</dt>
        <dd>{bookingRef || "—"}</dd>
      </dl>
      <p style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button type="button" disabled title="Wired when payment service exists">
          Retry payment
        </button>
        <Link href="/packages">Back to packages</Link>
      </p>
    </div>
  );
}
