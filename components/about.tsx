import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="border-t border-border">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Principal execution partner
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            About {site.name}
          </h2>

          <div className="mt-10 space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m {site.name}—I build at the intersection of product discipline and
              applied machine intelligence for organizations tired of watching strategic
              bets decay inside ticket queues.
            </p>
            <p>
              My background is product management. What accelerated my practice was a
              deliberate toolchain: proprietary rapid-deployment pipelines paired with
              frontier inference APIs, disciplined CI/CD, and scope instrumentation that
              turns ambiguous directives into signed acceptance criteria. Your steering
              committee sees progress the same way engineering does—in commits, not vibes.
            </p>
            <p>
              Whether you are a scale-up stretching toward enterprise readiness or an
              established operator modernizing internal workflows, the pattern holds:
              compress decision latency, ship measurable increments, hand off something
              defensible. If your organization already agrees what “good” looks like but
              cannot resource it—this is the straightest line between intent and production.
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
