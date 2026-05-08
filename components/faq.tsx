import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Why fixed-price tiers instead of hourly?",
    a: "Hourly work encourages dragging timelines and fuzzy invoices. Fixed packages mean you know the cost before we build—which makes approvals easier for managers and finance. Each tier matches a realistic amount of work; we confirm fit on a quick call.",
  },
  {
    q: "Which tier do most organizations choose?",
    a: "The $1,500 Standard build package is what most teams pick when they want working software—not slides—with updates along the way. Not sure? The intro call matches your goal to the right tier.",
  },
  {
    q: "What happens if timelines slip?",
    a: "Commercial terms tie remainder payments to acceptance checkpoints documented in your proposal. If delay originates from my execution without an approved scope amendment, remedies are spelled out before kickoff—no suspense.",
  },
  {
    q: "Are your case studies named enterprise references?",
    a: "Representative deliveries shown here anonymize or composite metrics where NDAs apply. Named references become available as engagements authorize public attribution.",
  },
  {
    q: "Can engineering leadership audit artifacts before commitment?",
    a: "Yes—intro calls include architectural walk-throughs of comparable codebases. Mobilization begins once procurement milestones you define are satisfied.",
  },
  {
    q: "Where are you physically located?",
    a: "Fully remote with intentional overlap across US and EU business hours. Invoicing is USD via standardized rails so finance reconciliation stays frictionless.",
  },
  {
    q: "What stacks and compliance postures do you support?",
    a: "Primary delivery surfaces on modern web stacks—Next.js-class frameworks, managed Postgres, enterprise API gateways, and inference endpoints from tier-one model providers. Sensitive workloads route through your VPC boundaries and secrets managers.",
  },
  {
    q: "Do you operate as an embedded team?",
    a: "Structured accelerations first. If sequential mandates justify retained capacity after delivery, we scope a bounded continuation—not an open-ended bench.",
  },
  {
    q: "Legal frameworks?",
    a: "Mutual NDAs standard. Blanket exclusivity or non-competes that block adjacent sectors are non-starters.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-muted/30">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Answers upfront
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Frequently asked questions
          </h2>

          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-base font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
