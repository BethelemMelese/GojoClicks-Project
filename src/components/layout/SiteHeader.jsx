"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-white/95 backdrop-blur-md transition-all duration-300",
        scrolled && "border-border-soft shadow-elev1"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <BrandLogo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
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

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border-soft bg-white transition-all duration-300 lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 border-t-0 opacity-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={`mobile-${link.href}-${link.label}`}
              href={link.href}
              className="rounded px-3 py-3 font-body text-sm font-medium text-on-surface transition hover:bg-surface-container-low hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/packages" className="mt-2 w-full">
            Get Started
          </Button>
        </Container>
      </div>
    </header>
  );
}
