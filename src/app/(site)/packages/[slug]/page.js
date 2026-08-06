import { notFound } from "next/navigation";
import PackageDetailPage from "@/components/packages/PackageDetailPage";
import {
  loadAllPackageSlugs,
  loadPackageBySlug,
} from "@/lib/packages";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await loadAllPackageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const pkg = await loadPackageBySlug(params.slug);
  return {
    title: pkg ? `${pkg.title} — GojoClicks` : "Package — GojoClicks",
    description: pkg?.description,
  };
}

export default async function Page({ params }) {
  const pkg = await loadPackageBySlug(params.slug);

  if (!pkg) {
    notFound();
  }

  return <PackageDetailPage package={pkg} />;
}
