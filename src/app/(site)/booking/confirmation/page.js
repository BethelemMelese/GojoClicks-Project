import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { createSupabaseServiceClient } from "@/lib/supabase";
import { formatEtb } from "@/lib/packages";

export const metadata = {
  title: "Booking confirmation — GojoClicks",
};

async function getBooking(searchParams) {
  const id = searchParams?.id || null;
  const ref = searchParams?.ref || null;
  if (!id && !ref) return null;

  try {
    const supabase = createSupabaseServiceClient();
    let query = supabase.from("bookings").select("*").limit(1);
    query = id ? query.eq("id", id) : query.eq("reference", ref);
    const { data, error } = await query.maybeSingle();
    if (error) {
      console.error("confirmation lookup error:", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("confirmation lookup error:", error);
    return null;
  }
}

export default async function BookingConfirmationPage({ searchParams }) {
  const booking = await getBooking(searchParams);
  const reference = booking?.reference || searchParams?.ref || "—";

  return (
    <section className="bg-off-white">
      <Container className="py-14 md:py-20">
        <div className="mx-auto max-w-2xl rounded-lg border border-border-soft bg-white p-6 shadow-elev2 md:p-10">
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
            Booking received
          </p>
          <h1 className="mt-3 font-display text-headline-sm font-bold text-navy md:text-headline-md">
            Thank you — we received your booking.
          </h1>
          <p className="mt-3 font-body text-body-md text-neutral-gray">
            We also sent a confirmation to your email. Our team will verify your
            payment transaction, review your details and creatives, then contact
            you with next steps. Keep your reference number for follow-up.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
                Reference
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-navy">
                {reference}
              </dd>
            </div>
            <div>
              <dt className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
                Status
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold capitalize text-navy">
                {booking?.status || "pending"}
              </dd>
            </div>
            {booking?.package_title ? (
              <div>
                <dt className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
                  Package
                </dt>
                <dd className="mt-1 font-body text-sm text-navy">
                  {booking.package_title}
                </dd>
              </div>
            ) : null}
            {booking?.amount != null ? (
              <div>
                <dt className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
                  Amount
                </dt>
                <dd className="mt-1 font-body text-sm text-navy">
                  {formatEtb(booking.amount)}
                </dd>
              </div>
            ) : null}
            {booking?.payment_transaction_id ? (
              <div className="sm:col-span-2">
                <dt className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
                  Transaction ID submitted
                </dt>
                <dd className="mt-1 font-body text-sm text-navy">
                  {booking.payment_transaction_id}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/packages">Browse packages</Button>
            <Button href="/" variant="secondary">
              Back home
            </Button>
          </div>

          {!booking && searchParams?.ref ? (
            <p className="mt-6 font-body text-caption text-neutral-gray">
              Your reference is saved. If details are still loading, refresh this
              page in a moment or contact our team with your reference number.
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
