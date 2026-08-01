import PageHeroShell from "@/components/ui/PageHeroShell";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_HERO } from "@/lib/constants/about";

export default function AboutHero() {
  return (
    <PageHeroShell mood="about" align="center">
      <Reveal>
        <h1 className="mx-auto max-w-3xl font-display text-display-lg-mobile font-bold tracking-tight text-white md:text-display-lg">
          {ABOUT_HERO.titleBefore}{" "}
          <span className="text-gold">{ABOUT_HERO.titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-body text-body-md text-white/65 md:text-body-lg">
          {ABOUT_HERO.description}
        </p>
      </Reveal>
    </PageHeroShell>
  );
}
