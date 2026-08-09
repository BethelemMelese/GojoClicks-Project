import Textarea from "@/components/ui/Textarea";
import { formatEtb } from "@/lib/packages";
import {
  AD_LANGUAGE_OPTIONS,
  AD_PLATFORM_OPTIONS,
  CAMPAIGN_DURATION_OPTIONS,
  GOAL_OPTIONS,
  LEAD_DELIVERY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  labelForOption,
  resolvedLeadsWhatsappNumber,
  resolvedWhatsappNumber,
} from "@/lib/constants/booking";

export default function StepConfirm({
  package: pkg,
  form,
  errors,
  onChange,
  submitError,
}) {
  const contactWhatsapp = resolvedWhatsappNumber(form);
  const leadsWhatsapp = resolvedLeadsWhatsappNumber(form);

  const summary = [
    ["Package", pkg.title],
    ["Amount", formatEtb(pkg.price)],
    ["Name", form.fullName],
    ["Email", form.email],
    ["Phone", form.phone],
    ["WhatsApp", contactWhatsapp || "—"],
    ["Company", form.companyName || "—"],
    ["City / Area", form.cityArea],
    ["Ad platform", labelForOption(AD_PLATFORM_OPTIONS, form.adPlatform)],
    [
      "Lead delivery",
      labelForOption(LEAD_DELIVERY_OPTIONS, form.leadDeliveryMethod),
    ],
    ...(form.leadDeliveryMethod === "whatsapp"
      ? [["Leads WhatsApp", leadsWhatsapp || "—"]]
      : []),
    [
      "Property type",
      form.propertyType
        ? labelForOption(PROPERTY_TYPE_OPTIONS, form.propertyType)
        : "—",
    ],
    ["Property location", form.propertyLocation || "—"],
    ["Target audience", form.targetAudience || "—"],
    [
      "Duration",
      form.campaignDuration === "custom"
        ? form.customCampaignDuration || "Custom"
        : labelForOption(CAMPAIGN_DURATION_OPTIONS, form.campaignDuration),
    ],
    ["Ad language", labelForOption(AD_LANGUAGE_OPTIONS, form.adLanguage)],
    [
      "Goals",
      form.goals
        .map((goal) => labelForOption(GOAL_OPTIONS, goal))
        .join(", "),
    ],
    form.assetMediaType === "video"
      ? [
          "Video",
          form.videoAsset?.name ||
            (form.videoAsset?.url ? "Uploaded" : "—"),
        ]
      : [
          "Images",
          Array.isArray(form.imageAssets) && form.imageAssets.length
            ? form.imageAssets.map((item) => item.name || "image").join(", ")
            : "—",
        ],
    ["External link", form.externalContentUrl || "—"],
    ["Transaction ID", form.paymentTransactionId || "—"],
    [
      "Payment proof",
      form.paymentProofAsset?.name ||
        (form.paymentProofAsset?.url ? "Uploaded" : "—"),
    ],
  ];

  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-lg border border-border-soft bg-off-white p-4 md:p-5">
        <dl className="grid gap-3 sm:grid-cols-2">
          {summary.map(([label, value]) => (
            <div key={label}>
              <dt className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-gray">
                {label}
              </dt>
              <dd className="mt-1 font-body text-sm text-navy">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Textarea
        id="additionalNotes"
        label="Additional Notes"
        placeholder="Special instructions, preferred posting dates, or highlights..."
        value={form.additionalNotes}
        onChange={onChange("additionalNotes")}
      />

      <label className="flex items-start gap-3 rounded-lg border border-border-soft p-4">
        <input
          type="checkbox"
          checked={form.termsAccepted}
          onChange={onChange("termsAccepted")}
          className="mt-1 accent-gold"
        />
        <span className="font-body text-sm text-on-surface-variant">
          I confirm I have paid for this package, agree to the GojoClicks
          advertising terms, and authorize campaign management for the selected
          package.
        </span>
      </label>
      {errors.termsAccepted ? (
        <p className="font-body text-caption text-error">{errors.termsAccepted}</p>
      ) : null}
      {submitError ? (
        <p className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 font-body text-sm text-error">
          {submitError}
        </p>
      ) : null}
    </div>
  );
}
