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
            You already know deferred roadmap work costs more than any package here.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Fifteen minutes separates another delayed initiative from a scoped engagement
            your CFO can defend. If {site.companyShort} is not the right lane, you leave
            with architecture guidance—not an automated nurture sequence.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button asChild size="lg">
              <a href={site.calcomUrl}>
                Hold time with our team
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
