"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

/**
 * Header (light bg) → horizontal navy/gold mark.
 * Footer (dark bg) → oval mark with white disc so it stays legible on navy.
 */
const LOGO_SRC = {
  light: "/brand/logo.png",
  dark: "/brand/logo_oval.png",
};

const SIZES = {
  sm: "h-9 w-auto md:h-10",
  md: "h-16 w-auto md:h-16",
  lg: "h-20 w-auto md:h-20",
};

export default function BrandLogo({
  variant = "light",
  size = "md",
  className,
}) {
  const [failed, setFailed] = useState(false);
  const src = LOGO_SRC[variant] || LOGO_SRC.light;
  const onDark = variant === "dark";

  if (failed) {
    return (
      <Link
        href="/"
        className={cn(
          "font-display text-lg font-bold uppercase tracking-[0.04em] md:text-xl",
          onDark
            ? "text-gold"
            : "text-navy transition-colors hover:text-gold",
          className
        )}
      >
        {SITE.nameUpper}
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={SITE.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={SITE.name}
        width={onDark ? 160 : 220}
        height={onDark ? 160 : 72}
        className={cn("object-contain object-left", SIZES[size] || SIZES.md)}
        onError={() => setFailed(true)}
      />
    </Link>
  );
}
