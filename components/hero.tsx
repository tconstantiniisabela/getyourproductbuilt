import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col justify-center py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          Custom AI tools &amp; automation for companies
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
          The project stuck on everyone&apos;s list?{" "}
          <span className="text-muted-foreground">
            I build it—fast, clear price, no mystery process.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          You tell me what needs to exist: for example a smarter customer-support
          workflow, automatic weekly reports pulled from your existing tools, or a
          web app that connects the software you already pay for. I design it,
          build it, hand it over with a walkthrough, and you keep everything—the
          code, the accounts, the keys. Fixed packages so finance sees a number
          before anyone writes code. Updates while we build so you&apos;re never in
          the dark.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href={site.calcomUrl}>
              Book a free intro call
              <ArrowRight className="h-4 w-4" />
            </a>
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
              You pick a package that fits the size of the job—no surprise invoices.
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Timeline
            </dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">
              Short sprints
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              Built in days or weeks—not quarters—with regular check-ins so you see progress.
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
              Calls and updates scheduled when your team is actually at work.
            </dd>
          </div>
        </dl>
        <p className="mt-8 text-sm text-muted-foreground">
          <a
            href={site.xUrl}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Behind-the-scenes on X
          </a>
          <span className="mx-2 text-border">·</span>
          Lives in your systems—you own what ships
        </p>
      </div>
    </section>
  );
}
