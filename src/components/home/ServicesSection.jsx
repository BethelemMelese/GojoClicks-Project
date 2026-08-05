import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChannelIcon } from "@/components/ui/Icons";
import { HOME_SERVICES } from "@/lib/constants/site";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="End-to-end advertising support for Ethiopian real estate — from targeting and creatives to WhatsApp leads and clear reporting."
          underline
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 90}>
              <article className="group h-full rounded border border-border-soft bg-white p-6 shadow-elev1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev2">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded bg-surface-container-low text-navy transition-colors duration-300 group-hover:bg-[#f7e7c4] group-hover:text-[#8a5a00]">
                  <ChannelIcon name={service.icon} />
                </div>
                <h3 className="font-display text-lg font-semibold text-on-surface">
                  {service.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-6 text-neutral-gray">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
