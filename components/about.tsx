import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
              {site.companyShort} is a focused delivery studio: senior builders,
              product strategists, and integration specialists who turn stalled roadmaps
              into working software—without standing up another permanent engineering org.
            </p>
            <p>
              Our stack pairs disciplined scope governance with modern AI inference,
              automated pipelines, and infrastructure patterns enterprises already trust.
              Steering committees see the same evidence engineering does—demo-backed
              checkpoints tied to written acceptance criteria—so procurement and delivery
              stay in sync.
            </p>
            <p>
              Whether you are scaling toward enterprise rigor or modernizing internal
              operations, we compress decision latency: scoped proposals first, delivery
              second, clean handoff third. When internal bandwidth returns, your team can
              extend what we ship—or engage us for the next milestone without ambiguity.
            </p>
          </div>

          <div className="mt-10">
            <Button asChild size="lg">
              <a href={site.calcomUrl}>
                Schedule an intro with our team
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
