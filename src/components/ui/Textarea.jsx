import { cn } from "@/lib/utils/cn";

export default function Textarea({
  id,
  label,
  error,
  className,
  inputClassName,
  rows = 4,
  ...props
}) {
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        rows={rows}
        className={cn(
          "input-field min-h-[120px] resize-y",
          error && "border-error focus:border-error",
          inputClassName
        )}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 font-body text-caption text-error">{error}</p>
      ) : null}
    </div>
  );
}
