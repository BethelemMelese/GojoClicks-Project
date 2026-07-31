import Image from "next/image";
import Link from "next/link";
import { getPackages, urlForImage } from "@/lib/sanity";

export const metadata = {
  title: "Packages — GojoClicks",
};

export const revalidate = 60;

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div>
      <h1>All packages</h1>
      <p>Choose an advertising package to start your booking.</p>

      {packages.length === 0 ? (
        <p>
          No packages found. Add them in <Link href="/studio">Sanity Studio</Link>
          .
        </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gap: "1rem",
          }}
        >
          {packages.map((pkg) => {
            const imageUrl = pkg.image
              ? urlForImage(pkg.image)?.width(800).height(500).url()
              : null;

            return (
              <li
                key={pkg._id}
                style={{ border: "1px solid #e5e5e5", padding: "1rem" }}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={pkg.image?.alt || pkg.title}
                    width={800}
                    height={500}
                    style={{
                      width: "100%",
                      height: "auto",
                      marginBottom: "0.75rem",
                    }}
                  />
                )}
                <h2>{pkg.title}</h2>
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
                <Link href={`/packages/${pkg.slug}`}>Book this package</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
