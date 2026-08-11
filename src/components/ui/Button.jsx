import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

const variants = {
  primary:
    "bg-gold text-navy hover:bg-[#d9992f] hover:shadow-elev2 focus-visible:ring-gold",
  secondary:
    "border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-white focus-visible:ring-navy",
  navy: "bg-navy text-white hover:bg-[#152741] hover:shadow-elev2 focus-visible:ring-navy",
  ghost:
    "bg-transparent text-navy hover:bg-surface-container-low focus-visible:ring-navy",
  danger:
    "bg-error text-white hover:bg-[#c62828] hover:shadow-elev2 focus-visible:ring-error",
  /** Outline control for navy / dark backgrounds */
  outlineLight:
    "border-2 border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy focus-visible:ring-white",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-sm",
};

const Button = forwardRef(function Button(
  {
    children,
    href,
    variant = "primary",
    size = "md",
    className,
    type = "button",
    ...props
  },
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded font-display font-bold uppercase tracking-wide transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} ref={ref} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} ref={ref} {...props}>
      {children}
    </button>
  );
});

export default Button;
