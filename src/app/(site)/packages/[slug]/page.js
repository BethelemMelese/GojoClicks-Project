import { notFound } from "next/navigation";
import PackageDetailPage from "@/components/packages/PackageDetailPage";
import {
  getAllMockPackageSlugs,
  getMockPackageBySlug,
} from "@/lib/packages";

export function generateStaticParams() {
  return getAllMockPackageSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const pkg = getMockPackageBySlug(params.slug);
  return {
    title: pkg ? `${pkg.title} — GojoClicks` : "Package — GojoClicks",
    description: pkg?.description,
  };
}

export default function Page({ params }) {
  const pkg = getMockPackageBySlug(params.slug);

  if (!pkg) {
    notFound();
  }

  return <PackageDetailPage package={pkg} />;
}
