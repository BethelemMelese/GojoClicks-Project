export const metadata = {
  title: "Booking confirmation — GojoClicks",
};

/**
 * After payment success (or when returning from the payment flow).
 * Reads booking status via /api/booking/status using ?id= or ?ref=.
 */
export default function BookingConfirmationPage({ searchParams }) {
  const bookingId = searchParams?.id || null;
  const bookingRef = searchParams?.ref || null;

  return (
    <div>
      <h1>Booking confirmation</h1>
      <p>
        This page will load booking status from Supabase and show package name,
        amount, and reference.
      </p>
      <dl>
        <dt>Booking ID</dt>
        <dd>{bookingId || "—"}</dd>
        <dt>Booking reference</dt>
        <dd>{bookingRef || "—"}</dd>
      </dl>
      <p style={{ fontSize: "0.9rem", opacity: 0.75 }}>
        Status lookup will call <code>/api/booking/status</code> in the next
        phase.
      </p>
    </div>
  );
}
