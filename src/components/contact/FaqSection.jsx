import FaqCard from "@/components/contact/FaqCard";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_FAQS } from "@/lib/constants/contact";

export default function FaqSection() {
  return (
    <section className="bg-white py-14 md:py-16">
      <Container>
        <Reveal className="mb-10 text-center md:mb-12">
          <h2 className="font-display text-headline-sm font-bold text-navy md:text-headline-md">
            Common Inquiries
          </h2>
          <p className="mx-auto mt-2 max-w-lg font-body text-body-md text-neutral-gray">
            Swift answers for executive decision-makers.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {CONTACT_FAQS.map((faq, index) => (
            <FaqCard
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              delay={index * 80}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
