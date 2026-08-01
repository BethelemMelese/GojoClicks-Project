"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

/**
 * Brand mark from public/brand/logo.png.
 * Falls back to wordmark only if the image fails to load.
 */
export default function BrandLogo({ variant = "default", className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <Link
        href="/"
        className={cn(
          "font-display text-lg font-bold uppercase tracking-[0.04em] md:text-xl",
          variant === "white"
            ? "text-gold"
            : "text-on-surface transition-colors hover:text-navy",
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
        src="/brand/logo.png"
        alt={SITE.name}
        width={40}
        height={40}
        className="h-9 w-9 object-contain md:h-10 md:w-10"
        onError={() => setFailed(true)}
      />
    </Link>
  );
}
