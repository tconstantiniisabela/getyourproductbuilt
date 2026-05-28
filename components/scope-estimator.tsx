"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/lib/site";
import { productizedOffers } from "@/lib/offers";

type ProblemType =
  | "automation"
  | "internal-tool"
  | "ai-workflow"
  | "reporting"
  | "lead-ops"
  | "support-inbox";

type IntegrationCount = "0-1" | "2-3" | "4+";
type Timeline = "urgent" | "standard" | "flexible";
type UserCount = "solo" | "team" | "multi-team";

type Answers = {
  problem: ProblemType | null;
  integrations: IntegrationCount | null;
  users: UserCount | null;
  timeline: Timeline | null;
  needsApproval: boolean | null;
};

type TierResult = {
  price: string;
  label: string;
  timeline: string;
  summary: string;
  included: string[];
  excluded: string[];
  offerSlug?: string;
};

function recommendTier(answers: Answers): TierResult | null {
  if (
    answers.problem === null ||
    answers.integrations === null ||
    answers.users === null ||
    answers.timeline === null ||
    answers.needsApproval === null
  ) {
    return null;
  }

  let score = 0;
  if (answers.integrations === "2-3") score += 1;
  if (answers.integrations === "4+") score += 2;
  if (answers.users === "team") score += 1;
  if (answers.users === "multi-team") score += 2;
  if (answers.needsApproval) score += 1;
  if (answers.problem === "internal-tool") score += 1;
  if (answers.problem === "ai-workflow") score += 1;

  const offerSlugMap: Partial<Record<ProblemType, string>> = {
    "lead-ops": "lead-qualifier",
    "support-inbox": "inbox-triage",
    reporting: "weekly-report",
  };
  const offerSlug = offerSlugMap[answers.problem];

  if (score <= 1 && answers.integrations === "0-1") {
    return {
      price: "$1,000",
      label: "Focused build",
      timeline: "3–5 business days",
      summary:
        "One clear automation or small tool — single integration, one workflow, one definition of done.",
      included: [
        "Written scope before deposit",
        "One primary integration (e.g. Slack, email, or one API)",
        "Recorded handoff walkthrough",
      ],
      excluded: [
        "Multi-system orchestration",
        "Human approval loops across teams",
        "Custom UI beyond a minimal admin surface",
      ],
      offerSlug,
    };
  }

  if (score <= 3) {
    return {
      price: "$1,500",
      label: "Standard build",
      timeline: "4–6 business days",
      summary:
        "Real software people use — a few integrations, progress updates, bounded scope frozen at kickoff.",
      included: [
        "2–3 integrations (email, Slack, CRM, DB, etc.)",
        "Structured progress updates during build",
        "50% deposit / 50% on delivery",
        "You keep code, accounts, and keys",
      ],
      excluded: [
        "Unlimited revisions after scope freeze",
        "Enterprise compliance programs",
        "Native mobile apps",
      ],
      offerSlug,
    };
  }

  return {
    price: "$3,000",
    label: "Advanced build",
    timeline: "7–10 business days",
    summary:
      "Heavier integrations, approval checkpoints, and room for sophisticated AI where it earns its place.",
    included: [
      "Multiple integrations with error handling",
      "Human-in-the-loop approval steps",
      "Documentation for your tech team",
      "Phased demo checkpoints",
    ],
    excluded: [
      "Open-ended feature backlog",
      "Dedicated on-call retainer",
      "Full product redesign",
    ],
    offerSlug,
  };
}

const STEPS = [
  {
    id: "problem" as const,
    title: "What are you trying to ship?",
    options: [
      { value: "lead-ops" as const, label: "Lead qual / enrichment / outbound ops" },
      { value: "support-inbox" as const, label: "Support inbox triage or drafts" },
      { value: "reporting" as const, label: "Weekly KPI or status reporting" },
      { value: "automation" as const, label: "General automation between tools" },
      { value: "internal-tool" as const, label: "Internal web app or dashboard" },
      { value: "ai-workflow" as const, label: "AI workflow with review steps" },
    ],
  },
  {
    id: "integrations" as const,
    title: "How many systems need to connect?",
    options: [
      { value: "0-1" as const, label: "0–1 (mostly one tool)" },
      { value: "2-3" as const, label: "2–3 (typical stack)" },
      { value: "4+" as const, label: "4+ (heavier orchestration)" },
    ],
  },
  {
    id: "users" as const,
    title: "Who uses it day to day?",
    options: [
      { value: "solo" as const, label: "Just me / one operator" },
      { value: "team" as const, label: "One team (2–10 people)" },
      { value: "multi-team" as const, label: "Multiple teams or clients" },
    ],
  },
  {
    id: "timeline" as const,
    title: "When do you need it live?",
    options: [
      { value: "urgent" as const, label: "Before quarter end (ASAP)" },
      { value: "standard" as const, label: "Within 2–3 weeks" },
      { value: "flexible" as const, label: "Flexible — quality over speed" },
    ],
  },
  {
    id: "needsApproval" as const,
    title: "Must a human approve before anything goes out?",
    options: [
      { value: "yes" as const, label: "Yes — drafts or approvals required" },
      { value: "no" as const, label: "No — fully automated is fine" },
    ],
  },
];

export function ScopeEstimator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    problem: null,
    integrations: null,
    users: null,
    timeline: null,
    needsApproval: null,
  });

  const result = useMemo(() => recommendTier(answers), [answers]);
  const currentStep = STEPS[step];
  const isComplete = step >= STEPS.length;

  function selectOption(value: string) {
    const key = STEPS[step].id;
    let stored: Answers[keyof Answers] = value as Answers[keyof Answers];
    if (key === "needsApproval") {
      stored = value === "yes";
    }
    setAnswers((prev) => ({ ...prev, [key]: stored }));
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setStep(STEPS.length);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({
      problem: null,
      integrations: null,
      users: null,
      timeline: null,
      needsApproval: null,
    });
  }

  const matchedOffer = result?.offerSlug
    ? productizedOffers.find((o) => o.slug === result.offerSlug)
    : undefined;

  return (
    <div className="mx-auto max-w-2xl">
      {!isComplete && currentStep ? (
        <Card className="p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Question {step + 1} of {STEPS.length}
          </p>
          <h2 className="mt-2 text-xl font-semibold">{currentStep.title}</h2>
          <div className="mt-6 flex flex-col gap-3">
            {currentStep.options.map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => selectOption(opt.value)}
                className="rounded-lg border border-border bg-background px-4 py-3 text-left text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Back
            </button>
          ) : null}
        </Card>
      ) : null}

      {isComplete && result ? (
        <Card className="p-8">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Recommended tier
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            {result.label}{" "}
            <span className="text-muted-foreground">· {result.price} fixed</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Typical timeline: {result.timeline}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{result.summary}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Likely in scope</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {result.included.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Likely out of scope</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {result.excluded.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span>−</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {matchedOffer ? (
            <p className="mt-8 rounded-md border border-dashed border-border bg-muted/30 p-4 text-sm">
              This maps closely to our{" "}
              <Link
                href={`/offers/${matchedOffer.slug}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {matchedOffer.title}
              </Link>{" "}
              offer ({matchedOffer.price} · {matchedOffer.timeline}).
            </p>
          ) : null}

          <p className="mt-6 text-sm text-muted-foreground">
            Estimator is guidance only — your intro call confirms written scope and final price before
            any deposit.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <ExternalLink href={site.calcomUrl}>
                {site.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </ExternalLink>
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              Start over
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
