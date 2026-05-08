import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Why fixed-price tiers instead of hourly?",
    a: "Hourly engagements blur timelines and invoices. Fixed packages tell finance exactly what they are approving before build starts. Each tier reflects a realistic workload band—we validate fit on a short intro call.",
  },
  {
    q: "Which tier do most organizations choose?",
    a: "The $1,500 Standard build package is the default when teams want usable software—not decks—with visible progress during delivery. Unsure? We map scope to the right bracket live.",
  },
  {
    q: "What happens if timelines slip?",
    a: "Remainder payments tie to acceptance checkpoints spelled out in your proposal. If delay originates on our side without an approved scope amendment, remedies are defined before kickoff—no ambiguity.",
  },
  {
    q: "Are these case studies named enterprise references?",
    a: "Representative deliveries anonymize or composite metrics where NDAs apply. Named references surface once clients authorize public attribution.",
  },
  {
    q: "Can engineering leadership audit artifacts before commitment?",
    a: "Yes—intro calls include architectural reviews of comparable builds. Mobilization begins once procurement milestones on your side are satisfied.",
  },
  {
    q: "Where is Northtrace based?",
    a: "Fully remote with deliberate overlap across US and EU business hours. Invoicing runs in USD through standard corporate rails for simpler reconciliation.",
  },
  {
    q: "What technologies does Northtrace support?",
    a: "Modern web platforms (including Next.js-class stacks), managed databases, enterprise API gateways, and inference endpoints from tier-one providers. Sensitive workloads remain inside your chosen boundaries and secrets tooling.",
  },
  {
    q: "Does Northtrace embed as staff augmentation?",
    a: "We lead structured accelerations first. If subsequent mandates justify retained capacity, we quote bounded continuation phases—not open-ended benches.",
  },
  {
    q: "Legal frameworks?",
    a: "Mutual NDAs are standard. Blanket exclusivity or cross-sector non-competes are outside our policy.",
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
