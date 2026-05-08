import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/lib/site";

const tiers = [
  {
    price: "$1,000",
    label: "Precision slice",
    pitch:
      "When leadership agrees something must ship—but nobody owns the last mile.",
    justify: [
      "Ideal for a narrowly bounded automation, internal prototype, or single-integration workflow your backlog keeps bumping.",
      "Keeps procurement painless: one stakeholder sign-off, one artifact, one invoice.",
      "Most teams use this to validate technical feasibility before committing larger capex.",
    ],
  },
  {
    price: "$1,500",
    label: "Momentum sprint",
    badge: "Most chosen",
    pitch:
      "The tier scaling teams pick when they need senior execution without onboarding another vendor org chart.",
    justify: [
      "Balances complexity with calendar discipline—typically one primary surface plus supporting integrations.",
      "Structured for directors who need board-visible progress inside a single reporting window.",
      "Still fixed-scope: if requirements balloon, we document them for the next engagement instead of silently absorbing risk.",
    ],
  },
  {
    price: "$3,000",
    label: "Orchestration layer",
    pitch:
      "When the initiative touches multiple systems, approval chains, or compliance-sensitive handoffs.",
    justify: [
      "Reserved for builds that coordinate APIs, human-in-the-loop review gates, or heavier inference pipelines.",
      "Documentation depth matches handoff expectations—your internal engineering team inherits something maintainable.",
      "Appropriate when delay cost exceeds the premium versus smaller tiers.",
    ],
  },
];

const included = [
  "Written scope + acceptance criteria before deposit clears",
  "Implementation delivered to your repositories and infrastructure accounts",
  "Executive-readable checkpoints during the build cycle",
  "Recorded technical walkthrough at milestone completion",
  "Post-delivery stabilization window (terms vary by tier—confirmed in proposal)",
];

const notIncluded = [
  "Indefinite roadmap staffing disguised as “phase two”",
  "Design-system overhaul beyond production-grade UI polish",
  "Unbounded change requests once scope is frozen",
  "Native mobile applications (web-first delivery)",
];

const timeline = [
  { day: "Discovery", text: "Structured intro—fit, tier selection, and timeline sanity check." },
  { day: "Proposal", text: "Same-day written statement of work aligned to your tier." },
  { day: "Kickoff", text: "Deposit + access provisioning; engineering begins immediately." },
  { day: "Delivery", text: "Artifact review, documentation transfer, sign-off checkpoint." },
];

export function Offer() {
  return (
    <section id="pricing" className="border-t border-border bg-muted/30">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Engagement economics
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Pricing that respects how enterprises actually buy velocity
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            You are not hiring “cheap labor.” You are buying a{' '}
            <span className="font-medium text-foreground">
              time-boxed capability injection
            </span>{' '}
            priced against outcomes your organization already agrees matter—without the drag of multi-quarter vendor onboarding.
            Each tier maps to a realistic complexity envelope. Pick wrong? We correct it on the call before paperwork moves.
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
              <p className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
                Standard commercial terms: deposit at kickoff, remainder tied to acceptance milestones—exact split confirmed in your proposal.
              </p>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-dashed bg-muted/40 p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Beyond the matrix
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">
              Custom architecture &amp; multi-phase programs
            </h3>
            <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
              Some mandates—regulated environments, legacy core integrations, or portfolio-wide automation strategy—do not compress into a prefabricated SKU.
              That does not mean “call us eventually.” It means we scope deliberately on a working session, produce a fixed or phased quote you can defend internally, and only then mobilize engineering.
            </p>
          </div>
          <Button asChild size="lg" className="mt-8 shrink-0 lg:mt-0">
            <a href={site.calcomUrl}>
              Book custom scoping call
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </Card>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card className="p-8">
            <h3 className="text-base font-semibold">Included across tiers</h3>
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
            <h3 className="text-base font-semibold">Explicitly out of scope</h3>
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
            <h3 className="text-base font-semibold">How intake moves</h3>
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
