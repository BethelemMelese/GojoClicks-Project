import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "How it works — GojoClicks",
  description:
    "Choose a package, complete your booking details, pay with Telebirr or CBE Birr, and launch your GojoClicks campaign.",
};

const STEPS = [
  {
    number: "01",
    title: "Choose a package",
    body: "Browse advertising packages and open the one that fits your campaign goals and budget.",
  },
  {
    number: "02",
    title: "Complete the booking form",
    body: "Share your contact details, where ads should run, how leads should reach you, your property brief, and campaign creatives.",
  },
  {
    number: "03",
    title: "Pay for your package",
    body: "Transfer the package amount with Telebirr or CBE Birr, then enter your transaction ID and upload the payment receipt.",
  },
  {
    number: "04",
    title: "Confirm & submit",
    body: "Review your booking summary, accept the terms, and submit your request.",
  },
  {
    number: "05",
    title: "We verify & launch",
    body: "Our team reviews your booking and payment, emails you a status update, and prepares your campaign to go live.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-border-soft bg-navy">
        <Container className="py-14 md:py-20">
          <Reveal>
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
              Simple process
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-headline-sm font-bold text-white md:text-headline-md">
              How GojoClicks booking works
            </h1>
            <p className="mt-4 max-w-xl font-body text-base leading-7 text-white/75">
              Complete your campaign details, pay with Telebirr or CBE Birr, then
              we verify payment and get your ads ready — with clear email updates
              along the way.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-off-white py-14 md:py-20">
        <Container>
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step, index) => (
              <Reveal key={step.number} delay={index * 80} as="li">
                <article className="flex h-full flex-col rounded-lg border border-border-soft border-t-4 border-t-navy bg-white p-6 shadow-elev1">
                  <p className="font-display text-sm font-bold text-gold">
                    {step.number}
                  </p>
                  <h2 className="mt-3 font-display text-lg font-semibold text-navy">
                    {step.title}
                  </h2>
                  <p className="mt-2 flex-1 font-body text-sm leading-6 text-neutral-gray">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200} className="mt-12 flex flex-wrap gap-3">
            <Button href="/packages">Browse packages</Button>
            <Button href="/contact" variant="secondary">
              Talk to our team
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
