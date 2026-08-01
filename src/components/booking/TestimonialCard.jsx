import Reveal from "@/components/ui/Reveal";

export default function TestimonialCard({
  quote = "The booking flow was clear and professional — we launched faster than with any other agency partner.",
  name = "Sara Bekele",
  role = "Director, Horizon Realty",
  initials = "SB",
}) {
  return (
    <Reveal delay={100}>
      <aside className="rounded-lg border border-border-soft bg-white p-5 shadow-elev1 md:p-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-gold">
            {initials}
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-navy">{name}</p>
            <p className="font-body text-caption text-neutral-gray">{role}</p>
          </div>
        </div>
        <p className="mt-4 font-body text-sm italic leading-6 text-on-surface-variant">
          “{quote}”
        </p>
      </aside>
    </Reveal>
  );
}
