import HomePage from "@/components/home/HomePage";
import { loadFeaturedPackages } from "@/lib/packages";

export const revalidate = 60;

export default async function Page() {
  const featuredPackages = await loadFeaturedPackages(3);
  return <HomePage featuredPackages={featuredPackages} />;
}
