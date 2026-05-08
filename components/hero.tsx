import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col justify-center py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          Intelligent automation for teams that outgrew their backlog
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
          The capability gap isn&apos;t ambition—it&apos;s bandwidth.{" "}
          <span className="text-muted-foreground">
            Close it without another hiring cycle.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Product and ops leaders bring me initiatives that stall behind roadmap
          politics—customer-facing workflows, internal orchestration layers, and
          inference-backed tooling that reads complicated on paper but ships like a
          productized sprint. Fixed structure. Written scope. No six-month vendor
          courtship. Remote execution with US and EU overlap baked in.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href={site.calcomUrl}>
              Reserve a strategy slot
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            View engagement tiers
          </Link>
          <Link
            href="#work"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Selected outcomes
          </Link>
        </div>
        <dl className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Structure
            </dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              Tiered engagements
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              From discovery-ready prototypes to multi-system builds—priced before work begins.
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Velocity
            </dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              Compressed cycles
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              Cadence built for stakeholders who measure quarters in shipped milestones—not slides.
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Coverage
            </dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              US · EU overlap
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              Standing checkpoints during agreed business windows—no guessing where your lead is.
            </dd>
          </div>
        </dl>
        <p className="mt-8 text-sm text-muted-foreground">
          <a
            href={site.xUrl}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Delivery chronicle on X
          </a>
          <span className="mx-2 text-border">·</span>
          Your infrastructure · Your repositories · Your keys
        </p>
      </div>
    </section>
  );
}
