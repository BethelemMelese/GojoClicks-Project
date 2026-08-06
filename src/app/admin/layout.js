import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import "./admin.css";

export const metadata = {
  title: "Admin — GojoClicks",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell min-h-screen bg-[#f3f3f3]">
      <header className="border-b border-border-soft bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/admin/bookings" className="inline-flex items-center gap-3">
            <span className="rounded-md bg-white px-2 py-1">
              <BrandLogo variant="light" size="sm" />
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-[0.12em] text-gold">
              Admin
            </span>
          </Link>
          <nav className="flex items-center gap-4 font-body text-sm text-white/80">
            <Link href="/admin/bookings" className="transition hover:text-gold">
              Bookings
            </Link>
            <Link href="/" className="transition hover:text-gold">
              Site
            </Link>
            <AdminLogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
