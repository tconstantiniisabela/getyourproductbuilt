import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export const projects = [
  {
    slug: "inbox-triage",
    title: "Support inbox triage for a solo Shopify analytics founder",
    summary:
      "From ~2 hours daily on repetitive tickets to ~15 minutes—with routing, drafts, and Slack escalations tuned to one voice.",
    tags: ["Next.js", "Claude", "Slack", "5 days"],
  },
  {
    slug: "lead-qualifier",
    title: "Outbound enrichment for B2B mid-market sales",
    summary:
      "Replaced a brittle multi-tool stack with a pipeline that lifted replies and doubled qualified meetings—without bloating monthly SaaS spend.",
    tags: ["Next.js", "Claude", "GPT-4o", "6 days"],
  },
  {
    slug: "weekly-report",
    title: "Weekly client reporting for a solo agency",
    summary:
      "Automated Sunday reporting across Stripe, PostHog, and Linear—turning hours of dashboards into client-ready narratives.",
    tags: ["Next.js", "Stripe", "PostHog", "4 days"],
  },
];

export function WorkGrid() {
  return (
    <section id="work" className="border-t border-border">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Evidence, not promises
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Selected work
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Three representative builds—each delivered inside a week-long sprint.
            Open a project for architecture notes, stack choices, and what
            changed after launch.
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
