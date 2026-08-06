const aiHelps = [
  "Make sense of messy inbound: emails, forms, notes, documents, and scattered context",
  "Extract the fields your team actually needs from that information",
  "Draft follow-ups, briefs, checklists, or summaries for a named reviewer",
  "Score or prioritize items against your rules",
  "Flag what's missing before someone spends the afternoon chasing details",
];

const automationHelps = [
  "Start the workflow from one agreed trigger (form, inbox, CRM event, or similar)",
  "Route the work to the right owner every time",
  "Create tasks and send internal alerts in Slack or email",
  "Write approved fields into your CRM or project tools",
  "Keep the same handoff consistent — so the process doesn't depend on memory",
];

export function HowAiIsUsed() {
  return (
    <section id="how-ai-is-used" className="border-t border-border">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            How AI is used
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Built around your workflow—not rigid software
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            First we understand how your team works today. Then we build a custom AI tool around
            that workflow — using AI where judgment helps, and standard automation where the steps
            are predictable — at the automation level you prefer.
          </p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            The goal is simple: take hours of repetitive manual work off your team&apos;s plate,
            without forcing your process into rigid software.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Where AI helps
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {aiHelps.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Where rules and automation help
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {automationHelps.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">How control works. </span>
          AI is decision support. Your team approves consequential and customer-facing actions
          before they go out. If you want more of the path automated, we design for that — still
          scoped to one real workflow, with written acceptance, not an open-ended &ldquo;AI
          transformation.&rdquo;
        </p>
      </div>
    </section>
  );
}
