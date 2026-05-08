import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="border-t border-border">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Founder → builder
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            About {site.name}
          </h2>

          <div className="mt-10 space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m {site.name} — a product builder focused on AI-assisted
              delivery for founders who need momentum without hiring a full team.
            </p>
            <p>
              My background is product management. What shifted my work
              wasn&apos;t another framework—it was treating Cursor, modern model
              APIs, and disciplined scope as the operating system for shipping.
              Today I pair that stack with explicit timelines and executive-friendly
              updates so stakeholders always know what “done” looks like.
            </p>
            <p>
              I optimize for repeatability: fixed scopes, transparent pricing,
              and artifacts your team (or the next contractor) can extend without
              archaeology. If your roadmap has one stubborn initiative stuck in
              “next sprint,” we can likely turn it into something customers can
              touch inside a week.
            </p>
          </div>

          <div className="mt-10">
            <Button asChild size="lg">
              <a href={site.calcomUrl}>
                Schedule an intro
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
