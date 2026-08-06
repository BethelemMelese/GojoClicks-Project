import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/Icons";
import PackageCard from "@/components/packages/PackageCard";

export default function PackagesSection({ packages = [] }) {
  return (
    <section id="packages" className="bg-off-white py-16 md:py-20">
      <Container>
        <SectionHeading
          align="center"
          title="Choose your Advertising Package"
          subtitle="Targeted Facebook & Instagram ads designed to increase your reach and generate more leads. Select the package that fits your business goals."
        />

        <div className="grid items-stretch gap-5 md:grid-cols-3 md:gap-6 lg:gap-7">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id || pkg.slug} package={pkg} index={index} />
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-gold transition duration-300 hover:text-[#d9992f]"
            >
              View All Packages
              <IconArrowRight />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
