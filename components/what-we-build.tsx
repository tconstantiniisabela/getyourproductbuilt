import { Card } from "@/components/ui/card";

const builds = [
  {
    title: "AI Lead Qualifier",
    description:
      "Qualifies incoming leads, prepares context, routes them to the right owner, and drafts a human-approved follow-up.",
  },
  {
    title: "AI Client Onboarding Assistant",
    description:
      "Turns a closed deal into assigned onboarding tasks, required access, internal context, and client-ready next steps.",
  },
  {
    title: "AI Operations Brief",
    description:
      "Pulls data from agreed sources, identifies patterns or blockers, and prepares a human-reviewed weekly decision brief.",
  },
  {
    title: "Custom Internal AI Tool",
    description:
      "A focused internal app that helps a team search, classify, summarize, prioritize, or coordinate work faster.",
  },
];

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="border-t border-border bg-muted/30">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            What we build
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Fixed-scope AI systems for real workflows
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Each engagement targets one operational bottleneck—scoped, priced, and delivered with
            acceptance criteria your team can sign off on.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {builds.map((item) => (
            <Card key={item.title} className="p-8">
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
