"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BrandLogo from "@/components/ui/BrandLogo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { IconClose, IconMenu } from "@/components/ui/Icons";
import { NAV_LINKS } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
    };

    // Lock scroll (including iOS) so the menu cannot move with the page
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";

    return () => {
      style.overflow = previous.overflow;
      style.position = previous.position;
      style.top = previous.top;
      style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const mobileMenu =
    mounted &&
    createPortal(
      <div className="lg:hidden">
        <div
          className={cn(
            "fixed inset-0 z-[60] bg-navy/45 transition-opacity duration-300",
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          )}
          aria-hidden={!open}
          onClick={() => setOpen(false)}
        />

        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={cn(
            "fixed inset-x-0 top-0 z-[70] flex max-h-[100dvh] flex-col bg-white shadow-elev3 transition-transform duration-300",
            open
              ? "pointer-events-auto translate-y-0"
              : "pointer-events-none -translate-y-full"
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border-soft px-margin-mobile md:h-[72px] md:px-margin-desktop">
            <BrandLogo variant="light" size="md" />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded p-2 text-navy transition hover:bg-surface-container-low"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-margin-mobile py-4 md:px-margin-desktop">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={`mobile-${link.href}-${link.label}`}
                    href={link.href}
                    className={cn(
                      "rounded px-3 py-3.5 font-body text-sm font-medium transition hover:bg-surface-container-low hover:text-navy",
                      active
                        ? "bg-surface-container-low text-navy"
                        : "text-on-surface"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button href="/packages" className="mt-3 w-full">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-transparent bg-white/95 backdrop-blur-md transition-all duration-300",
          scrolled && "border-border-soft shadow-elev1"
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 md:h-[72px]">
          <BrandLogo variant="light" size="md" />

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className={cn(
                    "relative font-body text-sm font-medium text-neutral-gray transition-colors duration-300 hover:text-navy",
                    active && "text-navy"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-300",
                      active && "scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href="/packages" size="sm">
              Get Started
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded p-2 text-navy transition hover:bg-surface-container-low lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </Container>
      </header>

      {mobileMenu}
    </>
  );
}
