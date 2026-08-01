import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { IconCheck, PackageIcon } from "@/components/ui/Icons";

function formatPrice(price) {
  const numeric = Number(price);
  if (Number.isNaN(numeric)) return String(price);
  return numeric.toLocaleString("en-US");
}

const badgeVariant = {
  BESTSELLER: "navy",
  NEW: "solidGold",
  LIMITED: "muted",
};

export default function PackageListCard({ package: pkg, index = 0 }) {
  const previewFeatures = (pkg.features || []).slice(0, 4);
  const hasImage = Boolean(pkg.image);

  return (
    <Reveal delay={Math.min(index * 80, 320)} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border-soft bg-white shadow-elev1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev2">
        <div className="relative h-44 overflow-hidden bg-navy md:h-48">
          {hasImage ? (
            <Image
              src={pkg.image}
              alt={pkg.imageAlt || `${pkg.title} package`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy via-[#152a4a] to-[#0d1b33]">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-gold ring-1 ring-white/15">
                <PackageIcon name={pkg.icon} className="h-8 w-8" />
              </span>
            </div>
          )}

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/15 to-transparent"
            aria-hidden
          />

          {pkg.badge ? (
            <div className="absolute right-3 top-3 z-10">
              <Badge variant={badgeVariant[pkg.badge] || "muted"}>
                {pkg.badge}
              </Badge>
            </div>
          ) : null}

          <span className="absolute bottom-3 left-3 z-10 rounded-full bg-black/35 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
            {pkg.duration}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-navy md:text-xl">
              {pkg.title}
            </h3>
            <p className="shrink-0 font-display text-lg font-bold text-gold md:text-xl">
              {formatPrice(pkg.price)}{" "}
              <span className="text-xs font-semibold text-neutral-gray">ETB</span>
            </p>
          </div>

          <p className="mt-3 line-clamp-2 font-body text-sm leading-6 text-neutral-gray">
            {pkg.description}
          </p>

          <ul className="mt-5 space-y-2.5">
            {previewFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 font-body text-sm text-on-surface-variant"
              >
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-gold text-navy">
                  <IconCheck className="h-3 w-3" />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <Button href={`/packages/${pkg.slug}`} className="w-full" size="sm">
              View Package Details
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
