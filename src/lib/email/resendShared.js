import { readFileSync } from "fs";
import { join } from "path";
import { Resend } from "resend";

const EMAIL_LOGO_FILE = join(process.cwd(), "public/brand/logo.png");
export const EMAIL_LOGO_CID = "gojoclicks-logo";

const DEFAULT_NOTIFY_TO = "melesebety2673@gmail.com";

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getFromAddress() {
  return (
    process.env.EMAIL_FROM || "GojoClicks <onboarding@resend.dev>"
  ).trim();
}

export function getTeamNotifyTo() {
  return (process.env.BOOKING_NOTIFY_TO || DEFAULT_NOTIFY_TO).trim();
}

export function loadLogoAttachment() {
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

export function emailShell({ eyebrow, title, bodyHtml, footerNote }) {
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
                    <h1 style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:#ffffff;">
                      ${escapeHtml(title)}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
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

export function detailRow(label, value) {
  if (value == null || value === "") return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;width:36%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0d1b33;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}
