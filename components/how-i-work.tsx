import { site } from "@/lib/site";

const points = [
  {
    title: "Pricing matches the promise.",
    body:
      "$1,500 covers the agreed scope. Underestimating effort is on me—scope changes only happen when we both sign off on them in writing.",
  },
  {
    title: "Calendar overlap where it matters.",
    body:
      "I work remote-first and schedule overlap with US East Coast and EU business hours. On kickoff we lock explicit windows for reviews and async turnaround expectations.",
  },
  {
    title: "You keep the asset.",
    body:
      "Code lands in your repo, credentials stay in your accounts, and deliverables don’t depend on a proprietary layer you can’t migrate away from.",
  },
  {
    title: "Honest scoping beats heroic promises.",
    body:
      "If the idea needs more than a week—or isn’t a fit—I’ll say so early and point you to a better option rather than absorb scope silently.",
  },
  {
    title: "Engagements end cleanly.",
    body:
      "Default model is fixed builds, not open retainers. When there’s another milestone worth shipping, we book it deliberately.",
  },
  {
    title: "Process is visible.",
    body: `Follow progress on X (${site.xHandle})—real screenshots, trade-offs, and shipped increments—not polished vapor.`,
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
            How we work together
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Six commitments before you book time—so expectations stay aligned
            from intro call to handoff.
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
