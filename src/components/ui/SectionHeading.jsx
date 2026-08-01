import { cn } from "@/lib/utils/cn";
import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  underline = false,
  action,
  className,
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      <div
        className={cn(
          action &&
            "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        )}
      >
        <div>
          <h2 className="font-display text-headline-sm font-semibold text-on-surface md:text-headline-md">
            {title}
          </h2>
          {underline && (
            <span
              className={cn(
                "mt-3 block h-1 w-16 rounded-full bg-gold",
                align === "center" && "mx-auto"
              )}
              aria-hidden
            />
          )}
          {subtitle && (
            <p
              className={cn(
                "mt-3 max-w-xl font-body text-body-md text-neutral-gray",
                align === "center" && "mx-auto"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
    </Reveal>
  );
}
