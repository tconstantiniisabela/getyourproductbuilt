import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Why is pricing set at $1,500?",
    a: "Because the scope is intentionally narrow: one shippable increment inside seven days. That discipline keeps assumptions explicit, protects both sides from scope creep, and lets me price from throughput—not inflated agency overhead.",
  },
  {
    q: "What happens if the deadline slips?",
    a: "If we agreed on a delivery date and I miss it without a mutually approved scope change, you don’t owe the final 50%. If what ships isn’t usable or materially incomplete, we reconcile within seven days—either finish or refund the deposit.",
  },
  {
    q: "Is everything here from paying clients?",
    a: "These case studies are representative builds built to production standards; some anonymize metrics or combine patterns from multiple engagements. As paid references accumulate, this page will showcase named testimonials and recordings.",
  },
  {
    q: "Can I review code before committing?",
    a: "During the intro call I’ll walk through comparable repos or snippets so you can judge structure and hygiene. Your specific build begins once the deposit clears—that commitment protects calendar time on both sides.",
  },
  {
    q: "Where are you located?",
    a: "Fully remote. I don’t publish a home base; what matters is predictable overlap with US and EU working hours and invoicing in USD via Stripe so finance stays simple.",
  },
  {
    q: "What stacks do you support?",
    a: "Default path: Next.js (App Router), Tailwind, Postgres or Supabase, Vercel, Stripe, and OpenAI/Anthropic APIs. Comfortable adapting to React frontends with your existing API layer or FastAPI when ML integrations dominate.",
  },
  {
    q: "Do you take retainers?",
    a: "Most founders book sequential fixed builds. If ongoing capacity makes sense after the first delivery, we can discuss a limited-hours retainer with a three-month minimum.",
  },
  {
    q: "Will you sign legal paperwork?",
    a: "Mutual NDAs are fine. I won’t sign blanket exclusivity or non-competes that block helping adjacent founders.",
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
