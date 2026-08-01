import { cn } from "@/lib/utils/cn";

export default function StepperProgress({ steps, currentStep }) {
  return (
    <ol className="mb-6 flex items-start justify-between gap-1 sm:mb-8 sm:gap-2">
      {steps.map((step, index) => {
        const number = index + 1;
        const active = number === currentStep;
        const complete = number < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.id} className="flex min-w-0 flex-1 items-center last:flex-none">
            <div className="flex min-w-0 flex-col items-center gap-1.5 sm:gap-2">
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full font-display text-xs font-bold transition-all duration-300 sm:h-9 sm:w-9 sm:text-sm",
                  active && "bg-navy text-white shadow-elev1",
                  complete && "bg-gold text-navy",
                  !active && !complete && "bg-surface-container-high text-neutral-gray"
                )}
              >
                {number}
              </span>
              <span
                className={cn(
                  "max-w-[4.5rem] truncate text-center font-body text-[9px] font-semibold uppercase tracking-[0.06em] sm:max-w-none sm:text-[11px] sm:tracking-[0.08em]",
                  active || complete ? "text-navy" : "text-neutral-gray"
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast ? (
              <div
                className={cn(
                  "mx-1 mb-5 h-0.5 min-w-[0.5rem] flex-1 rounded-full transition-colors duration-300 sm:mx-2 sm:mb-6",
                  complete ? "bg-gold" : "bg-outline-variant"
                )}
                aria-hidden
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
