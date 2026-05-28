import { site } from "@/lib/site";

const points = [
  {
    title: "The proposal matches what we ship.",
    body:
      "If we underestimate complexity, that sits on our side—not yours. Scope grows only when you sign a written change order.",
  },
  {
    title: "Timezone overlap that actually works.",
    body:
      "Remote-first with deliberate overlap across US and EU business hours. Kickoff locks a review cadence so nobody waits on silence.",
  },
  {
    title: "You inherit the asset—not a black box.",
    body:
      "Code and configs land in your repos and accounts. Your team—or your next vendor—can extend the work without archaeology.",
  },
  {
    title: "Honest calendars before heroic promises.",
    body:
      "If the work needs more runway than the tier allows, you hear it before signatures—not after the deposit clears.",
  },
  {
    title: "Engagements end cleanly.",
    body:
      "Structured delivery—not disguised staff augmentation. When milestones land, governance stays yours.",
  },
  {
    title: "Receipts in public.",
    body: `Build notes and delivery commentary on X (@${site.xHandle})—substance over polish.`,
  },
];

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="border-t border-border bg-muted/30"
    >
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Operating principles
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            How {site.companyShort} runs fixed-scope builds
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Six standards we hold before taking calendar—because unclear scope is how projects stall.
          </p>
        </div>

        <ol className="mt-16 max-w-3xl space-y-10">
          {points.map((point, i) => (
            <li key={point.title} className="flex gap-6">
              <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-medium tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              <div className="space-y-2">
                <h3 className="font-semibold">{point.title}</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
