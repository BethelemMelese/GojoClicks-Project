import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function AboutCta() {
  return (
    <section className="bg-off-white pb-14 pt-4 md:pb-16 md:pt-6">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-navy px-6 py-12 text-center shadow-elev3 md:px-12 md:py-14">
            {/* Soft atmosphere — keeps navy rich without feeling empty */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(232,169,59,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(232,169,59,0.55) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage:
                  "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-gold/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl">
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
                Next Step
              </p>
              <h2 className="mt-3 font-display text-headline-sm font-bold text-white md:text-headline-md">
                Ready to elevate your market presence?
              </h2>
              <p className="mx-auto mt-3 max-w-lg font-body text-body-md text-white/65">
                Start with a package or talk to our team about a custom campaign
                plan.
              </p>

              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Button
                  href="/contact"
                  size="lg"
                  className="min-w-[220px] shadow-elev2 hover:-translate-y-0.5"
                >
                  Schedule a Consultation
                </Button>
                <Button
                  href="/packages"
                  variant="outlineLight"
                  size="lg"
                  className="min-w-[220px] hover:-translate-y-0.5"
                >
                  View Packages
                </Button>
              </div>

              <p className="mt-6 font-body text-caption text-white/45">
                No commitment required — we reply within one business day.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
