export const SITE = {
  name: "GojoClicks",
  nameUpper: "GOJOCLICKS",
  tagline: "Creative Professionalism in Media",
  description:
    "Elevating brands through precision-targeted media strategies and global network placement.",
  copyright: `© ${new Date().getFullYear()} GojoClicks Media Group. All rights reserved.`,
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Company",
    interactive: true,
    links: [
      { href: "/about", label: "About Us" },
      { href: "/packages", label: "Packages" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    interactive: false,
    links: [
      { label: "Property Ad Campaigns" },
      { label: "Advertising Packages" },
      { label: "Custom Campaigns" },
    ],
  },
  {
    title: "Support",
    interactive: false,
    links: [
      { label: "Contact Support" },
      { label: "Privacy Policy" },
      { label: "Terms of Service" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS = [
  { href: "/about", label: "Advertising Guidelines" },
  { href: "/about", label: "Cookie Policy" },
];

export const HOME_STATS = [
  { end: 500, suffix: "+", label: "Clients Managed" },
  { end: 98, suffix: "%", label: "Retention Rate" },
  { end: 20, prefix: "$", suffix: "K+", label: "Ad Spend Handled" },
  { end: 15, suffix: "+", label: "Media Channels" },
];

export const HOME_SERVICES = [
  {
    title: "Property Ad Campaigns",
    description:
      "10-Day Facebook & Instagram campaigns built to sell apartments, villas, and new developments faster.",
    icon: "megaphone",
  },
  {
    title: "Audience Targeting",
    description:
      "Reach buyers, investors, and diaspora audiences by location, interests, and intent — not wasted impressions.",
    icon: "globe",
  },
  {
    title: "Creative & Content",
    description:
      "Scroll-stopping property creatives in Amharic, English, or both — ready to launch or crafted with you.",
    icon: "monitor",
  },
  {
    title: "Leads & Reporting",
    description:
      "WhatsApp and call leads delivered to your team, with daily optimization and clear performance reports.",
    icon: "chart",
  },
];

export const FALLBACK_PACKAGES = [
  {
    _id: "fallback-starter",
    title: "Corporate Starter",
    description: "Regional Market Penetration",
    price: 12500,
    features: [
      "5 Digital Channels",
      "Weekly Reporting",
      "Basic Audience Targeting",
    ],
    featured: false,
    slug: null,
  },
  {
    _id: "fallback-growth",
    title: "Growth Executive",
    description: "National Brand Expansion",
    price: 45000,
    features: [
      "Omnichannel Strategy",
      "Dedicated Account Manager",
      "Advanced Attribution",
      "Priority Inventory Access",
    ],
    featured: true,
    slug: null,
  },
  {
    _id: "fallback-global",
    title: "Global Domination",
    description: "International Market Leadership",
    price: 120000,
    features: [
      "Global Media Network",
      "24/7 Crisis Management",
      "Custom Creative Studio",
      "C-Suite Strategy Sessions",
      "Exclusive Inventory",
    ],
    featured: false,
    slug: null,
  },
];

export const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
  alt: "Professional executive overlooking a city skyline at sunset",
};
