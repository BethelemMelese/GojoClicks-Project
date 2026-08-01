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
  { value: "dashboard", label: "Dashboard" },
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
  { value: "7_days", label: "7 days" },
  { value: "15_days", label: "15 days" },
  { value: "30_days", label: "30 days" },
  { value: "60_days", label: "60 days" },
  { value: "custom", label: "Custom" },
];

export const CONTENT_READY_OPTIONS = [
  { value: "yes", label: "Yes, content is ready" },
  { value: "needs_creation", label: "Need GojoClicks to create it" },
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

export function createInitialBookingForm(pkg) {
  const duration = String(pkg?.duration || "").toLowerCase();
  let campaignDuration = "15_days";
  if (duration.includes("7")) campaignDuration = "7_days";
  else if (duration.includes("30")) campaignDuration = "30_days";
  else if (duration.includes("60")) campaignDuration = "60_days";

  return {
    fullName: "",
    phone: "",
    whatsappNumber: "",
    email: "",
    companyName: "",
    cityArea: "",
    adPlatform: "gojoclicks",
    facebookPageUrl: "",
    instagramPageUrl: "",
    metaBusinessAccess: "not_sure",
    leadDeliveryMethod: "whatsapp",
    leadsWhatsappNumber: "",
    propertyType: "apartment",
    propertyLocation: "",
    priceRange: "",
    propertyCount: "1",
    targetAudience: "",
    includeAdBudget: false,
    desiredAdBudget: "",
    campaignDuration,
    hasContentReady: "yes",
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
    requireTrimmed(
      form.whatsappNumber,
      "WhatsApp number is required",
      errors,
      "whatsappNumber"
    );
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
      !form.leadsWhatsappNumber.trim()
    ) {
      errors.leadsWhatsappNumber = "WhatsApp number for leads is required";
    }
  }

  // 3 — Property & budget
  if (step === 3) {
    if (!form.propertyType) errors.propertyType = "Select a property type";
    requireTrimmed(
      form.propertyLocation,
      "Property location is required",
      errors,
      "propertyLocation"
    );
    requireTrimmed(form.priceRange, "Price range is required", errors, "priceRange");
    if (!form.propertyCount || Number(form.propertyCount) <= 0) {
      errors.propertyCount = "Enter a valid property count";
    }
    requireTrimmed(
      form.targetAudience,
      "Target audience is required",
      errors,
      "targetAudience"
    );
    if (!form.campaignDuration) {
      errors.campaignDuration = "Select campaign duration";
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
      const hasUpload =
        Boolean(assetUrl(form.logoAsset)) ||
        Boolean(assetUrl(form.videoAsset)) ||
        (Array.isArray(form.imageAssets) &&
          form.imageAssets.some((item) => assetUrl(item)));
      const hasLink = Boolean(String(form.externalContentUrl || "").trim());
      if (!hasUpload && !hasLink) {
        errors.assets =
          "Upload at least one asset (logo, images, or video), or add an external link.";
      }
    }
  }

  // 5 — Confirm
  if (step === 5 && form.termsAccepted !== true) {
    errors.termsAccepted = "Please accept the terms to continue";
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
    whatsappNumber: form.whatsappNumber.trim(),
    email: form.email.trim(),
    companyName: form.companyName.trim() || null,
    cityArea: form.cityArea.trim(),
    adPlatform: form.adPlatform,
    facebookPageUrl: form.facebookPageUrl.trim() || null,
    instagramPageUrl: form.instagramPageUrl.trim() || null,
    metaBusinessAccess: form.metaBusinessAccess || null,
    leadDeliveryMethod: form.leadDeliveryMethod,
    leadsWhatsappNumber: form.leadsWhatsappNumber.trim() || null,
    propertyType: form.propertyType,
    propertyLocation: form.propertyLocation.trim(),
    priceRange: form.priceRange.trim(),
    propertyCount: Number(form.propertyCount),
    targetAudience: form.targetAudience.trim(),
    includeAdBudget: Boolean(form.includeAdBudget),
    desiredAdBudget: form.desiredAdBudget.trim() || null,
    campaignDuration: form.campaignDuration,
    hasContentReady: form.hasContentReady,
    externalContentUrl: form.externalContentUrl.trim() || null,
    adLanguage: form.adLanguage,
    videoUrl: assetUrl(form.videoAsset) || null,
    imageUrls,
    logoUrl: assetUrl(form.logoAsset) || null,
    goals: form.goals,
    additionalNotes: form.additionalNotes.trim() || null,
    termsAccepted: true,
  };
}

export function labelForOption(options, value) {
  return options.find((option) => option.value === value)?.label || value || "—";
}
