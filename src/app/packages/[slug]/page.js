import { notFound } from "next/navigation";
import { getPackageBySlug } from "@/lib/sanity";
import BookingStepper from "@/components/BookingStepper";

export async function generateMetadata({ params }) {
  const pkg = await getPackageBySlug(params.slug);
  return {
    title: pkg ? `${pkg.title} — GojoClicks` : "Package — GojoClicks",
  };
}

export default async function PackageDetailPage({ params }) {
  const pkg = await getPackageBySlug(params.slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div>
      <article style={{ marginBottom: "2rem" }}>
        <h1>{pkg.title}</h1>
        <p>{pkg.description}</p>
        <p>
          <strong>{pkg.price}</strong> ETB
        </p>
        {Array.isArray(pkg.features) && pkg.features.length > 0 && (
          <ul>
            {pkg.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}
      </article>

      <section>
        <h2>Book this package</h2>
        <p>
          Step through the booking form. Exact fields will be finalized next —
          this is the stepper shell.
        </p>
        <BookingStepper
          packageId={pkg._id}
          packageSlug={pkg.slug?.current || pkg.slug}
          packageTitle={pkg.title}
          packagePrice={pkg.price}
        />
      </section>
    </div>
  );
}
