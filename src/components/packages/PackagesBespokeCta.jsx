import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PackagesBespokeCta() {
  return (
    <section className="bg-surface-container-low">
      <Container className="py-16 text-center md:py-20">
        <Reveal>
          <h2 className="font-display text-headline-sm font-bold text-navy md:text-headline-md">
            Need a Bespoke Media Solution?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-body-md text-neutral-gray">
            Our strategists can design a custom campaign around your inventory,
            markets, and growth goals — beyond the standard package tiers.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="navy">
              Schedule a Consultation
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
