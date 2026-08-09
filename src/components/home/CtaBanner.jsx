import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gold">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,27,51,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(13,27,51,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <Container className="relative py-12 md:py-14">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-headline-sm font-bold text-navy md:text-headline-md">
                Ready to Elevate Your Brand Identity?
              </h2>
              <p className="mt-2 font-body text-body-md text-navy/75">
                Schedule a strategic consultation with our media architects today.
              </p>
            </div>
            <Button href="/contact" variant="navy" className="shrink-0">
              Get in touch
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
