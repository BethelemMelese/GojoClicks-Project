import { cn } from "@/lib/utils/cn";

const variants = {
  gold: "bg-[#f7e7c4] text-[#8a5a00]",
  solidGold: "bg-gold text-navy",
  navy: "bg-navy text-white",
  muted: "bg-[#4b5563] text-white",
};

export default function Badge({
  children,
  variant = "gold",
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-3 py-1 font-body text-[11px] font-bold uppercase tracking-[0.08em]",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
