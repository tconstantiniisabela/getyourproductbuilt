import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export const projects = [
  {
    slug: "inbox-triage",
    title: "Enterprise-grade support triage for high-volume commerce analytics",
    summary:
      "Reduced manual tier-one handling by routing repetitive inquiries through structured classification—with human-approved drafts and escalation paths ops trusts.",
    tags: ["Next.js", "LLM orchestration", "Slack", "5-day cycle"],
  },
  {
    slug: "lead-qualifier",
    title: "Outbound enrichment pipeline for B2B revenue teams",
    summary:
      "Consolidated brittle SaaS glue code into a controlled enrichment workflow—lifting reply quality without multiplying vendor contracts.",
    tags: ["Next.js", "Inference APIs", "CRM exports", "6-day cycle"],
  },
  {
    slug: "weekly-report",
    title: "Executive reporting automation for multi-account services firms",
    summary:
      "Unified billing, product analytics, and delivery telemetry into Monday-ready stakeholder narratives—eliminating Sunday reconciliation drag.",
    tags: ["Next.js", "Stripe", "PostHog", "4-day cycle"],
  },
];

export function WorkGrid() {
  return (
    <section id="work" className="border-t border-border">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Instrumented deliveries
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Representative outcomes
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Illustrative programs executed inside compressed delivery cycles—the kind of builds leadership green-lights when external credibility matters as much as internal throughput.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Card className="h-full p-8 transition-colors group-hover:border-primary">
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-balance text-base font-semibold leading-snug">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
