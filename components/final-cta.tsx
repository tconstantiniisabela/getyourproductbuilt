import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="border-t border-border">
      <div className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Next step
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Fifteen minutes to scope the work—and see if we&apos;re the right fit.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            On the intro call we confirm fit, map your work to a package, and outline next steps.
            If {site.companyShort} isn&apos;t the right lane, you leave with useful architecture
            guidance—not an automated nurture sequence.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button asChild size="lg">
              <ExternalLink href={site.calcomUrl}>
                {site.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </ExternalLink>
            </Button>
            <p className="text-sm text-muted-foreground">
              Procurement prefers email first?{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
