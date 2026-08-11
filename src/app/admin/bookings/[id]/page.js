import Link from "next/link";
import { notFound } from "next/navigation";
import BookingStatusForm from "@/components/admin/BookingStatusForm";
import DeleteBookingButton from "@/components/admin/DeleteBookingButton";
import { getBookingById } from "@/lib/adminBookings";
import { formatEtb } from "@/lib/packages";
import {
  AD_LANGUAGE_OPTIONS,
  AD_PLATFORM_OPTIONS,
  CAMPAIGN_DURATION_OPTIONS,
  CONTENT_READY_OPTIONS,
  GOAL_OPTIONS,
  LEAD_DELIVERY_OPTIONS,
  META_ACCESS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  labelForOption,
} from "@/lib/constants/booking";

export const dynamic = "force-dynamic";

function Row({ label, value, href, full }) {
  if (value == null || value === "") return null;
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <dt className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
        {label}
      </dt>
      <dd className="mt-1 whitespace-pre-wrap break-words font-body text-sm text-navy">
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
          String(value)
        )}
      </dd>
    </div>
  );
}

function yesNo(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return null;
}

function parseImageUrls(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      return value ? [value] : [];
    }
  }
  return [];
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
    : booking.goals
      ? String(booking.goals)
      : null;

  const imageUrls = parseImageUrls(booking.image_urls);

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
          <DeleteBookingButton
            bookingId={booking.id}
            reference={booking.reference}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1">
          <h2 className="font-display text-sm font-semibold text-navy">
            Package
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row label="Title" value={booking.package_title} />
            <Row
              label="Amount"
              value={
                booking.amount != null ? formatEtb(booking.amount) : null
              }
            />
            <Row label="Package ID" value={booking.package_id} />
            <Row label="Slug" value={booking.package_slug} />
            <Row label="Created" value={booking.created_at
              ? new Date(booking.created_at).toLocaleString()
              : null} />
            <Row label="Updated" value={booking.updated_at
              ? new Date(booking.updated_at).toLocaleString()
              : null} />
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1">
          <h2 className="font-display text-sm font-semibold text-navy">
            Payment
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row label="Status" value={booking.status} />
            <Row
              label="Transaction ID"
              value={booking.payment_transaction_id}
            />
            <Row
              label="Payment proof"
              value={booking.payment_proof_url ? "Open receipt" : null}
              href={booking.payment_proof_url || undefined}
              full
            />
            {booking.payment_proof_url &&
            !/\.pdf($|\?)/i.test(booking.payment_proof_url) ? (
              <div className="sm:col-span-2">
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
            <Row label="Full name" value={booking.full_name} />
            <Row label="Phone" value={booking.phone} />
            <Row label="WhatsApp" value={booking.whatsapp_number} />
            <Row label="Email" value={booking.email} />
            <Row label="Company" value={booking.company_name} />
            <Row label="City / area" value={booking.city_area} />
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1">
          <h2 className="font-display text-sm font-semibold text-navy">
            Platform & leads
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row
              label="Ad platform"
              value={labelForOption(AD_PLATFORM_OPTIONS, booking.ad_platform)}
            />
            <Row
              label="Meta Business access"
              value={
                booking.meta_business_access
                  ? labelForOption(
                      META_ACCESS_OPTIONS,
                      booking.meta_business_access
                    )
                  : null
              }
            />
            <Row
              label="Facebook page"
              value={booking.facebook_page_url}
              href={booking.facebook_page_url || undefined}
              full
            />
            <Row
              label="Instagram page"
              value={booking.instagram_page_url}
              href={booking.instagram_page_url || undefined}
              full
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
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1">
          <h2 className="font-display text-sm font-semibold text-navy">
            Property & budget
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row
              label="Property type"
              value={
                booking.property_type
                  ? labelForOption(PROPERTY_TYPE_OPTIONS, booking.property_type)
                  : null
              }
            />
            <Row label="Property location" value={booking.property_location} />
            <Row label="Price range" value={booking.price_range} />
            <Row
              label="Property count"
              value={
                booking.property_count != null
                  ? String(booking.property_count)
                  : null
              }
            />
            <Row
              label="Target audience"
              value={booking.target_audience}
              full
            />
            <Row
              label="Include ad budget"
              value={yesNo(booking.include_ad_budget)}
            />
            <Row label="Desired ad budget" value={booking.desired_ad_budget} />
            <Row label="Campaign duration" value={duration} />
            <Row
              label="Custom duration"
              value={
                booking.campaign_duration === "custom"
                  ? booking.custom_campaign_duration
                  : null
              }
            />
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1">
          <h2 className="font-display text-sm font-semibold text-navy">
            Content & goals
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row
              label="Content ready"
              value={labelForOption(
                CONTENT_READY_OPTIONS,
                booking.has_content_ready
              )}
            />
            <Row
              label="Ad language"
              value={labelForOption(AD_LANGUAGE_OPTIONS, booking.ad_language)}
            />
            <Row label="Goals" value={goals} full />
            <Row
              label="External content"
              value={booking.external_content_url}
              href={booking.external_content_url || undefined}
              full
            />
            <Row
              label="Additional notes"
              value={booking.additional_notes}
              full
            />
            <Row
              label="Terms accepted"
              value={yesNo(booking.terms_accepted)}
            />
            <Row
              label="Terms accepted at"
              value={
                booking.terms_accepted_at
                  ? new Date(booking.terms_accepted_at).toLocaleString()
                  : null
              }
            />
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1 lg:col-span-2">
          <h2 className="font-display text-sm font-semibold text-navy">
            Uploaded assets
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row
              label="Logo"
              value={booking.logo_url ? "Open logo" : null}
              href={booking.logo_url || undefined}
            />
            <Row
              label="Video"
              value={booking.video_url ? "Open video" : null}
              href={booking.video_url || undefined}
            />
            {booking.logo_url ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={booking.logo_url}
                  alt="Logo"
                  className="h-20 w-20 rounded border border-border-soft object-contain"
                />
              </div>
            ) : null}
            {imageUrls.length ? (
              <div className="sm:col-span-2">
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
            ) : (
              <Row label="Images" value="None uploaded" />
            )}
          </dl>
        </section>
      </div>
    </div>
  );
}
