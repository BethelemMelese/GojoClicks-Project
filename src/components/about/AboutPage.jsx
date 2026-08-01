import AboutCta from "@/components/about/AboutCta";
import AboutHero from "@/components/about/AboutHero";
import AboutOverview from "@/components/about/AboutOverview";
import MethodologySection from "@/components/about/MethodologySection";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MethodologySection />
      <AboutOverview />
      <AboutCta />
    </>
  );
}
