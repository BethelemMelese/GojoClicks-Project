import Reveal from "@/components/ui/Reveal";

export default function FaqCard({ question, answer, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article className="h-full rounded-lg border border-border-soft bg-white p-5 shadow-elev1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elev2 md:p-6">
        <h3 className="font-display text-base font-bold text-navy md:text-lg">
          {question}
        </h3>
        <p className="mt-3 font-body text-sm leading-6 text-neutral-gray">
          {answer}
        </p>
      </article>
    </Reveal>
  );
}
