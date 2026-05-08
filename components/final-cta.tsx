import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
            Bring the project that deserves a finish line.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Fifteen minutes to pressure-test scope, confirm fit, and outline what
            “done” looks like. If we’re misaligned, you’ll get a quick no—and an
            introduction when someone else is the better match.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button asChild size="lg">
              <a href={site.calcomUrl}>
                Book a 15‑minute intro
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              Prefer email?{" "}
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
