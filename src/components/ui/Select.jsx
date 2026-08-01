import { cn } from "@/lib/utils/cn";

export default function Select({
  id,
  label,
  value,
  onChange,
  options = [],
  className,
  selectClassName,
}) {
  return (
    <label className={cn("inline-flex items-center gap-2", className)}>
      {label ? (
        <span className="whitespace-nowrap font-body text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-gray">
          {label}
        </span>
      ) : null}
      <span className="relative inline-flex min-w-[10rem] flex-1">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className={cn(
            "w-full appearance-none rounded border border-border-soft bg-white py-2.5 pl-3 pr-9",
            "font-body text-sm text-on-surface outline-none transition",
            "focus:border-gold focus:shadow-[0_0_0_3px_rgba(232,169,59,0.18)]",
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
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-gray"
          aria-hidden
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
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
