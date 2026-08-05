"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { IconArrowRight, IconTrendUp } from "@/components/ui/Icons";
import { HERO_SLIDES } from "@/lib/constants/heroSlides";
import { cn } from "@/lib/utils/cn";

const AUTO_MS = 6000;

export default function HeroSlider({ slides = HERO_SLIDES }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const goToIndex = useCallback((i) => {
    setIndex(i);
  }, []);

  const step = useCallback(
    (delta) => {
      setIndex((current) => {
        const total = slides.length;
        return (current + delta + total) % total;
      });
    },
    [slides.length]
  );

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const id = setInterval(() => step(1), AUTO_MS);
    return () => clearInterval(id);
  }, [step, slides.length, index]);

  return (
    <section
      className="relative overflow-hidden bg-off-white"
      aria-roledescription="carousel"
      aria-label="Featured real estate advertising campaigns"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,169,59,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(13,27,51,0.06),transparent_45%)]"
        aria-hidden
      />

      <Container className="relative grid items-center gap-8 py-10 md:min-h-[560px] md:gap-10 md:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-6 xl:col-span-7">
          <div key={slide.id} className="animate-hero-in">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="solidGold">{slide.eyebrow}</Badge>
              <span className="rounded-full border border-border-soft bg-white px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
                {slide.badge}
              </span>
            </div>

            <h1 className="mt-5 max-w-2xl font-display text-display-lg-mobile font-bold tracking-tight text-navy md:mt-6 md:text-display-lg">
              {slide.title}{" "}
              <span className="text-gold">{slide.highlight}</span>
            </h1>

            <p className="mt-4 max-w-xl font-body text-body-md text-neutral-gray md:mt-5 md:text-body-lg">
              {slide.description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-8">
              <Button href={slide.ctaHref}>
                {slide.ctaLabel}
                <IconArrowRight />
              </Button>
              <Button href={slide.secondaryHref} variant="secondary">
                {slide.secondaryLabel}
              </Button>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-5">
          <div
            key={`${slide.id}-panel`}
            className="animate-hero-in relative mx-auto w-full max-w-lg lg:ml-auto lg:max-w-md"
            style={{ animationDelay: "80ms" }}
          >
            <div
              className="absolute -bottom-2 -right-2 h-[88%] w-[88%] rounded-xl bg-gold/30 sm:-bottom-3 sm:-right-3 md:-bottom-4 md:-right-4 md:bg-gold/35"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-xl border border-border-soft bg-white shadow-elev2">
              {/* Shorter crop on mobile; taller card on desktop */}
              <div className="relative aspect-[16/10] w-full sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 420px"
                  className="object-cover object-[center_35%]"
                  priority={index === 0}
                />
              </div>

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="animate-float rounded border border-border-soft bg-white/95 p-2.5 shadow-elev2 backdrop-blur-sm sm:p-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#f7e7c4] text-[#8a5a00] sm:h-10 sm:w-10">
                      <IconTrendUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-gray">
                        {slide.metricLabel}
                      </p>
                      <p className="font-display text-base font-bold text-navy sm:text-lg">
                        {slide.metricValue}
                      </p>
                      <p className="hidden font-body text-caption text-neutral-gray sm:block">
                        {slide.metricHint}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="relative z-10 pb-10 pt-1 md:pb-16 md:pt-2">
        <div
          className="flex items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Slides"
        >
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goToIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-10 bg-gold"
                  : "w-3 bg-navy/20 hover:bg-navy/40"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
