import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/lib/site";

const tiers = [
  {
    price: "$1,000",
    label: "Focused build",
    pitch:
      "Perfect when you have one clear job—one automation, one connection between tools, or a simple internal tool.",
    justify: [
      "Small scope, fast turnaround; easy for one decision-maker to say yes.",
      "Low-risk way to prove the idea works before spending more.",
      "Still includes written scope, delivery, and handoff—you're not buying vague consulting hours.",
    ],
  },
  {
    price: "$1,500",
    label: "Standard build",
    badge: "Most chosen",
    pitch:
      "One AI-enabled workflow with clear boundaries—what most teams pick when the work is real software people will use, not a slide deck.",
    justify: [
      "One AI-enabled workflow",
      "One or two integrations",
      "One approval step",
      "Written acceptance criteria",
      "Recorded handoff",
      "14-day bug-fix window",
    ],
  },
  {
    price: "$3,000",
    label: "Advanced build",
    pitch:
      "When several systems need to talk to each other, humans must approve steps along the way, or the logic behind the scenes is heavier.",
    justify: [
      "Room for multiple integrations, review checkpoints, and AI where it adds real value.",
      "Documentation your own tech team can pick up—or hand off cleanly to another vendor later.",
      "Worth it when waiting another quarter costs more than moving now.",
    ],
  },
];

const included = [
  "Written scope and definition of done before you pay the deposit",
  "Working software delivered into your accounts—hosted where you want it",
  "Plain-English progress updates during the build",
  "Recorded walkthrough when it's finished so your team knows how to use it",
  "Short bug-fix window after launch (exact length spelled out in your proposal)",
];

const notIncluded = [
  "Open-ended keep adding features forever retainers",
  "Full rebrand or pixel-perfect design from scratch",
  "Scope creep after we freeze the plan—changes become a new quote",
  "Native iPhone/Android apps (web-based delivery)",
];

const timeline = [
  { day: "Intro call", text: "We confirm fit and which package matches your goal." },
  { day: "Proposal", text: "You get a short written plan tied to the package you chose." },
  { day: "Kickoff", text: "Deposit paid; you share access; building starts." },
  { day: "Delivery", text: "Walkthrough, handoff, sign-off—then final payment per agreement." },
];

export function Offer() {
  return (
    <section id="pricing" className="border-t border-border bg-muted/30">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Three fixed packages—and a custom option when you need it
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            You get a{" "}
            <span className="font-medium text-foreground">
              finished piece of work
            </span>{" "}
            at a price fixed before engineering starts—not an open-ended hourly tab or a six-month agency runway.
            Pick the size of the problem; if you&apos;re unsure, the intro call sorts it in fifteen minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.price}
              className={`relative flex flex-col p-8 ${tier.badge ? "border-primary shadow-md ring-1 ring-primary/20" : ""}`}
            >
              {tier.badge ? (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {tier.badge}
                </span>
              ) : null}
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {tier.label}
              </p>
              <p className="mt-3 text-4xl font-semibold tabular-nums tracking-tight">
                {tier.price}
              </p>
              <p className="mt-4 text-sm font-medium leading-snug text-foreground">
                {tier.pitch}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                {tier.justify.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span
                      className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full">
                <ExternalLink href={site.calcomUrl}>
                  {site.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </ExternalLink>
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                Deposit at kickoff; remainder tied to acceptance milestones—exact split in your proposal.
              </p>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-dashed bg-muted/40 p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Beyond the packages
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">
              Need something larger or more tailored?
            </h3>
            <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
              Legacy systems, compliance rules, or a multi-milestone roadmap may not fit a standard box.
              Book a scoping call: we map the work in plain language, quote it as one project or phased milestones,
              and only start once everyone agrees.
            </p>
          </div>
          <Button asChild size="lg" className="mt-8 shrink-0 lg:mt-0">
            <ExternalLink href={site.calcomUrl}>
              Talk through a custom quote
              <ArrowRight className="h-4 w-4" />
            </ExternalLink>
          </Button>
        </Card>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card className="p-8">
            <h3 className="text-base font-semibold">Every package includes</h3>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="text-base font-semibold">Not covered</h3>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {notIncluded.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="text-base font-semibold">How it works</h3>
            <dl className="mt-6 space-y-4 text-sm">
              {timeline.map((item) => (
                <div key={item.day} className="flex flex-col gap-1">
                  <dt className="font-medium text-foreground">{item.day}</dt>
                  <dd className="text-muted-foreground leading-relaxed">{item.text}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </section>
  );
}
