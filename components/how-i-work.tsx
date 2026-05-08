import { site } from "@/lib/site";

const points = [
  {
    title: "The quote matches what ships.",
    body:
      "Underestimating complexity is my liability—not yours. Scope changes happen only when leadership signs off in writing. That is how grown-up procurement runs.",
  },
  {
    title: "Timezone discipline without theatrics.",
    body:
      "Remote-first execution with deliberate overlap across US and EU business windows. Kickoff locks explicit review cadences so nobody waits on ambiguous async silence.",
  },
  {
    title: "You inherit the asset—not a black box.",
    body:
      "Deliverables land in your repos and environments. No mandatory middleware you cannot sunset. Your internal platform team—or your next partner—can extend without archaeology.",
  },
  {
    title: "Underpromise on calendars; overcommunicate on risk.",
    body:
      "If an initiative deserves more runway than the tier suggests, you hear it before signatures—not after deposits clear.",
  },
  {
    title: "Engagements terminate cleanly.",
    body:
      "This is structured acceleration, not disguised staff augmentation. When the milestone lands, governance stays yours.",
  },
  {
    title: "Receipts in public.",
    body: `Technical narrative and delivery artifacts surface on X (${site.xHandle})—substance over polish.`,
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
            How engagements run when reputations are on the line
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Six rules before we reserve calendar—because organizations your size do not reward ambiguity.
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
