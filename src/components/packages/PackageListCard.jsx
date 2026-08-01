import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { IconCheck, PackageIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils/cn";

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

  return (
    <Reveal delay={Math.min(index * 80, 320)} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border-soft bg-white shadow-elev1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev2">
        {/* Icon header (replaces photo from design) */}
        <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-navy via-[#152a4a] to-[#0d1b33] md:h-44">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(232,169,59,0.45), transparent 45%)",
            }}
            aria-hidden
          />
          <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-gold ring-1 ring-white/15 transition duration-300 group-hover:scale-105">
            <PackageIcon name={pkg.icon} className="h-8 w-8" />
          </span>

          {pkg.badge ? (
            <div className="absolute right-3 top-3">
              <Badge variant={badgeVariant[pkg.badge] || "muted"}>
                {pkg.badge}
              </Badge>
            </div>
          ) : null}

          <span className="absolute bottom-3 left-3 rounded-full bg-white/10 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-white/85">
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
