import { INTEREST_AREA_OPTIONS } from "@/lib/constants/contact";
import {
  detailRow,
  emailShell,
  getFromAddress,
  getResendClient,
  getTeamNotifyTo,
  loadLogoAttachment,
} from "@/lib/email/resendShared";

function interestLabel(value) {
  return (
    INTEREST_AREA_OPTIONS.find((option) => option.value === value)?.label ||
    value ||
    "—"
  );
}

function buildContactEmailHtml(payload) {
  const bodyHtml = `
    <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#45474d;">
      A new consultation request was submitted from the Contact page.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${detailRow("Full name", payload.fullName)}
      ${detailRow("Email", payload.email)}
      ${detailRow("Company", payload.company)}
      ${detailRow("Interest", interestLabel(payload.interestArea))}
      ${detailRow("Project vision", payload.vision)}
    </table>
  `;

  return emailShell({
    eyebrow: "Contact request",
    title: "New consultation inquiry",
    bodyHtml,
    footerNote: "Reply to this email to message the client directly.",
  });
}

function buildContactEmailText(payload) {
  return [
    "New GojoClicks consultation request",
    "",
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    `Interest: ${interestLabel(payload.interestArea)}`,
    "",
    "Project vision:",
    payload.vision,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Notify the team about a contact/consultation form submission. Never throws.
 */
export async function sendContactNotification(payload) {
  const resend = getResendClient();
  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipping contact notification email."
    );
    return { skipped: true };
  }

  const to = getTeamNotifyTo();
  const from = getFromAddress();
  const replyTo = String(payload.email || "").trim() || undefined;

  try {
    const logo = loadLogoAttachment();
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo,
      subject: `Consultation request — ${payload.fullName || "Contact"}`,
      html: buildContactEmailHtml(payload),
      text: buildContactEmailText(payload),
      ...(logo ? { attachments: [logo] } : {}),
    });

    if (error) {
      console.error("Resend contact notification error:", error);
      return { ok: false, error };
    }

    console.log(
      `Contact notification emailed to ${to} (id: ${data?.id || "n/a"})`
    );
    return { ok: true, id: data?.id };
  } catch (error) {
    console.error("Resend contact notification failed:", error);
    return { ok: false, error };
  }
}
