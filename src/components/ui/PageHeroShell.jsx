import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

/**
 * Quiet navy page hero. `mood` lightly changes atmosphere so pages don't feel cloned.
 * - about: soft centered wash
 * - packages: cooler, shorter, left-edge gold accent
 */
export default function PageHeroShell({
  children,
  className,
  containerClassName,
  align = "center",
  mood = "about",
}) {
  return (
    <section className={cn("relative overflow-hidden bg-navy", className)}>
      {mood === "about" ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,rgba(232,169,59,0.14),transparent_60%)]"
          aria-hidden
        />
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_100%_30%,rgba(232,169,59,0.12),transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-gold via-gold/50 to-transparent"
            aria-hidden
          />
        </>
      )}

      <Container
        className={cn(
          "relative",
          mood === "about" ? "py-16 md:py-20" : "py-12 md:py-14",
          align === "center" && "text-center",
          containerClassName
        )}
      >
        {children}
      </Container>
    </section>
  );
}
