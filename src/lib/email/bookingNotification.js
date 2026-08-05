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

function detailRow(label, value) {
  if (value == null || value === "") return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;width:36%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0d1b33;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

function buildEmailHtml(booking) {
  const packageName =
    booking.package_title || booking.package_slug || booking.package_id || "Package";
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New booking ${escapeHtml(booking.reference)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f3f3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border-collapse:separate;">

          <!-- Brand header -->
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
                      Booking alert
                    </p>
                    <h1 style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;font-weight:700;color:#ffffff;">
                      New campaign request
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reference + package strip -->
          <tr>
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
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:28px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
              <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#45474d;">
                <strong style="color:#0d1b33;">${escapeHtml(booking.full_name)}</strong>
                just booked
                <strong style="color:#0d1b33;">${escapeHtml(packageName)}</strong>.
                Reach out to confirm and share next steps.
              </p>

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
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d1b33;border-radius:0 0 16px 16px;padding:20px 28px;text-align:center;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#a8b3c7;">
                GojoClicks · Automatic booking notification
              </p>
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6b7280;">
                Reply to this email to message the client directly.
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

function buildEmailText(booking) {
  const packageName =
    booking.package_title || booking.package_slug || booking.package_id;
  const amount = formatAmount(booking.amount);
  const duration = formatDuration(booking);

  return [
    "New GojoClicks campaign request",
    `Reference: ${booking.reference}`,
    `Package: ${packageName}${amount ? ` · ${amount}` : ""}`,
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

/**
 * Notify the team inbox. Never throws — booking creation must not fail on email errors.
 */
export async function sendBookingNotification(booking) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY is not set — skipping booking notification email. Restart the dev server after adding it to .env.local."
    );
    return { skipped: true };
  }

  const to = (process.env.BOOKING_NOTIFY_TO || DEFAULT_NOTIFY_TO).trim();
  const from = (
    process.env.EMAIL_FROM || "GojoClicks <onboarding@resend.dev>"
  ).trim();

  try {
    const resend = new Resend(apiKey);
    const logo = loadLogoAttachment();
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: booking.email || undefined,
      subject: `New booking ${booking.reference} — ${booking.full_name || "Client"}`,
      html: buildEmailHtml(booking),
      text: buildEmailText(booking),
      ...(logo ? { attachments: [logo] } : {}),
    });

    if (error) {
      console.error("Resend booking notification error:", error);
      return { ok: false, error };
    }

    console.log(
      `Booking notification emailed to ${to} (id: ${data?.id || "n/a"})`
    );
    return { ok: true, id: data?.id };
  } catch (error) {
    console.error("Resend booking notification failed:", error);
    return { ok: false, error };
  }
}
