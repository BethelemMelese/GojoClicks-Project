import Reveal from "@/components/ui/Reveal";
import { formatEtb } from "@/lib/packages";

export default function PackageRecapCard({ package: pkg }) {
  const duration =
    pkg.duration?.replace(" Campaign", "") || "15 Days";
  const placements = pkg.leads
    ? `${pkg.leads} Leads`
    : `${(pkg.features || []).length} Included`;

  const rows = [
    { label: "Tier", value: pkg.title },
    { label: "Duration", value: duration },
    { label: "Placements", value: placements },
  ];

  return (
    <Reveal>
      <aside className="rounded-lg bg-navy p-6 text-white shadow-elev2 md:p-7">
        <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
          Package Recap
        </p>
        <dl className="mt-5 space-y-4">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
            >
              <dt className="font-body text-sm text-white/60">{row.label}</dt>
              <dd className="font-display text-sm font-semibold text-white">
                {row.value}
              </dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 pt-1">
            <dt className="font-body text-sm text-white/60">Total Due</dt>
            <dd className="font-display text-xl font-bold text-gold">
              {formatEtb(pkg.price)}
            </dd>
          </div>
        </dl>
      </aside>
    </Reveal>
  );
}
