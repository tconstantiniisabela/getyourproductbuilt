import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const builds = [
  {
    title: "The Lead Qualifier",
    description:
      "Qualifies incoming leads, prepares context, routes them to the right owner, and drafts a human-approved follow-up.",
    href: "/offers/lead-qualifier",
    badge: "Hero offer",
  },
  {
    title: "Inbox Triage",
    description:
      "Classifies shared-inbox mail, drafts replies in your voice for approval, and escalates what needs a human.",
    href: "/offers/inbox-triage",
  },
  {
    title: "The Weekly Report",
    description:
      "Pulls data from agreed sources, identifies patterns or blockers, and prepares a human-reviewed weekly decision brief.",
    href: "/offers/weekly-report",
  },
  {
    title: "Custom internal AI tool",
    description:
      "A focused app for search, classify, summarize, or coordinate—including shapes like client onboarding assistants when scoped as a custom build.",
    href: "#pricing",
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
            acceptance criteria your team can sign off on. Most outbound conversations start with
            The Lead Qualifier.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {builds.map((item) => (
            <Card
              key={item.title}
              className={`p-8 ${item.badge ? "border-primary ring-1 ring-primary/20" : ""}`}
            >
              {item.badge ? (
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {item.badge}
                </p>
              ) : null}
              <h3
                className={`text-lg font-semibold tracking-tight ${item.badge ? "mt-2" : ""}`}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {item.href.startsWith("/offers/") ? "View full scope" : "See packages"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
