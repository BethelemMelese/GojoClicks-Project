/** Mock 15-day advertising packages (layout preview — Sanity later). */
export const MOCK_PACKAGES = [
  {
    id: "starter",
    slug: "starter",
    title: "Starter",
    icon: "rocket",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern apartment building exterior",
    price: 5000,
    duration: "15-Day Campaign",
    reach: "30,000+",
    views: "20,000+",
    leads: "40+",
    description:
      "Perfect for testing the market with focused Facebook & Instagram ads and steady WhatsApp lead delivery.",
    industry: "real-estate",
    badge: null,
    features: [
      "Targeted Audience",
      "Daily Optimization",
      "Lead Delivery (WhatsApp)",
      "Performance Report",
    ],
    featured: false,
  },
  {
    id: "growth",
    slug: "growth",
    title: "Growth",
    icon: "chart",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Contemporary residential property",
    price: 7500,
    duration: "15-Day Campaign",
    reach: "60,000+",
    views: "40,000+",
    leads: "80+",
    description:
      "Scale your local reach with stronger targeting and optimized creatives built for more property inquiries.",
    industry: "real-estate",
    badge: "NEW",
    features: [
      "Targeted Audience",
      "Daily Optimization",
      "Lead Delivery (WhatsApp)",
      "Performance Report",
    ],
    featured: false,
  },
  {
    id: "professional",
    slug: "professional",
    title: "Professional",
    icon: "trophy",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Marketing analytics dashboard on laptop",
    price: 10000,
    duration: "15-Day Campaign",
    reach: "100,000+",
    views: "70,000+",
    leads: "150+",
    description:
      "Our most popular tier for agencies ready to convert attention into consistent WhatsApp and call leads.",
    industry: "agency",
    badge: "BESTSELLER",
    features: [
      "Targeted Audience",
      "Daily Optimization",
      "Lead Delivery (WhatsApp)",
      "Performance Report",
      "Priority Support",
    ],
    featured: true,
    highlightFeature: "Priority Support",
  },
  {
    id: "business",
    slug: "business",
    title: "Business",
    icon: "briefcase",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bright modern office workspace",
    price: 12500,
    duration: "15-Day Campaign",
    reach: "150,000+",
    views: "100,000+",
    leads: "250+",
    description:
      "Built for growing portfolios that need broader reach, stronger reporting, and priority campaign support.",
    industry: "agency",
    badge: null,
    features: [
      "Targeted Audience",
      "Daily Optimization",
      "Lead Delivery (WhatsApp)",
      "Performance Report",
      "Priority Support",
    ],
    featured: false,
    highlightFeature: "Priority Support",
  },
  {
    id: "elite",
    slug: "elite",
    title: "Elite",
    icon: "crown",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "City skyline and commercial towers",
    price: 15000,
    duration: "15-Day Campaign",
    reach: "220,000+",
    views: "150,000+",
    leads: "400+",
    description:
      "High-performance placement for competitive markets where visibility and lead volume matter most.",
    industry: "developer",
    badge: "LIMITED",
    features: [
      "Targeted Audience",
      "Daily Optimization",
      "Lead Delivery (WhatsApp)",
      "Performance Report",
      "Priority Support",
    ],
    featured: false,
    highlightFeature: "Priority Support",
  },
  {
    id: "enterprise",
    slug: "enterprise",
    title: "Enterprise",
    icon: "building",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Large residential development",
    price: 17500,
    duration: "15-Day Campaign",
    reach: "300,000+",
    views: "220,000+",
    leads: "600+",
    description:
      "Enterprise-grade media push for large inventories and multi-property campaigns across key cities.",
    industry: "developer",
    badge: null,
    features: [
      "Targeted Audience",
      "Daily Optimization",
      "Lead Delivery (WhatsApp)",
      "Performance Report",
      "Priority Support",
    ],
    featured: false,
    highlightFeature: "Priority Support",
  },
  {
    id: "platinum",
    slug: "platinum",
    title: "Platinum",
    icon: "diamond",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Luxury interior living space",
    price: 20000,
    duration: "15-Day Campaign",
    reach: "500,000+",
    views: "350,000+",
    leads: "1,000+",
    description:
      "Maximum reach and VIP support for flagship launches that demand dominant market presence.",
    industry: "developer",
    badge: null,
    features: [
      "Targeted Audience",
      "Daily Optimization",
      "Lead Delivery (WhatsApp)",
      "Performance Report",
      "VIP Support",
    ],
    featured: false,
    highlightFeature: "VIP Support",
  },
];

export const PACKAGE_INCLUSIONS = [
  "15-Day Targeted Campaign",
  "Facebook & Instagram Ads",
  "Audience Targeting by Location & Interests",
  "Daily Optimization",
  "Lead Delivery to WhatsApp",
  "Performance Report",
];

/**
 * Home page shows only 3 packages:
 * left = default, center = featured (navy), right = secondary (gold)
 */
export const HOME_PACKAGES = [
  { ...MOCK_PACKAGES.find((p) => p.id === "starter"), cardTone: "default" },
  {
    ...MOCK_PACKAGES.find((p) => p.id === "professional"),
    cardTone: "primary",
    featured: true,
  },
  { ...MOCK_PACKAGES.find((p) => p.id === "business"), cardTone: "secondary" },
];

export const PACKAGE_INDUSTRY_OPTIONS = [
  { value: "all", label: "All Industries" },
  { value: "real-estate", label: "Real Estate" },
  { value: "agency", label: "Agencies" },
  { value: "developer", label: "Developers" },
];

export const PACKAGE_BUDGET_OPTIONS = [
  { value: "all", label: "Any Budget" },
  { value: "under-10k", label: "Under 10,000 ETB" },
  { value: "10k-15k", label: "10,000 – 15,000 ETB" },
  { value: "over-15k", label: "Over 15,000 ETB" },
];

export const PACKAGE_SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

export const PACKAGES_PAGE_SIZE = 6;

export function filterAndSortPackages(
  packages,
  { industry = "all", budget = "all", sort = "popular" } = {}
) {
  let result = [...packages];

  if (industry !== "all") {
    result = result.filter((pkg) => pkg.industry === industry);
  }

  if (budget === "under-10k") {
    result = result.filter((pkg) => pkg.price < 10000);
  } else if (budget === "10k-15k") {
    result = result.filter((pkg) => pkg.price >= 10000 && pkg.price <= 15000);
  } else if (budget === "over-15k") {
    result = result.filter((pkg) => pkg.price > 15000);
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "popular":
    default:
      result.sort((a, b) => Number(b.featured) - Number(a.featured) || a.price - b.price);
      break;
  }

  return result;
}
