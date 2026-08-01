import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { ChannelIcon, PackageIcon, IconShieldCheck } from "@/components/ui/Icons";
import { METHODOLOGY_STEPS } from "@/lib/constants/about";

function StepIcon({ name }) {
  if (name === "shield") return <IconShieldCheck className="h-5 w-5" />;
  if (name === "globe") return <ChannelIcon name="globe" className="h-5 w-5" />;
  return <PackageIcon name={name} className="h-5 w-5" />;
}

export default function MethodologySection() {
  return (
    <section className="bg-off-white py-16 md:py-20">
      <Container>
        <Reveal className="mb-12 text-center">
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
            Our Methodology
          </p>
          <h2 className="mt-2 font-display text-headline-sm font-bold text-navy md:text-headline-md">
            How It Works
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METHODOLOGY_STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 90}>
              <article className="group h-full rounded-lg border border-border-soft border-t-4 border-t-navy bg-white p-6 shadow-elev1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev2">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded bg-navy text-gold transition group-hover:bg-gold group-hover:text-navy">
                  <StepIcon name={step.icon} />
                </span>
                <p className="mt-5 font-display text-sm font-bold text-gold">
                  {step.number}. {step.label}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-6 text-neutral-gray">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
