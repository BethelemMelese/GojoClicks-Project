export const BOOKING_STEPS = [
  { id: "contact", label: "You" },
  { id: "platform", label: "Platform" },
  { id: "property", label: "Property" },
  { id: "assets", label: "Assets" },
  { id: "confirm", label: "Confirm" },
];

export const TOTAL_BOOKING_STEPS = BOOKING_STEPS.length;

export const AD_PLATFORM_OPTIONS = [
  { value: "gojoclicks", label: "GojoClicks page" },
  { value: "own_page", label: "My own page" },
  { value: "both", label: "Both" },
];

export const META_ACCESS_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not_sure", label: "Not sure" },
];

export const LEAD_DELIVERY_OPTIONS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone_calls", label: "Phone calls" },
  { value: "messenger", label: "Messenger" },
  { value: "instagram_dm", label: "Instagram DM" },
  { value: "email", label: "Email" },
  { value: "dashboard", label: "GojoClicks Dashboard" },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: "apartment", label: "Apartment" },
  { value: "villa_house", label: "Villa / House" },
  { value: "condominium", label: "Condominium" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "office", label: "Office" },
  { value: "other", label: "Other" },
];

export const CAMPAIGN_DURATION_OPTIONS = [
  { value: "10_days", label: "10 days" },
  // { value: "7_days", label: "7 days" },
  { value: "15_days", label: "15 days" },
  { value: "20_days", label: "20 days" },
  { value: "40_days", label: "40 days" },
  { value: "custom", label: "Custom" },
];

export const CONTENT_READY_OPTIONS = [
  { value: "yes", label: "Yes, content is ready" },
  { value: "needs_creation", label: "Need GojoClicks to create it" },
];

export const ASSET_MEDIA_OPTIONS = [
  { value: "images", label: "Images" },
  { value: "video", label: "Video" },
];

export const AD_LANGUAGE_OPTIONS = [
  { value: "amharic", label: "Amharic" },
  { value: "english", label: "English" },
  { value: "both", label: "Both" },
];

export const GOAL_OPTIONS = [
  { value: "leads", label: "Generate leads" },
  { value: "brand_awareness", label: "Brand awareness" },
  { value: "property_sales", label: "Property sales" },
  { value: "website_traffic", label: "Website traffic" },
  { value: "engagement", label: "Social engagement" },
];

/** Contact WhatsApp used for team follow-up. */
export function resolvedWhatsappNumber(form) {
  if (form.whatsappSameAsPhone !== false) {
    return String(form.phone || "").trim();
  }
  return String(form.whatsappNumber || "").trim();
}

/** WhatsApp inbox for campaign leads (when delivery method is WhatsApp). */
export function resolvedLeadsWhatsappNumber(form) {
  if (form.leadDeliveryMethod !== "whatsapp") return null;
  if (form.leadsWhatsappSameAsContact !== false) {
    return resolvedWhatsappNumber(form) || null;
  }
  return String(form.leadsWhatsappNumber || "").trim() || null;
}

export function createInitialBookingForm() {
  return {
    fullName: "",
    phone: "",
    whatsappSameAsPhone: true,
    whatsappNumber: "",
    email: "",
    companyName: "",
    cityArea: "",
    adPlatform: "gojoclicks",
    facebookPageUrl: "",
    instagramPageUrl: "",
    metaBusinessAccess: "not_sure",
    leadDeliveryMethod: "whatsapp",
    leadsWhatsappSameAsContact: true,
    leadsWhatsappNumber: "",
    propertyType: "",
    propertyLocation: "",
    targetAudience: "",
    includeAdBudget: false,
    desiredAdBudget: "",
    campaignDuration: "10_days",
    customCampaignDuration: "",
    hasContentReady: "yes",
    /** @type {"images" | "video"} */
    assetMediaType: "images",
    externalContentUrl: "",
    adLanguage: "both",
    /** @type {{ url: string, name: string, size?: number } | null} */
    logoAsset: null,
    /** @type {{ url: string, name: string, size?: number }[]} */
    imageAssets: [],
    /** @type {{ url: string, name: string, size?: number } | null} */
    videoAsset: null,
    goals: ["leads"],
    additionalNotes: "",
    paymentTransactionId: "",
    /** @type {{ url: string, name: string, size?: number } | null} */
    paymentProofAsset: null,
    termsAccepted: false,
  };
}

function assetUrl(asset) {
  if (!asset) return "";
  if (typeof asset === "string") return asset;
  return asset.url || "";
}

function requireTrimmed(value, message, errors, key) {
  if (!String(value || "").trim()) errors[key] = message;
}

export function validateBookingStep(step, form) {
  const errors = {};
  const needsOwnPage =
    form.adPlatform === "own_page" || form.adPlatform === "both";

  // 1 — Contact
  if (step === 1) {
    requireTrimmed(form.fullName, "Full name is required", errors, "fullName");
    requireTrimmed(form.phone, "Phone number is required", errors, "phone");
    if (form.whatsappSameAsPhone === false) {
      requireTrimmed(
        form.whatsappNumber,
        "WhatsApp number is required",
        errors,
        "whatsappNumber"
      );
    }
    requireTrimmed(form.email, "Email is required", errors, "email");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Enter a valid email";
    }
    requireTrimmed(form.cityArea, "City / area is required", errors, "cityArea");
  }

  // 2 — Platform & leads
  if (step === 2) {
    if (!form.adPlatform) errors.adPlatform = "Select an ad platform";
    if (
      needsOwnPage &&
      !form.facebookPageUrl.trim() &&
      !form.instagramPageUrl.trim()
    ) {
      errors.facebookPageUrl = "Add Facebook and/or Instagram page URL";
    }
    if (!form.leadDeliveryMethod) {
      errors.leadDeliveryMethod = "Select how leads should be delivered";
    }
    if (
      form.leadDeliveryMethod === "whatsapp" &&
      form.leadsWhatsappSameAsContact === false
    ) {
      requireTrimmed(
        form.leadsWhatsappNumber,
        "WhatsApp number for leads is required",
        errors,
        "leadsWhatsappNumber"
      );
    }
  }

  // 3 — Property & budget (optional; custom duration needs a value when selected)
  if (step === 3) {
    if (
      form.campaignDuration === "custom" &&
      !String(form.customCampaignDuration || "").trim()
    ) {
      errors.customCampaignDuration = "Enter your custom campaign duration";
    }
  }

  // 4 — Assets & goals
  if (step === 4) {
    if (!form.hasContentReady) {
      errors.hasContentReady = "Tell us if content is ready";
    }
    if (!form.adLanguage) errors.adLanguage = "Select ad language";
    if (!Array.isArray(form.goals) || form.goals.length === 0) {
      errors.goals = "Select at least one campaign goal";
    }

    if (form.hasContentReady === "yes") {
      const hasImages =
        Array.isArray(form.imageAssets) &&
        form.imageAssets.some((item) => assetUrl(item));
      const hasVideo = Boolean(assetUrl(form.videoAsset));
      const hasLink = Boolean(String(form.externalContentUrl || "").trim());
      const mediaType = form.assetMediaType === "video" ? "video" : "images";
      const hasUpload = mediaType === "video" ? hasVideo : hasImages;

      if (!hasUpload && !hasLink) {
        errors.assets =
          mediaType === "video"
            ? "Upload a video, or add an external link."
            : "Upload at least one image, or add an external link.";
      }
    }
  }

  // 5 — Confirm + payment proof
  if (step === 5) {
    requireTrimmed(
      form.paymentTransactionId,
      "Enter your transaction / reference ID",
      errors,
      "paymentTransactionId"
    );
    if (!assetUrl(form.paymentProofAsset)) {
      errors.paymentProofAsset =
        "Upload a payment screenshot or PDF receipt";
    }
    if (form.termsAccepted !== true) {
      errors.termsAccepted = "Please accept the terms to continue";
    }
  }

  return errors;
}

export function buildBookingPayload(form, pkg) {
  const imageUrls = Array.isArray(form.imageAssets)
    ? form.imageAssets.map((item) => assetUrl(item)).filter(Boolean)
    : [];

  return {
    packageId: pkg.id || pkg._id || pkg.slug,
    packageSlug: pkg.slug || null,
    packageTitle: pkg.title || null,
    packagePrice: pkg.price ?? null,
    fullName: form.fullName.trim(),
    phone: form.phone.trim(),
    whatsappNumber: resolvedWhatsappNumber(form),
    email: form.email.trim(),
    companyName: form.companyName.trim() || null,
    cityArea: form.cityArea.trim(),
    adPlatform: form.adPlatform,
    facebookPageUrl: form.facebookPageUrl.trim() || null,
    instagramPageUrl: form.instagramPageUrl.trim() || null,
    metaBusinessAccess: form.metaBusinessAccess || null,
    leadDeliveryMethod: form.leadDeliveryMethod,
    leadsWhatsappNumber: resolvedLeadsWhatsappNumber(form),
    propertyType: form.propertyType || null,
    propertyLocation: form.propertyLocation.trim() || null,
    priceRange: null,
    propertyCount: null,
    targetAudience: form.targetAudience.trim() || null,
    includeAdBudget: Boolean(form.includeAdBudget),
    desiredAdBudget: form.desiredAdBudget.trim() || null,
    campaignDuration: form.campaignDuration || "10_days",
    customCampaignDuration:
      form.campaignDuration === "custom"
        ? form.customCampaignDuration.trim() || null
        : null,
    hasContentReady: form.hasContentReady,
    externalContentUrl: form.externalContentUrl.trim() || null,
    adLanguage: form.adLanguage,
    videoUrl: assetUrl(form.videoAsset) || null,
    imageUrls,
    logoUrl: assetUrl(form.logoAsset) || null,
    goals: form.goals,
    additionalNotes: form.additionalNotes.trim() || null,
    paymentTransactionId: form.paymentTransactionId.trim(),
    paymentProofUrl: assetUrl(form.paymentProofAsset) || null,
    termsAccepted: true,
  };
}

export function labelForOption(options, value) {
  return options.find((option) => option.value === value)?.label || value || "—";
}
