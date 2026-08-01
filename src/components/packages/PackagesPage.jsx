import PackagesBespokeCta from "@/components/packages/PackagesBespokeCta";
import PackagesCatalog from "@/components/packages/PackagesCatalog";
import PackagesHero from "@/components/packages/PackagesHero";
import { MOCK_PACKAGES } from "@/lib/constants/packages";

export default function PackagesPage({ packages = MOCK_PACKAGES }) {
  return (
    <>
      <PackagesHero />
      <PackagesCatalog packages={packages} />
      <PackagesBespokeCta />
    </>
  );
}
