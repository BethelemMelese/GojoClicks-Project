import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import {
  IconGlobe,
  IconLinkedIn,
  IconShare,
} from "@/components/ui/Icons";
import {
  FOOTER_COLUMNS,
  FOOTER_LEGAL_LINKS,
  SITE,
} from "@/lib/constants/site";

const socialLinks = [
  { href: "https://gojoclicks.com", label: "Website", icon: IconGlobe },
  { href: "#", label: "Share", icon: IconShare },
  { href: "#", label: "LinkedIn", icon: IconLinkedIn },
];

export default function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20 xl:gap-28">
            {/* Brand block */}
            <div className="max-w-sm shrink-0 lg:max-w-xs">
              <BrandLogo variant="dark" size="lg" />
              <p className="mt-4 font-body text-sm leading-6 text-white/60">
                {SITE.description}
              </p>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/15 text-white/70 transition duration-300 hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-12 lg:max-w-2xl lg:gap-16">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.title}>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                    {column.title}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.label}`}>
                        <Link
                          href={link.href}
                          className="font-body text-sm text-white/75 transition duration-300 hover:text-gold"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-xs text-white/45">{SITE.copyright}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-xs text-white/55 transition duration-300 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
