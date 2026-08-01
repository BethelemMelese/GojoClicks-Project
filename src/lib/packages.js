import { MOCK_PACKAGES } from "@/lib/constants/packages";

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
