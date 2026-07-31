import Link from "next/link";

export default function SiteLayout({ children }) {
  return (
    <>
      <header
        style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #e5e5e5" }}
      >
        <nav style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <Link href="/" style={{ fontWeight: 700 }}>
            GojoClicks
          </Link>
          <Link href="/packages">Packages</Link>
          <Link href="/how-it-works">How it works</Link>
        </nav>
      </header>
      <main style={{ padding: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        {children}
      </main>
    </>
  );
}
