export default function FormSection({ title, children }) {
  return (
    <section className="space-y-4 border-t border-border-soft pt-6 first:border-0 first:pt-0">
      {title ? (
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-navy/70">
          {title}
        </h3>
      ) : null}
      {children}
    </section>
  );
}
