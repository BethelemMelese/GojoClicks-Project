import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { IconLightbulb, IconShare } from "@/components/ui/Icons";
import { LEAD_STRATEGIST } from "@/lib/constants/contact";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

export default function LeadStrategist() {
  return (
    <section className="border-y border-border-soft bg-off-white">
      <Container className="py-14 md:py-16">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left md:gap-10">
            <div className="relative shrink-0">
              <div className="rounded-full bg-gradient-to-br from-gold via-gold/40 to-gold p-[3px] shadow-elev2 transition duration-500 hover:scale-[1.02]">
                <div className="overflow-hidden rounded-full bg-off-white p-1">
                  <Image
                    src={LEAD_STRATEGIST.image}
                    alt={LEAD_STRATEGIST.imageAlt}
                    width={220}
                    height={220}
                    className="h-36 w-36 rounded-full object-cover md:h-44 md:w-44"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
                {LEAD_STRATEGIST.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-headline-sm font-bold text-navy md:text-headline-md">
                {LEAD_STRATEGIST.name}
              </h2>
              <p
                className={`${playfair.className} mt-1 text-lg text-neutral-gray md:text-xl`}
              >
                {LEAD_STRATEGIST.title}
              </p>
              <p className="mt-4 font-body text-body-md text-neutral-gray">
                {LEAD_STRATEGIST.bio}
              </p>
              <div className="mt-5 flex items-center justify-center gap-3 sm:justify-start">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded border border-border-soft bg-white text-navy transition duration-300 hover:border-gold hover:text-gold">
                  <IconShare className="h-4 w-4" />
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded border border-border-soft bg-white text-navy transition duration-300 hover:border-gold hover:text-gold">
                  <IconLightbulb className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
