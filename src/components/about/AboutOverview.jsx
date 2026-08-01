import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_OVERVIEW } from "@/lib/constants/about";

export default function AboutOverview() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl shadow-elev2">
            <Image
              src={ABOUT_OVERVIEW.image}
              alt={ABOUT_OVERVIEW.imageAlt}
              width={900}
              height={700}
              className="h-auto w-full object-cover aspect-[4/3]"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="font-display text-headline-sm font-bold text-navy md:text-headline-md">
            {ABOUT_OVERVIEW.title}
          </h2>
          <div className="mt-4 space-y-4">
            {ABOUT_OVERVIEW.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="font-body text-body-md text-neutral-gray"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-stretch gap-6">
            {ABOUT_OVERVIEW.stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-6">
                {index > 0 ? (
                  <span className="hidden h-12 w-px bg-border-soft sm:block" aria-hidden />
                ) : null}
                <div>
                  <p className="font-display text-3xl font-bold text-navy">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
