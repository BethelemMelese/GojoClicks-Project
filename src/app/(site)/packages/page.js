import PackagesPage from "@/components/packages/PackagesPage";
import { loadPackages } from "@/lib/packages";

export const revalidate = 60;

export const metadata = {
  title: "Packages — GojoClicks",
  description:
    "Browse GojoClicks 10-Day advertising packages designed for real estate and growing brands in Ethiopia.",
};

export default async function Page() {
  const packages = await loadPackages();
  return <PackagesPage packages={packages} />;
}
