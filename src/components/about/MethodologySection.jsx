import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { ChannelIcon, PackageIcon, IconShieldCheck } from "@/components/ui/Icons";
import { METHODOLOGY_STEPS } from "@/lib/constants/about";

function StepIcon({ name }) {
  const className = "h-8 w-8";
  if (name === "shield") return <IconShieldCheck className={className} />;
  if (name === "globe") return <ChannelIcon name="globe" className={className} />;
  return <PackageIcon name={name} className={className} />;
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
                <span className="inline-flex text-navy transition duration-300 group-hover:text-gold">
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
