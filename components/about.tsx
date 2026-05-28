import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="border-t border-border">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Who we are
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            About {site.companyName}
          </h2>

          <div className="mt-10 space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            <p>
              {site.companyShort} is a focused delivery studio: builders and integration
              specialists who turn stalled internal tools and automations into working
              software—without standing up another permanent engineering org.
            </p>
            <p>
              We pair disciplined scope governance with modern AI, automated pipelines, and
              infrastructure patterns teams already trust. Checkpoints are demo-backed and tied
              to written acceptance criteria—so procurement and engineering stay aligned.
            </p>
            <p>
              Scoped proposal first, delivery second, clean handoff third. When your bandwidth
              returns, your team extends what we ship—or we quote the next milestone without
              ambiguity.
            </p>
          </div>

          <div className="mt-10">
            <Button asChild size="lg">
              <ExternalLink href={site.calcomUrl}>
                {site.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </ExternalLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
