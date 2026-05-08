import { site } from "@/lib/site";

const points = [
  {
    title: "The proposal matches what we ship.",
    body:
      "Underestimating complexity sits on our side—not yours. Scope expands only when leadership signs change orders in writing. That is how mature procurement stays predictable.",
  },
  {
    title: "Timezone discipline without theatrics.",
    body:
      "Remote-first pods with deliberate overlap across US and EU business windows. Kickoff locks review cadences so nobody waits on ambiguous silence.",
  },
  {
    title: "You inherit the asset—not a black box.",
    body:
      "Artifacts land in your repos and environments. No mandatory middleware you cannot sunset. Your internal platform team—or your next partner—extends without archaeology.",
  },
  {
    title: "Honest calendars before heroic promises.",
    body:
      "If an initiative needs more runway than the tier allows, you hear it before signatures—not after deposits clear.",
  },
  {
    title: "Engagements terminate cleanly.",
    body:
      "Structured acceleration—not disguised staff augmentation. When milestones land, governance stays yours.",
  },
  {
    title: "Receipts in public.",
    body: `Delivery commentary and build artifacts surface on X (${site.xHandle})—substance over polish.`,
  },
];

export function HowIWork() {
  return (
    <section
      id="how-i-work"
      className="border-t border-border bg-muted/30"
    >
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Operating principles
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            How {site.companyShort} runs engagements under scrutiny
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Six standards before we hold calendar—because enterprises do not reward ambiguity.
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
