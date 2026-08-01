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
        // Loop forever: last → first, first → last
        return (current + delta + total) % total;
      });
    },
    [slides.length]
  );

  // Continuous autoplay — never stops; restarts from slide 0 after the last
  useEffect(() => {
    if (slides.length < 2) return undefined;
    const id = setInterval(() => step(1), AUTO_MS);
    return () => clearInterval(id);
  }, [step, slides.length, index]);

  return (
    <section
      className="relative overflow-hidden bg-off-white"
      aria-roledescription="carousel"
      aria-label="Featured advertising campaigns"
    >
      {/* Soft brand wash — no photo background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,169,59,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(13,27,51,0.06),transparent_45%)]"
        aria-hidden
      />

      <Container className="relative grid min-h-[520px] items-center gap-10 py-14 md:min-h-[560px] md:py-18 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-6 xl:col-span-7">
          <div key={slide.id} className="animate-hero-in">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="solidGold">{slide.eyebrow}</Badge>
              <span className="rounded-full border border-border-soft bg-white px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
                {slide.badge}
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl font-display text-display-lg-mobile font-bold tracking-tight text-navy md:text-display-lg">
              {slide.title}{" "}
              <span className="text-gold">{slide.highlight}</span>
            </h1>

            <p className="mt-5 max-w-xl font-body text-body-md text-neutral-gray md:text-body-lg">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            className="animate-hero-in relative mx-auto max-w-md lg:ml-auto"
            style={{ animationDelay: "80ms" }}
          >
            <div
              className="absolute -bottom-3 -right-3 h-[90%] w-[90%] rounded-xl bg-gold/35 md:-bottom-4 md:-right-4"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-xl border border-border-soft bg-white shadow-elev2">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="animate-float rounded border border-border-soft bg-white p-3 shadow-elev2">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-[#f7e7c4] text-[#8a5a00]">
                      <IconTrendUp className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-gray">
                        {slide.metricLabel}
                      </p>
                      <p className="font-display text-lg font-bold text-navy">
                        {slide.metricValue}
                      </p>
                      <p className="font-body text-caption text-neutral-gray">
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

      <Container className="relative z-10 pb-16 pt-2 md:pb-20">
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
