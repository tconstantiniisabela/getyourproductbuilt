import { Card } from "@/components/ui/card";

const included = [
  "One production-ready feature, workflow, or MVP slice",
  "Implementation on your stack—or a recommended stack if you’re starting clean",
  "Short daily Loom updates (weekdays)",
  "Clean commits and handoff to your repository",
  "Recorded walkthrough at delivery",
  "14 days of post-launch bug fixes included",
];

const notIncluded = [
  "Custom visual design beyond polished product UI (Tailwind-level)",
  "Open-ended roadmap work (available as a separate engagement)",
  "More than three third-party integrations per build",
  "Anything that won’t fit a disciplined 7-day scope",
  "Native mobile apps (web / Next.js focus)",
  "Ad-hoc scope additions mid-build (“small tweaks” add up)",
];

const timeline = [
  { day: "Kickoff", text: "Clarity call + written scope + proposal same day." },
  { day: "Deposit", text: "50% invoice paid; access + expectations locked." },
  { day: "Build", text: "Focused execution with weekday Loom checkpoints." },
  { day: "Delivery", text: "Walkthrough, repo transfer, launch-ready artifact." },
  { day: "Support", text: "Two-week stabilization window at no extra cost." },
];

export function Offer() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            How engagements work
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            A single offer, written for decision speed
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            You arrive with a scoped problem—something concrete enough to design,
            build, and validate inside one week. I translate it into a shipped
            artifact with a fixed fee of{" "}
            <span className="font-medium text-foreground">$1,500</span>, split
            evenly between kickoff and completion. If the agreed deadline slips
            without a mutual scope change, you don&apos;t owe the final payment.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card className="p-8">
            <h3 className="text-base font-semibold">Included</h3>
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
            <h3 className="text-base font-semibold">Not included</h3>
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
            <h3 className="text-base font-semibold">Timeline</h3>
            <dl className="mt-6 space-y-4 text-sm">
              {timeline.map((item) => (
                <div
                  key={`${item.day}-${item.text}`}
                  className="flex flex-col gap-1"
                >
                  <dt className="font-medium text-foreground">{item.day}</dt>
                  <dd className="text-muted-foreground leading-relaxed">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </section>
  );
}
