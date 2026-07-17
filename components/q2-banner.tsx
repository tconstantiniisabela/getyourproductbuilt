import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { ExternalLink } from "@/components/external-link";

export function Q2Banner() {
  return (
    <div
      role="region"
      aria-label="Fixed-scope delivery notice"
      className="border-b border-primary/20 bg-primary/5"
    >
      <div className="container flex flex-col gap-2 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-pretty text-foreground">
          Quarter-end passed; the internal tool still isn&apos;t shipped. Fixed scope, deposit at
          kickoff, definition of done in writing.
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/tools/scope-estimator"
            className="font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Scope estimator
          </Link>
          <ExternalLink
            href={site.calcomUrl}
            className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
          >
            {site.ctaLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
