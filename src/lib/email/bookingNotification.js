import { readFileSync } from "fs";
import { join } from "path";
import { Resend } from "resend";
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

/**
 * Inline email logo — swap this file to change the mark in booking emails:
 *   public/brand/logo.png
 * Embedded via CID so Gmail can show it even when the site is on localhost.
 */
const EMAIL_LOGO_FILE = join(process.cwd(), "public/brand/logo.png");
const EMAIL_LOGO_CID = "gojoclicks-logo";

const DEFAULT_NOTIFY_TO = "melesebety2673@gmail.com";

function siteOrigin() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw.replace(/\/$/, "");
  }
  return `https://${raw.replace(/\/$/, "")}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatAmount(amount) {
  if (amount == null || amount === "") return null;
  const n = Number(amount);
  if (Number.isFinite(n)) {
    return `${n.toLocaleString("en-ET")} ETB`;
  }
  return `${amount} ETB`;
}

function formatDuration(booking) {
  if (booking.campaign_duration === "custom") {
    return booking.custom_campaign_duration || "Custom";
  }
  return labelForOption(
    CAMPAIGN_DURATION_OPTIONS,
    booking.campaign_duration
  );
}

function formatGoals(goals) {
  if (!Array.isArray(goals) || !goals.length) return null;
  return goals.map((g) => labelForOption(GOAL_OPTIONS, g)).join(", ");
}

function packageLabel(booking) {
  return (
    booking.package_title ||
    booking.package_slug ||
    booking.package_id ||
    "Package"
  );
}

function detailRow(label, value) {
  if (value == null || value === "") return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;width:36%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0d1b33;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

function emailShell({ eyebrow, title, referenceStrip, bodyHtml, footerNote }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f3f3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border-collapse:separate;">
          <tr>
            <td style="background:#0d1b33;border-radius:16px 16px 0 0;padding:0;">
              <div style="height:4px;background:#e8a93b;border-radius:16px 16px 0 0;font-size:0;line-height:0;">&nbsp;</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:28px 28px 22px;text-align:center;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 18px;">
                      <tr>
                        <td style="background:#ffffff;border-radius:12px;padding:12px 18px;">
                          <img src="cid:${EMAIL_LOGO_CID}" alt="GojoClicks" width="140" style="display:block;max-width:140px;height:auto;border:0;" />
                        </td>
                      </tr>
                    </table>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#e8a93b;">
                      ${escapeHtml(eyebrow)}
                    </p>
                    <h1 style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;font-weight:700;color:#ffffff;">
                      ${escapeHtml(title)}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${referenceStrip}
          <tr>
            <td style="background:#ffffff;padding:28px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background:#0d1b33;border-radius:0 0 16px 16px;padding:20px 28px;text-align:center;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#a8b3c7;">
                GojoClicks Media
              </p>
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6b7280;">
                ${escapeHtml(footerNote)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function referenceStripHtml(booking, amount) {
  const packageName = packageLabel(booking);
  return `<tr>
    <td style="background:#152a4a;padding:18px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-family:Arial,Helvetica,sans-serif;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a8b3c7;">Reference</p>
            <p style="margin:0;font-size:18px;font-weight:700;color:#ffbe4f;letter-spacing:0.02em;">${escapeHtml(booking.reference)}</p>
          </td>
          <td align="right" style="font-family:Arial,Helvetica,sans-serif;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a8b3c7;">Package</p>
            <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;">${escapeHtml(packageName)}</p>
            ${
              amount
                ? `<p style="margin:6px 0 0;font-size:14px;font-weight:600;color:#e8a93b;">${escapeHtml(amount)}</p>`
                : ""
            }
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function buildAdminEmailHtml(booking) {
  const packageName = packageLabel(booking);
  const amount = formatAmount(booking.amount);
  const duration = formatDuration(booking);
  const platform = labelForOption(AD_PLATFORM_OPTIONS, booking.ad_platform);
  const leadDelivery = labelForOption(
    LEAD_DELIVERY_OPTIONS,
    booking.lead_delivery_method
  );
  const propertyType = booking.property_type
    ? labelForOption(PROPERTY_TYPE_OPTIONS, booking.property_type)
    : null;
  const contentReady = labelForOption(
    CONTENT_READY_OPTIONS,
    booking.has_content_ready
  );
  const language = labelForOption(AD_LANGUAGE_OPTIONS, booking.ad_language);
  const goals = formatGoals(booking.goals);
  const hasMedia =
    (Array.isArray(booking.image_urls) && booking.image_urls.length > 0) ||
    Boolean(booking.video_url);
  const mediaLabel = booking.video_url
    ? "Video uploaded"
    : Array.isArray(booking.image_urls) && booking.image_urls.length
      ? `${booking.image_urls.length} image${booking.image_urls.length === 1 ? "" : "s"}`
      : null;

  const bodyHtml = `
    <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#45474d;">
      <strong style="color:#0d1b33;">${escapeHtml(booking.full_name)}</strong>
      just booked
      <strong style="color:#0d1b33;">${escapeHtml(packageName)}</strong>.
      Please verify their payment, then confirm next steps.
    </p>
    <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#e8a93b;">
      Payment to verify
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
      ${detailRow("Transaction ID", booking.payment_transaction_id)}
      ${
        booking.payment_proof_url
          ? `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;width:36%;vertical-align:top;">Proof</td>
        <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;vertical-align:top;">
          <a href="${escapeHtml(booking.payment_proof_url)}" style="color:#0d1b33;text-decoration:underline;">View receipt</a>
        </td>
      </tr>`
          : ""
      }
    </table>
    <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#e8a93b;">
      Client
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
      ${detailRow("Name", booking.full_name)}
      ${detailRow("Phone", booking.phone)}
      ${detailRow("WhatsApp", booking.whatsapp_number)}
      ${detailRow("Email", booking.email)}
      ${detailRow("Company", booking.company_name)}
      ${detailRow("City", booking.city_area)}
    </table>
    <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#e8a93b;">
      Campaign
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${detailRow("Duration", duration)}
      ${detailRow("Platform", platform)}
      ${detailRow("Lead delivery", leadDelivery)}
      ${
        booking.lead_delivery_method === "whatsapp" &&
        booking.leads_whatsapp_number
          ? detailRow("Leads WhatsApp", booking.leads_whatsapp_number)
          : ""
      }
      ${detailRow("Property", propertyType)}
      ${detailRow("Location", booking.property_location)}
      ${detailRow("Language", language)}
      ${detailRow("Creatives", contentReady)}
      ${hasMedia ? detailRow("Assets", mediaLabel) : ""}
      ${detailRow("Goals", goals)}
      ${detailRow("Notes", booking.additional_notes)}
    </table>
    ${
      booking.id
        ? `<p style="margin:22px 0 0;">
      <a href="${escapeHtml(`${siteOrigin()}/admin/bookings/${booking.id}`)}" style="display:inline-block;background:#e8a93b;color:#0d1b33;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:12px 18px;border-radius:8px;">
        Open in admin
      </a>
    </p>`
        : ""
    }
    <p style="margin:14px 0 0;font-size:12px;color:#888;line-height:1.4;">
      Verify the transaction ID and receipt, then mark the booking paid in admin.
    </p>
  `;

  return emailShell({
    eyebrow: "Booking alert",
    title: "New campaign request",
    referenceStrip: referenceStripHtml(booking, amount),
    bodyHtml,
    footerNote: "Reply to this email to message the client directly.",
  });
}

function buildAdminEmailText(booking) {
  const packageName = packageLabel(booking);
  const amount = formatAmount(booking.amount);
  const duration = formatDuration(booking);

  return [
    "New GojoClicks campaign request",
    `Reference: ${booking.reference}`,
    `Package: ${packageName}${amount ? ` · ${amount}` : ""}`,
    `Transaction ID: ${booking.payment_transaction_id || "—"}`,
    booking.payment_proof_url
      ? `Payment proof: ${booking.payment_proof_url}`
      : null,
    "",
    `Client: ${booking.full_name}`,
    `Phone: ${booking.phone}`,
    `WhatsApp: ${booking.whatsapp_number}`,
    `Email: ${booking.email}`,
    booking.company_name ? `Company: ${booking.company_name}` : null,
    `City: ${booking.city_area}`,
    "",
    `Duration: ${duration}`,
    `Platform: ${labelForOption(AD_PLATFORM_OPTIONS, booking.ad_platform)}`,
    `Lead delivery: ${labelForOption(LEAD_DELIVERY_OPTIONS, booking.lead_delivery_method)}`,
    booking.additional_notes ? `Notes: ${booking.additional_notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildCustomerEmailHtml(booking) {
  const packageName = packageLabel(booking);
  const amount = formatAmount(booking.amount);
  const firstName =
    String(booking.full_name || "")
      .trim()
      .split(/\s+/)[0] || "there";
  const confirmationUrl = `${siteOrigin()}/booking/confirmation?ref=${encodeURIComponent(booking.reference || "")}`;

  const bodyHtml = `
    <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#45474d;">
      Hi <strong style="color:#0d1b33;">${escapeHtml(firstName)}</strong>,
    </p>
    <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#45474d;">
      Thank you for booking with GojoClicks. We received your
      <strong style="color:#0d1b33;">${escapeHtml(packageName)}</strong>
      request and payment details. Our team will verify your transaction and
      contact you with next steps.
    </p>
    <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#e8a93b;">
      Your booking
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      ${detailRow("Reference", booking.reference)}
      ${detailRow("Package", packageName)}
      ${detailRow("Amount", amount)}
      ${detailRow("Transaction ID", booking.payment_transaction_id)}
      ${detailRow("Phone", booking.phone)}
      ${detailRow("WhatsApp", booking.whatsapp_number)}
    </table>
    <p style="margin:22px 0 0;">
      <a href="${escapeHtml(confirmationUrl)}" style="display:inline-block;background:#e8a93b;color:#0d1b33;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:12px 18px;border-radius:8px;">
        View confirmation
      </a>
    </p>
    <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#6b7280;">
      Keep your reference number handy. If you have questions, just reply to this email.
    </p>
  `;

  return emailShell({
    eyebrow: "Booking confirmation",
    title: "We received your booking",
    referenceStrip: referenceStripHtml(booking, amount),
    bodyHtml,
    footerNote: "Reply to this email if you need help from our team.",
  });
}

function buildCustomerEmailText(booking) {
  const packageName = packageLabel(booking);
  const amount = formatAmount(booking.amount);
  const firstName =
    String(booking.full_name || "")
      .trim()
      .split(/\s+/)[0] || "there";
  const confirmationUrl = `${siteOrigin()}/booking/confirmation?ref=${encodeURIComponent(booking.reference || "")}`;

  return [
    `Hi ${firstName},`,
    "",
    "Thank you for booking with GojoClicks. We received your request and payment details. Our team will verify your transaction and contact you with next steps.",
    "",
    `Reference: ${booking.reference}`,
    `Package: ${packageName}${amount ? ` · ${amount}` : ""}`,
    `Transaction ID: ${booking.payment_transaction_id || "—"}`,
    "",
    `View confirmation: ${confirmationUrl}`,
    "",
    "Reply to this email if you need help.",
  ].join("\n");
}

function loadLogoAttachment() {
  try {
    const content = readFileSync(EMAIL_LOGO_FILE).toString("base64");
    return {
      filename: "logo.png",
      content,
      contentId: EMAIL_LOGO_CID,
      contentType: "image/png",
    };
  } catch (error) {
    console.warn(
      `Email logo missing at ${EMAIL_LOGO_FILE} — sending without logo.`,
      error?.message
    );
    return null;
  }
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getFromAddress() {
  return (
    process.env.EMAIL_FROM || "GojoClicks <onboarding@resend.dev>"
  ).trim();
}

function getTeamNotifyTo() {
  return (process.env.BOOKING_NOTIFY_TO || DEFAULT_NOTIFY_TO).trim();
}

/**
 * Notify the team inbox. Never throws.
 */
export async function sendBookingNotification(booking) {
  const resend = getResendClient();
  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipping team booking notification."
    );
    return { skipped: true };
  }

  const to = getTeamNotifyTo();
  const from = getFromAddress();

  try {
    const logo = loadLogoAttachment();
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: booking.email || undefined,
      subject: `New booking ${booking.reference} — ${booking.full_name || "Client"}`,
      html: buildAdminEmailHtml(booking),
      text: buildAdminEmailText(booking),
      ...(logo ? { attachments: [logo] } : {}),
    });

    if (error) {
      console.error("Resend team notification error:", error);
      return { ok: false, error };
    }

    console.log(
      `Team booking notification emailed to ${to} (id: ${data?.id || "n/a"})`
    );
    return { ok: true, id: data?.id };
  } catch (error) {
    console.error("Resend team notification failed:", error);
    return { ok: false, error };
  }
}

/**
 * Send a receipt-style confirmation to the customer. Never throws.
 * Note: with Resend's onboarding@resend.dev sender, delivery is limited to
 * your Resend account email until a custom domain is verified.
 */
export async function sendCustomerBookingConfirmation(booking) {
  const resend = getResendClient();
  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipping customer confirmation email."
    );
    return { skipped: true };
  }

  const to = String(booking.email || "").trim();
  if (!to) {
    console.warn("Booking has no customer email — skipping confirmation.");
    return { skipped: true };
  }

  const from = getFromAddress();
  const teamInbox = getTeamNotifyTo();

  try {
    const logo = loadLogoAttachment();
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: teamInbox || undefined,
      subject: `We received your booking — ${booking.reference}`,
      html: buildCustomerEmailHtml(booking),
      text: buildCustomerEmailText(booking),
      ...(logo ? { attachments: [logo] } : {}),
    });

    if (error) {
      console.error("Resend customer confirmation error:", error);
      return { ok: false, error };
    }

    console.log(
      `Customer confirmation emailed to ${to} (id: ${data?.id || "n/a"})`
    );
    return { ok: true, id: data?.id };
  } catch (error) {
    console.error("Resend customer confirmation failed:", error);
    return { ok: false, error };
  }
}

function statusCopy(status) {
  switch (status) {
    case "paid":
      return {
        eyebrow: "Payment verified",
        title: "Your payment was verified",
        body: "Great news — we verified your payment. Our team will begin preparing your campaign and contact you with next steps shortly.",
      };
    case "failed":
      return {
        eyebrow: "Payment update",
        title: "We could not verify your payment",
        body: "We were unable to verify the payment details submitted with your booking. Please reply to this email with a clearer transaction ID or receipt, or contact our team for help.",
      };
    case "cancelled":
      return {
        eyebrow: "Booking cancelled",
        title: "Your booking was cancelled",
        body: "Your booking has been cancelled. If this was unexpected or you need to rebook, reply to this email and our team will help.",
      };
    case "pending":
    default:
      return {
        eyebrow: "Booking update",
        title: "Your booking is under review",
        body: "Your booking status is pending while our team reviews your payment and details. We will update you again soon.",
      };
  }
}

function statusLabel(status) {
  switch (status) {
    case "paid":
      return "Paid (verified)";
    case "failed":
      return "Failed / invalid payment";
    case "cancelled":
      return "Cancelled";
    case "pending":
      return "Pending";
    default:
      return status || "Updated";
  }
}

function statusEmailSubject(booking) {
  const status = booking.status;
  if (status === "paid") {
    return `Payment verified — ${booking.reference}`;
  }
  if (status === "failed") {
    return `Payment could not be verified — ${booking.reference}`;
  }
  if (status === "cancelled") {
    return `Booking cancelled — ${booking.reference}`;
  }
  return `Booking update — ${booking.reference}`;
}

function buildCustomerStatusEmailHtml(booking, previousStatus) {
  const amount = formatAmount(booking.amount);
  const copy = statusCopy(booking.status);
  const firstName =
    String(booking.full_name || "")
      .trim()
      .split(/\s+/)[0] || "there";
  const confirmationUrl = `${siteOrigin()}/booking/confirmation?ref=${encodeURIComponent(booking.reference || "")}`;

  const bodyHtml = `
    <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#45474d;">
      Hi <strong style="color:#0d1b33;">${escapeHtml(firstName)}</strong>,
    </p>
    <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#45474d;">
      ${escapeHtml(copy.body)}
    </p>
    <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#e8a93b;">
      Status
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      ${detailRow("Reference", booking.reference)}
      ${
        previousStatus && previousStatus !== booking.status
          ? detailRow("Previous status", statusLabel(previousStatus))
          : ""
      }
      ${detailRow("New status", statusLabel(booking.status))}
      ${detailRow("Package", packageLabel(booking))}
      ${detailRow("Amount", amount)}
      ${detailRow("Transaction ID", booking.payment_transaction_id)}
    </table>
    <p style="margin:22px 0 0;">
      <a href="${escapeHtml(confirmationUrl)}" style="display:inline-block;background:#e8a93b;color:#0d1b33;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:12px 18px;border-radius:8px;">
        View booking
      </a>
    </p>
    <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#6b7280;">
      Reply to this email if you have any questions.
    </p>
  `;

  return emailShell({
    eyebrow: copy.eyebrow,
    title: copy.title,
    referenceStrip: referenceStripHtml(booking, amount),
    bodyHtml,
    footerNote: "Reply to this email if you need help from our team.",
  });
}

function buildCustomerStatusEmailText(booking, previousStatus) {
  const amount = formatAmount(booking.amount);
  const copy = statusCopy(booking.status);
  const firstName =
    String(booking.full_name || "")
      .trim()
      .split(/\s+/)[0] || "there";
  const confirmationUrl = `${siteOrigin()}/booking/confirmation?ref=${encodeURIComponent(booking.reference || "")}`;

  return [
    `Hi ${firstName},`,
    "",
    copy.body,
    "",
    `Reference: ${booking.reference}`,
    previousStatus && previousStatus !== booking.status
      ? `Previous status: ${statusLabel(previousStatus)}`
      : null,
    `New status: ${statusLabel(booking.status)}`,
    `Package: ${packageLabel(booking)}${amount ? ` · ${amount}` : ""}`,
    `Transaction ID: ${booking.payment_transaction_id || "—"}`,
    "",
    `View booking: ${confirmationUrl}`,
    "",
    "Reply to this email if you need help.",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Notify the customer when admin changes payment/booking status. Never throws.
 */
export async function sendCustomerStatusUpdateEmail(booking, previousStatus) {
  const resend = getResendClient();
  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipping customer status update email."
    );
    return { skipped: true };
  }

  const to = String(booking.email || "").trim();
  if (!to) {
    console.warn("Booking has no customer email — skipping status email.");
    return { skipped: true };
  }

  if (previousStatus && previousStatus === booking.status) {
    return { skipped: true, reason: "unchanged" };
  }

  const from = getFromAddress();
  const teamInbox = getTeamNotifyTo();

  try {
    const logo = loadLogoAttachment();
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: teamInbox || undefined,
      subject: statusEmailSubject(booking),
      html: buildCustomerStatusEmailHtml(booking, previousStatus),
      text: buildCustomerStatusEmailText(booking, previousStatus),
      ...(logo ? { attachments: [logo] } : {}),
    });

    if (error) {
      console.error("Resend customer status email error:", error);
      return { ok: false, error };
    }

    console.log(
      `Customer status email (${booking.status}) sent to ${to} (id: ${data?.id || "n/a"})`
    );
    return { ok: true, id: data?.id };
  } catch (error) {
    console.error("Resend customer status email failed:", error);
    return { ok: false, error };
  }
}

/**
 * Send team alert + customer confirmation. Failures never block booking creation.
 */
export async function sendBookingEmails(booking) {
  const [team, customer] = await Promise.all([
    sendBookingNotification(booking),
    sendCustomerBookingConfirmation(booking),
  ]);
  return { team, customer };
}
