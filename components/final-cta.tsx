import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="border-t border-border">
      <div className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Decision window
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            You already know what stays on the roadmap costs more than any invoice here.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Fifteen minutes separates “another initiative deferred” from a scoped engagement
            your CFO can recognize. If we are not the right execution lane, you leave with
            architecture notes—not a sales drip campaign.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button asChild size="lg">
              <a href={site.calcomUrl}>
                Lock a calendar slot
                <ArrowRight className="h-4 w-4" />
              </a>
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
