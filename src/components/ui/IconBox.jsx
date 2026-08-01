import { cn } from "@/lib/utils/cn";

export default function IconBox({
  children,
  className,
  size = "md",
}) {
  const sizes = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-12 w-12",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded bg-navy text-gold transition duration-300",
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
