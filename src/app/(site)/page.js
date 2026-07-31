import Image from "next/image";
import Link from "next/link";
import { getFeaturedPackages, urlForImage } from "@/lib/sanity";

export const revalidate = 60;

export default async function HomePage() {
  const featuredPackages = await getFeaturedPackages(3);

  return (
    <div>
      <section style={{ marginBottom: "2.5rem" }}>
        <h1>GojoClicks</h1>
        <p>
          Advertising packages for brands in Ethiopia. Browse a package, submit
          your campaign assets, and pay when you are ready.
        </p>
        <p style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Link href="/packages">View all packages</Link>
          <Link href="/how-it-works">How it works</Link>
        </p>
      </section>

      <section>
        <h2>Featured packages</h2>
        {featuredPackages.length === 0 ? (
          <p>
            No featured packages yet. Add packages in{" "}
            <Link href="/studio">Sanity Studio</Link> and mark them as featured.
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
            {featuredPackages.map((pkg) => {
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
                  <h3>{pkg.title}</h3>
                  <p>{pkg.description}</p>
                  <p>
                    <strong>{pkg.price}</strong> ETB
                  </p>
                  <Link href={`/packages/${pkg.slug}`}>View package</Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
