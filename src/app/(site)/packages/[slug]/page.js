import Image from "next/image";
import { notFound } from "next/navigation";
import BookingStepper from "@/components/BookingStepper";
import { getPackageBySlug, urlForImage } from "@/lib/sanity";

export const revalidate = 60;

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

  const imageUrl = pkg.image
    ? urlForImage(pkg.image)?.width(1200).height(700).url()
    : null;

  return (
    <div>
      <article style={{ marginBottom: "2rem" }}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={pkg.image?.alt || pkg.title}
            width={1200}
            height={700}
            style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
            priority
          />
        )}
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
          packageSlug={pkg.slug}
          packageTitle={pkg.title}
          packagePrice={pkg.price}
        />
      </section>
    </div>
  );
}
