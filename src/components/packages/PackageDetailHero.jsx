import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { IconCheck, PackageIcon } from "@/components/ui/Icons";
import { formatEtb } from "@/lib/packages";

export default function PackageDetailHero({ package: pkg }) {
  const features = (pkg.features || []).slice(0, 4);

  return (
    <section className="relative overflow-hidden border-b border-border-soft bg-off-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_0%,rgba(232,169,59,0.12),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_20%,rgba(13,27,51,0.06),transparent_50%)]"
        aria-hidden
      />

      <Container className="relative grid items-start gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7" direction="left">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="navy">Premium Advertising</Badge>
            {pkg.badge ? (
              <span className="rounded border border-error/20 bg-error/5 px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-[0.1em] text-error">
                {pkg.badge}
              </span>
            ) : null}
          </div>

          <div className="mt-6 flex items-start gap-4">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-navy text-gold shadow-elev1 sm:inline-flex">
              <PackageIcon name={pkg.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="font-display text-display-lg-mobile font-bold tracking-tight text-navy md:text-display-lg">
                {pkg.title}{" "}
                <span className="mt-1 block text-gold md:mt-0 md:inline">
                  {pkg.duration?.replace(" Campaign", "") || "15-Day"} Edition
                </span>
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-xl font-body text-body-md text-neutral-gray md:text-body-lg">
            {pkg.description}
          </p>

          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-3">
            {[
              { label: "Reach", value: pkg.reach },
              { label: "Views", value: pkg.views },
              { label: "Leads", value: pkg.leads },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border-soft bg-white/80 px-3 py-3 shadow-elev1 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-elev2"
              >
                <dt className="font-body text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-gray">
                  {item.label}
                </dt>
                <dd className="mt-1 font-display text-sm font-bold text-navy">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5" direction="right">
          <div className="relative overflow-hidden rounded-xl border border-border-soft bg-white p-6 shadow-elev2 md:p-7">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-[#f0c56a] to-gold"
              aria-hidden
            />
            <div className="flex items-center justify-between gap-3">
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-gray">
                Starting at
              </p>
              {pkg.badge ? (
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-error">
                  Limited spots
                </p>
              ) : (
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-gold">
                  Available now
                </p>
              )}
            </div>
            <p className="mt-3 font-display text-4xl font-bold text-navy">
              {formatEtb(pkg.price)}
            </p>
            <ul className="mt-6 space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 font-body text-sm text-on-surface-variant"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-navy">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button href="#booking" className="mt-8 w-full hover:-translate-y-0.5">
              Secure Package
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
