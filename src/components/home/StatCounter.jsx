"use client";

import { useEffect, useRef, useState } from "react";
import useCountUp from "@/hooks/useCountUp";

export default function StatCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 1600,
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const value = useCountUp(end, { duration, active });

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl font-bold text-gold md:text-4xl">
        {prefix}
        {value.toLocaleString("en-US")}
        {suffix}
      </p>
      <p className="mt-2 font-body text-[11px] font-medium uppercase tracking-[0.14em] text-white/75 md:text-xs">
        {label}
      </p>
    </div>
  );
}
