import { cn } from "@/lib/utils/cn";

export default function ChoiceGroup({
  label,
  name,
  options,
  value,
  values,
  onChange,
  multiple = false,
  error,
  className,
}) {
  const selected = multiple ? values || [] : value;

  return (
    <div className={cn("w-full", className)}>
      {label ? <p className="input-label">{label}</p> : null}
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isActive = multiple
            ? selected.includes(option.value)
            : selected === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2 font-body text-sm transition duration-300",
                isActive
                  ? "border-gold bg-[#fff8eb] text-navy"
                  : "border-border-soft bg-white text-on-surface-variant hover:border-gold/50"
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={option.value}
                checked={isActive}
                onChange={() => {
                  if (multiple) {
                    const next = isActive
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value];
                    onChange?.(next);
                    return;
                  }
                  onChange?.(option.value);
                }}
                className="accent-gold"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? (
        <p className="mt-1.5 font-body text-caption text-error">{error}</p>
      ) : null}
    </div>
  );
}
