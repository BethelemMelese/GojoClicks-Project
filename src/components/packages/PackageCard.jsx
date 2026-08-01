import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import {
  IconChat,
  IconCheck,
  IconEye,
  IconStar,
  IconUsers,
  PackageIcon,
} from "@/components/ui/Icons";
import { cn } from "@/lib/utils/cn";

function formatPrice(price) {
  const numeric = Number(price);
  if (Number.isNaN(numeric)) return String(price);
  return numeric.toLocaleString("en-US");
}

export default function PackageCard({ package: pkg, index = 0 }) {
  const tone = pkg.cardTone || (pkg.featured ? "primary" : "default");
  const isPrimary = tone === "primary";
  const isSecondary = tone === "secondary";
  const href = `/packages/${pkg.slug}`;

  const metricTones = isPrimary
    ? [
        { key: "reach", label: "Reach", icon: IconUsers, tone: "text-gold bg-white/10" },
        { key: "views", label: "Views", icon: IconEye, tone: "text-gold bg-white/10" },
        { key: "leads", label: "Leads", icon: IconChat, tone: "text-gold bg-white/10" },
      ]
    : isSecondary
      ? [
          { key: "reach", label: "Reach", icon: IconUsers, tone: "text-navy bg-white/50" },
          { key: "views", label: "Views", icon: IconEye, tone: "text-navy bg-white/50" },
          { key: "leads", label: "Leads", icon: IconChat, tone: "text-navy bg-white/50" },
        ]
      : [
          {
            key: "reach",
            label: "Reach",
            icon: IconUsers,
            tone: "text-[#0f9f6e] bg-[#e8f8f1]",
          },
          {
            key: "views",
            label: "Views",
            icon: IconEye,
            tone: "text-[#2563eb] bg-[#eaf1ff]",
          },
          {
            key: "leads",
            label: "Leads",
            icon: IconChat,
            tone: "text-[#7c3aed] bg-[#f2ebff]",
          },
        ];

  return (
    <Reveal delay={index * 100} className="h-full">
      <article
        className={cn(
          "relative flex h-full flex-col rounded-lg border p-5 transition-all duration-300 md:p-6",
          isPrimary &&
            "scale-[1.02] border-navy bg-navy text-white shadow-elev3 md:-mt-3 md:mb-3",
          isSecondary &&
            "border-gold/40 bg-[#fff8eb] text-navy shadow-elev1",
          tone === "default" &&
            "border-border-soft bg-white shadow-elev1 hover:-translate-y-1 hover:shadow-elev2"
        )}
      >
        {isPrimary && (
          <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
            <Badge variant="solidGold">Most Popular</Badge>
          </div>
        )}

        <div className={cn("flex flex-col items-center text-center", isPrimary && "pt-2")}>
          <span
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-lg",
              isPrimary && "bg-white/10 text-gold",
              isSecondary && "bg-[#f7e7c4]/70 text-[#8a5a00]",
              tone === "default" && "bg-[#f7e7c4] text-[#8a5a00]"
            )}
          >
            <PackageIcon name={pkg.icon} />
          </span>
          <h3
            className={cn(
              "mt-3 font-display text-lg font-semibold",
              isPrimary ? "text-white" : "text-on-surface"
            )}
          >
            {pkg.title}
          </h3>
          <p
            className={cn(
              "mt-2 font-display text-2xl font-bold md:text-[1.65rem]",
              isPrimary ? "text-gold" : "text-navy"
            )}
          >
            {formatPrice(pkg.price)}{" "}
            <span
              className={cn(
                "text-sm font-semibold",
                isPrimary ? "text-white/70" : "text-neutral-gray"
              )}
            >
              ETB
            </span>
          </p>
          <span
            className={cn(
              "mt-2 rounded-full px-3 py-1 font-body text-[11px] font-semibold",
              isPrimary && "bg-white/10 text-gold",
              isSecondary && "bg-[#f7e7c4]/80 text-[#8a5a00]",
              tone === "default" && "bg-[#f7e7c4] text-[#8a5a00]"
            )}
          >
            {pkg.duration}
          </span>
        </div>

        <ul
          className={cn(
            "mt-5 space-y-2.5 border-y py-4",
            isPrimary ? "border-white/15" : "border-black/10"
          )}
        >
          {metricTones.map(({ key, label, icon: Icon, tone: iconTone }) => (
            <li key={key} className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-2 font-body text-sm",
                  isPrimary ? "text-white/80" : "text-on-surface-variant"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-7 w-7 items-center justify-center rounded-full",
                    iconTone
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {label}
              </span>
              <span
                className={cn(
                  "font-display text-sm font-bold",
                  isPrimary ? "text-white" : "text-on-surface"
                )}
              >
                {pkg[key]}
              </span>
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex-1 space-y-2.5">
          {pkg.features.map((feature) => {
            const isHighlight = pkg.highlightFeature === feature;
            return (
              <li
                key={feature}
                className={cn(
                  "flex items-start gap-2 font-body text-sm",
                  isPrimary ? "text-white/80" : "text-on-surface-variant"
                )}
              >
                {isHighlight ? (
                  <span className={cn("mt-0.5", isPrimary ? "text-gold" : "text-navy")}>
                    <IconStar className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className={cn("mt-0.5", isPrimary ? "text-gold" : "text-[#0f9f6e]")}>
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                )}
                <span
                  className={cn(
                    isHighlight && "font-semibold",
                    isHighlight && (isPrimary ? "text-white" : "text-on-surface")
                  )}
                >
                  {feature}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <Button
            href={href}
            variant={isPrimary ? "primary" : isSecondary ? "navy" : "secondary"}
            className={cn(
              "w-full",
              isSecondary && "border-navy bg-navy text-white hover:bg-[#152741]"
            )}
            size="sm"
          >
            Choose Package
          </Button>
        </div>
      </article>
    </Reveal>
  );
}
