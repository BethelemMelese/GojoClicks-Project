import { cn } from "@/lib/utils/cn";

export default function FormSelect({
  id,
  label,
  error,
  value,
  onChange,
  options = [],
  placeholder,
  className,
  selectClassName,
  ...props
}) {
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange?.(event)}
          className={cn(
            "input-field appearance-none pr-10",
            error &&
              "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(186,26,26,0.15)]",
            selectClassName
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
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
      </div>
      {error ? (
        <p className="mt-1.5 font-body text-caption text-error">{error}</p>
      ) : null}
    </div>
  );
}
