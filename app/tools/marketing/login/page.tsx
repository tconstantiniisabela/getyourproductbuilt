"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { safeMarketingRedirect } from "@/lib/safe-redirect";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeMarketingRedirect(searchParams.get("next"));
  const googleError = searchParams.get("googleError");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/marketing/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Incorrect password or tools disabled.");
      return;
    }
    router.replace(next);
    router.refresh();
  }

  return (
    <div className="container flex min-h-[80vh] max-w-md flex-col justify-center gap-8 py-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">AxisForge Labs internal</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Growth dashboard login</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Enter the access phrase from your server env{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">MARKETING_DASHBOARD_SECRET</code>.
        </p>
      </div>
      {googleError ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Google connection failed ({googleError}). Try again from the dashboard.
        </p>
      ) : null}
      <form className="flex flex-col gap-4" onSubmit={submit}>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Access phrase
          <input
            type="password"
            autoComplete="current-password"
            className="rounded-md border border-input bg-background px-4 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit">Continue</Button>
      </form>
      <Button variant="ghost" asChild className="self-start">
        <Link href="/">Back to site</Link>
      </Button>
    </div>
  );
}

export default function MarketingLoginPage() {
  return (
    <Suspense fallback={<div className="container py-16 text-muted-foreground">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
