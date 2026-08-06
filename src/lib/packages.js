import { MOCK_PACKAGES } from "@/lib/constants/packages";
import {
  getFeaturedPackages as fetchFeaturedFromSanity,
  getPackageBySlug as fetchPackageBySlugFromSanity,
  getPackages as fetchPackagesFromSanity,
  urlForImage,
} from "@/lib/sanity";

export function getMockPackageBySlug(slug) {
  return MOCK_PACKAGES.find((pkg) => pkg.slug === slug) || null;
}

export function formatEtb(price) {
  const numeric = Number(price);
  if (Number.isNaN(numeric)) return String(price);
  return `${numeric.toLocaleString("en-US")} ETB`;
}

export function getAllMockPackageSlugs() {
  return MOCK_PACKAGES.map((pkg) => pkg.slug);
}

function resolveImage(doc) {
  if (!doc?.image) return null;
  if (typeof doc.image === "string") return doc.image;
  if (doc.image.asset?.url) return doc.image.asset.url;
  try {
    const builder = urlForImage(doc.image);
    return builder ? builder.width(1200).url() : null;
  } catch {
    return null;
  }
}

/** Normalize Sanity (or mock) package docs for UI components. */
export function normalizePackage(doc) {
  if (!doc) return null;

  const slug =
    typeof doc.slug === "string" ? doc.slug : doc.slug?.current || null;

  return {
    id: doc._id || doc.id || slug,
    slug,
    title: doc.title || "Package",
    description: doc.description || "",
    price: doc.price ?? null,
    features: Array.isArray(doc.features) ? doc.features : [],
    featured: Boolean(doc.featured),
    image: resolveImage(doc) || doc.image || null,
    imageAlt: doc.image?.alt || doc.imageAlt || doc.title || "Package",
    duration: doc.duration || "10-Day Campaign",
    reach: doc.reach || null,
    views: doc.views || null,
    leads: doc.leads || null,
    industry: doc.industry || "real-estate",
    badge: doc.badge || null,
    icon: doc.icon || "rocket",
    cardTone: doc.cardTone || null,
  };
}

export async function loadPackages() {
  const fromSanity = await fetchPackagesFromSanity();
  if (Array.isArray(fromSanity) && fromSanity.length > 0) {
    return fromSanity.map(normalizePackage).filter(Boolean);
  }
  return MOCK_PACKAGES.map(normalizePackage);
}

export async function loadFeaturedPackages(limit = 3) {
  const fromSanity = await fetchFeaturedFromSanity(limit);
  if (Array.isArray(fromSanity) && fromSanity.length > 0) {
    const list = fromSanity.map(normalizePackage).filter(Boolean);
    return list.map((pkg, index) => ({
      ...pkg,
      cardTone:
        index === 1 ? "primary" : index === 2 ? "secondary" : "default",
      featured: index === 1 ? true : pkg.featured,
    }));
  }

  // Mock home trio fallback
  const { HOME_PACKAGES } = await import("@/lib/constants/packages");
  return HOME_PACKAGES.map(normalizePackage).filter(Boolean);
}

export async function loadPackageBySlug(slug) {
  if (!slug) return null;
  const fromSanity = await fetchPackageBySlugFromSanity(slug);
  if (fromSanity) return normalizePackage(fromSanity);
  return normalizePackage(getMockPackageBySlug(slug));
}

export async function loadAllPackageSlugs() {
  const packages = await loadPackages();
  return packages.map((pkg) => pkg.slug).filter(Boolean);
}
