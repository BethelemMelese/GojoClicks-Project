"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    searchParams.get("error") === "config"
      ? "Set ADMIN_PASSWORD in .env.local and restart the server."
      : ""
  );
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      const next = searchParams.get("next") || "/admin/bookings";
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err.message || "Login failed");
      setBusy(false);
    }
  };

  return (
    <div className="w-full rounded-lg border border-border-soft bg-white p-6 shadow-elev2 md:p-8">
      <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
        GojoClicks admin
      </p>
      <h1 className="mt-2 font-display text-headline-sm font-bold text-navy">
        Sign in
      </h1>
      <p className="mt-2 font-body text-sm text-neutral-gray">
        Review bookings and verify payment transaction IDs.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          id="adminPassword"
          label="Admin password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? (
          <p className="font-body text-sm text-error">{error}</p>
        ) : null}
        <Button type="submit" variant="primary" disabled={busy} className="w-full">
          {busy ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="font-body text-sm text-neutral-gray">Loading…</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
