import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PackagesHero() {
  return (
    <section className="bg-navy">
      <Container className="py-14 text-center md:py-20">
        <Reveal>
          <h1 className="font-display text-display-lg-mobile font-bold tracking-tight text-white md:text-display-lg">
            Our Advertising Packages
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-body-md text-white/70 md:text-body-lg">
            Meticulously curated media strategies designed for market leaders.
            Scale your brand with precision-targeted placement across Ethiopia&apos;s
            most valuable audiences.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
