import { cn } from "@/lib/utils/cn";

export default function Select({
  id,
  label,
  value,
  onChange,
  options = [],
  className,
  selectClassName,
  size = "md",
}) {
  const compact = size === "sm";

  return (
    <label
      className={cn(
        "inline-flex min-w-0",
        compact ? "flex-col gap-1" : "items-center gap-2",
        className
      )}
    >
      {label ? (
        <span
          className={cn(
            "font-body font-bold uppercase tracking-[0.12em] text-neutral-gray",
            compact ? "text-[9px]" : "whitespace-nowrap text-[11px]"
          )}
        >
          {label}
        </span>
      ) : null}
      <span className={cn("relative inline-flex w-full min-w-0", !compact && "min-w-[10rem] flex-1")}>
        <select
          id={id}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className={cn(
            "w-full appearance-none rounded border border-border-soft bg-white font-body text-on-surface outline-none transition",
            "focus:border-gold focus:shadow-[0_0_0_3px_rgba(232,169,59,0.18)]",
            compact
              ? "truncate py-2 pl-2.5 pr-7 text-xs"
              : "py-2.5 pl-3 pr-9 text-sm",
            selectClassName
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          className={cn(
            "pointer-events-none absolute inset-y-0 flex items-center text-neutral-gray",
            compact ? "right-2" : "right-3"
          )}
          aria-hidden
        >
          <svg
            className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </label>
  );
}
