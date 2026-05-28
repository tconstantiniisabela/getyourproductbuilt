import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col justify-center py-24">
      <div className="max-w-5xl">
        <Logo className="[&_[data-mark]]:h-[10.5rem] [&_[data-mark]]:max-h-[13.5rem] sm:[&_[data-mark]]:h-[12rem] sm:[&_[data-mark]]:max-h-[15rem] [&_img]:max-w-full" />
        <p className="mt-8 text-sm font-medium uppercase tracking-wider text-primary">
          {site.companyShort} — Custom AI tools &amp; automation for companies
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
          Got a project stuck on everyone&apos;s list?{" "}
          <span className="text-muted-foreground">
            We ship it—fast, at a fixed price, with no mystery process.
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
          You describe what needs to exist—support triage with human-approved drafts, weekly reports
          pulled from tools you already use, or a web app that connects your stack end to end. We design
          it, build it, and hand it over with a recorded walkthrough. You keep the code, accounts, and
          keys. Price is fixed before engineering starts. Progress updates keep stakeholders aligned.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <ExternalLink href={site.calcomUrl}>
              {site.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </ExternalLink>
          </Button>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            See pricing
          </Link>
          <Link
            href="#work"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            See example projects
          </Link>
        </div>
        <dl className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Pricing
            </dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              Agreed upfront
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              Three packages scoped to job size—no surprise invoices after kickoff.
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Timeline
            </dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              Days to weeks
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              Short sprints with checkpoints your team can plan around—not quarter-long runways.
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
              Calls and status blocks aligned with your business calendar.
            </dd>
          </div>
        </dl>
        <p className="mt-8 text-sm text-muted-foreground">
          <ExternalLink
            href={site.xUrl}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Delivery notes on X
          </ExternalLink>
          <span className="mx-2 text-border">·</span>
          Deployed in your systems—you retain ownership end to end
        </p>
      </div>
    </section>
  );
}
