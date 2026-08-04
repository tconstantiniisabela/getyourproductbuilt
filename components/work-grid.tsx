import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { site } from "@/lib/site";
import { Card } from "@/components/ui/card";

export const projects = [
  {
    slug: "lead-qualifier",
    title: "Outbound enrichment for B2B revenue teams",
    summary:
      "Replaced brittle SaaS glue with one controlled enrichment workflow—better reply quality without stacking vendor contracts.",
    outcome: "Reply lift 1.8% → 4.6% on first 600 sends (representative).",
    tags: ["Next.js", "Inference APIs", "CRM exports", "6-day cycle"],
    featured: true,
  },
  {
    slug: "inbox-triage",
    title: "Support inbox triage with human-approved drafts",
    summary:
      "Routed repetitive support mail through classification and draft replies—ops kept control with approval before anything sent.",
    outcome: "Manual handling ~2 hrs/day → ~15 min review (representative).",
    tags: ["Next.js", "LLM orchestration", "Slack", "5-day cycle"],
  },
  {
    slug: "weekly-report",
    title: "Executive reporting automation for services firms",
    summary:
      "Pulled billing, product analytics, and delivery data into Monday-ready stakeholder updates—no more Sunday reconciliation.",
    outcome: "Weekly assembly ~4 hrs → ~15 min review (representative).",
    tags: ["Next.js", "Stripe", "PostHog", "4-day cycle"],
  },
];

export function WorkGrid() {
  return (
    <section id="work" className="border-t border-border">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Example deliveries
          </p>
          <h2 className="mt-3 flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight md:text-4xl">
            <LogoMark className="h-11 max-h-12 shrink-0 md:h-12 md:max-h-14" aria-hidden />
            <span>Representative outcomes</span>
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Short-cycle builds from {site.companyShort}—anonymized or composite where NDAs apply.
            Named client references and public Looms publish as soon as clients authorize (see proof
            collection). Lead Qualifier is shown first as the primary offer shape.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Card
                className={`h-full p-8 transition-colors group-hover:border-primary ${
                  project.featured ? "border-primary/40 ring-1 ring-primary/15" : ""
                }`}
              >
                <div className="flex h-full flex-col">
                  {project.featured ? (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
                      Hero offer · Lead Qualifier
                    </p>
                  ) : null}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-balance text-base font-semibold leading-snug">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-snug text-foreground">
                    {project.outcome}
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
