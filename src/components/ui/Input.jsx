import { cn } from "@/lib/utils/cn";

export default function Input({
  id,
  label,
  error,
  className,
  inputClassName,
  ...props
}) {
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={cn(
          "input-field",
          error && "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(186,26,26,0.15)]",
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
