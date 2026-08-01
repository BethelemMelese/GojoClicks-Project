import Image from "next/image";
import ConsultationForm from "@/components/contact/ConsultationForm";
import ContactDetailItem from "@/components/contact/ContactDetailItem";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import {
  CONTACT_DETAILS,
  CONTACT_HERO,
  CONTACT_MAP,
} from "@/lib/constants/contact";

export default function ContactHero() {
  return (
    <section className="bg-white">
      <Container className="grid items-start gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6" direction="left">
          <h1 className="font-display text-display-lg-mobile font-bold tracking-tight text-navy md:text-display-lg">
            {CONTACT_HERO.titleBefore}{" "}
            <span className="text-gold">{CONTACT_HERO.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-xl font-body text-body-md text-neutral-gray md:text-body-lg">
            {CONTACT_HERO.description}
          </p>

          <ul className="mt-8 space-y-5">
            {CONTACT_DETAILS.map((item) => (
              <ContactDetailItem key={item.id} item={item} />
            ))}
          </ul>

          <div className="relative mt-8 overflow-hidden rounded-lg border border-border-soft shadow-elev1">
            <Image
              src={CONTACT_MAP.src}
              alt={CONTACT_MAP.alt}
              width={900}
              height={420}
              className="h-48 w-full object-cover grayscale transition duration-500 hover:grayscale-0 md:h-56"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={120} direction="right">
          <ConsultationForm />
        </Reveal>
      </Container>
    </section>
  );
}
