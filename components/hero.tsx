import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col justify-center py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          Product builds for solo SaaS founders
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
          One scoped build. Seven days.{" "}
          <span className="text-muted-foreground">Shipped with receipts.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Turn the internal tool, workflow, or MVP you keep postponing into a
          production-ready release—with daily visibility, one invoice, and no
          scope creep. Remote-first; calendar aligned with US and EU teams.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href={site.calcomUrl}>
              Book a 15‑minute intro
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Link
            href="#work"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            View selected work
          </Link>
        </div>
        <dl className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Fixed fee
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-foreground">
              $1,500
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              50% to start · 50% on delivery
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Delivery window
            </dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              7 calendar days
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              Clear brief · daily Loom updates
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Availability
            </dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              US &amp; EU hours
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              Same‑day replies during agreed windows
            </dd>
          </div>
        </dl>
        <p className="mt-8 text-sm text-muted-foreground">
          <a
            href={site.xUrl}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Build log on X
          </a>
          <span className="mx-2 text-border">·</span>
          No retainers · Your repo · Your keys
        </p>
      </div>
    </section>
  );
}
