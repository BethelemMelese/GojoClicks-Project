import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowRight, IconShieldCheck } from "@/components/ui/Icons";
import PackageCard from "@/components/packages/PackageCard";
import {
  HOME_PACKAGES,
  PACKAGE_INCLUSIONS,
} from "@/lib/constants/packages";

export default function PackagesSection() {
  return (
    <section id="packages" className="bg-off-white py-16 md:py-20">
      <Container>
        <SectionHeading
          align="left"
          title="Choose Your 15-Day Advertising Package"
          subtitle="Targeted Facebook & Instagram ads designed to increase your reach and generate more leads. Select the package that fits your business goals."
          action={
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-navy transition duration-300 hover:text-gold"
            >
              View All Packages
              <IconArrowRight />
            </Link>
          }
        />

        <div className="grid items-stretch gap-5 md:grid-cols-3 md:gap-6 lg:gap-7">
          {HOME_PACKAGES.map((pkg, index) => (
            <PackageCard key={pkg.id} package={pkg} index={index} />
          ))}
        </div>

        {/* <Reveal delay={120}>
          <div className="mt-10 rounded-xl border border-border-soft bg-white p-5 shadow-elev1 md:p-6">
            <div className="flex items-start gap-3 md:items-center">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7e7c4] text-[#8a5a00]">
                <IconShieldCheck />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-navy">
                  What&apos;s Included in Every Package?
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  {PACKAGE_INCLUSIONS.map((item, i) => (
                    <span
                      key={item}
                      className="inline-flex items-center font-body text-sm text-on-surface-variant"
                    >
                      {i > 0 && (
                        <span
                          className="mx-3 hidden h-3 w-px bg-outline-variant sm:inline-block"
                          aria-hidden
                        />
                      )}
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-4 font-body text-caption text-neutral-gray">
                  Results are estimated and may vary based on content quality,
                  audience response, and market conditions.
                </p>
              </div>
            </div>
          </div>
        </Reveal> */}
      </Container>
    </section>
  );
}
