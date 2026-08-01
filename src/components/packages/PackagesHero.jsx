import PageHeroShell from "@/components/ui/PageHeroShell";
import Reveal from "@/components/ui/Reveal";
import { PACKAGES_HERO } from "@/lib/constants/packagesHero";

export default function PackagesHero() {
  return (
    <PageHeroShell mood="packages" align="left" containerClassName="max-w-3xl">
      <Reveal direction="left">
        <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
          {PACKAGES_HERO.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-display-lg-mobile font-bold tracking-tight text-white md:text-display-lg">
          {PACKAGES_HERO.title}{" "}
          <span className="text-gold">{PACKAGES_HERO.highlight}</span>
        </h1>
        <p className="mt-4 max-w-xl font-body text-body-md text-white/65">
          {PACKAGES_HERO.description}
        </p>
      </Reveal>
    </PageHeroShell>
  );
}
