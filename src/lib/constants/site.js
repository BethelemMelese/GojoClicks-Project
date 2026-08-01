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
  // { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about", label: "Case Studies" },
      { href: "/contact", label: "Careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/", label: "Marketplace" },
      { href: "/packages", label: "Advertising Packages" },
      { href: "/packages", label: "Partner Solutions" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact Support" },
      { href: "/about", label: "Privacy Policy" },
      { href: "/about", label: "Terms of Service" },
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
  { end: 2, prefix: "$", suffix: "B+", label: "Ad Spend Handled" },
  { end: 15, suffix: "+", label: "Media Channels" },
];

export const MEDIA_CHANNELS = [
  {
    title: "OOH & Billboard",
    description:
      "High-traffic placements across major metropolitan transit hubs.",
    icon: "monitor",
  },
  {
    title: "Programmatic Display",
    description: "Precision targeting leveraging premium inventory.",
    icon: "globe",
  },
  {
    title: "Broadcast Media",
    description: "Prime-time network placements and regional campaigns.",
    icon: "megaphone",
  },
  {
    title: "Data Analytics",
    description: "Real-time performance tracking and ROI reporting.",
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
