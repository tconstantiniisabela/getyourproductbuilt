import { Card } from "@/components/ui/card";

const exclusions = [
  "Full platform replacements",
  "Open-ended AI transformation projects",
  "Autonomous customer-facing agents",
  "Unlimited support retainers",
  "Undefined scopes",
];

export function NotAFit() {
  return (
    <section id="not-a-fit" className="border-t border-border bg-muted/30">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Not a fit
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            When we&apos;re not the right partner
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            AxisForge is not a fit for full platform replacements, open-ended AI transformation
            projects, autonomous customer-facing agents, unlimited support retainers, or undefined
            scopes.
          </p>
        </div>

        <Card className="mt-10 max-w-3xl border-dashed p-8">
          <ul className="space-y-3 text-sm text-muted-foreground">
            {exclusions.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50"
                  aria-hidden
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
