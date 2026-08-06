import Link from "next/link";
import { notFound } from "next/navigation";
import BookingStatusForm from "@/components/admin/BookingStatusForm";
import { getBookingById } from "@/lib/adminBookings";
import { formatEtb } from "@/lib/packages";
import {
  AD_LANGUAGE_OPTIONS,
  AD_PLATFORM_OPTIONS,
  CAMPAIGN_DURATION_OPTIONS,
  CONTENT_READY_OPTIONS,
  GOAL_OPTIONS,
  LEAD_DELIVERY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  labelForOption,
} from "@/lib/constants/booking";

export const dynamic = "force-dynamic";

function Row({ label, value, href }) {
  if (value == null || value === "") return null;
  return (
    <div>
      <dt className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
        {label}
      </dt>
      <dd className="mt-1 font-body text-sm text-navy">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

export default async function AdminBookingDetailPage({ params }) {
  let booking = null;
  try {
    booking = await getBookingById(params.id);
  } catch {
    booking = null;
  }

  if (!booking) notFound();

  const duration =
    booking.campaign_duration === "custom"
      ? booking.custom_campaign_duration || "Custom"
      : labelForOption(CAMPAIGN_DURATION_OPTIONS, booking.campaign_duration);

  const goals = Array.isArray(booking.goals)
    ? booking.goals.map((g) => labelForOption(GOAL_OPTIONS, g)).join(", ")
    : "—";

  const imageUrls = Array.isArray(booking.image_urls) ? booking.image_urls : [];

  return (
    <div>
      <Link
        href="/admin/bookings"
        className="font-body text-sm font-semibold text-navy underline-offset-2 hover:underline"
      >
        ← Back to bookings
      </Link>

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
            Booking detail
          </p>
          <h1 className="mt-1 font-display text-headline-sm font-bold text-navy">
            {booking.reference}
          </h1>
          <p className="mt-1 font-body text-sm text-neutral-gray">
            {booking.full_name} · {booking.package_title || "Package"}
            {booking.amount != null ? ` · ${formatEtb(booking.amount)}` : ""}
          </p>
        </div>
        <div className="w-full max-w-md">
          <BookingStatusForm
            bookingId={booking.id}
            initialStatus={booking.status}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1">
          <h2 className="font-display text-sm font-semibold text-navy">
            Payment
          </h2>
          <dl className="mt-4 grid gap-3">
            <Row label="Status" value={booking.status} />
            <Row
              label="Transaction ID"
              value={booking.payment_transaction_id}
            />
            <Row
              label="Payment proof"
              value={booking.payment_proof_url ? "Open receipt" : null}
              href={booking.payment_proof_url || undefined}
            />
            {booking.payment_proof_url &&
            !/\.pdf($|\?)/i.test(booking.payment_proof_url) ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={booking.payment_proof_url}
                  alt="Payment proof"
                  className="mt-1 max-h-72 rounded-lg border border-border-soft object-contain"
                />
              </div>
            ) : null}
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1">
          <h2 className="font-display text-sm font-semibold text-navy">
            Client
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row label="Name" value={booking.full_name} />
            <Row label="Phone" value={booking.phone} />
            <Row label="WhatsApp" value={booking.whatsapp_number} />
            <Row label="Email" value={booking.email} />
            <Row label="Company" value={booking.company_name} />
            <Row label="City" value={booking.city_area} />
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1">
          <h2 className="font-display text-sm font-semibold text-navy">
            Campaign
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row
              label="Platform"
              value={labelForOption(AD_PLATFORM_OPTIONS, booking.ad_platform)}
            />
            <Row
              label="Lead delivery"
              value={labelForOption(
                LEAD_DELIVERY_OPTIONS,
                booking.lead_delivery_method
              )}
            />
            <Row
              label="Leads WhatsApp"
              value={booking.leads_whatsapp_number}
            />
            <Row label="Duration" value={duration} />
            <Row
              label="Property"
              value={
                booking.property_type
                  ? labelForOption(PROPERTY_TYPE_OPTIONS, booking.property_type)
                  : null
              }
            />
            <Row label="Location" value={booking.property_location} />
            <Row label="Audience" value={booking.target_audience} />
            <Row
              label="Language"
              value={labelForOption(AD_LANGUAGE_OPTIONS, booking.ad_language)}
            />
            <Row
              label="Creatives"
              value={labelForOption(
                CONTENT_READY_OPTIONS,
                booking.has_content_ready
              )}
            />
            <Row label="Goals" value={goals} />
            <Row label="Notes" value={booking.additional_notes} />
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1">
          <h2 className="font-display text-sm font-semibold text-navy">
            Assets
          </h2>
          <dl className="mt-4 grid gap-3">
            <Row
              label="Video"
              value={booking.video_url ? "Open video" : null}
              href={booking.video_url || undefined}
            />
            <Row
              label="External link"
              value={booking.external_content_url}
              href={booking.external_content_url || undefined}
            />
            {imageUrls.length ? (
              <div>
                <dt className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
                  Images ({imageUrls.length})
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {imageUrls.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden rounded border border-border-soft"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt=""
                        className="h-20 w-20 object-cover"
                      />
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>
      </div>
    </div>
  );
}
