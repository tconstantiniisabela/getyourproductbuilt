import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "Why fixed-price tiers instead of hourly?",
    a: "Hourly engagements blur timelines and invoices. Fixed packages tell finance exactly what they're approving before build starts. We validate fit on a short intro call.",
  },
  {
    q: "Which tier do most teams choose?",
    a: "The $1,500 Standard build is the default when you want usable software—not decks—with visible progress during delivery. Unsure? We map scope to the right bracket live on the call.",
  },
  {
    q: "What happens if timelines slip?",
    a: "Final payments tie to acceptance checkpoints spelled out in your proposal. If delay is on our side without an approved scope change, remedies are defined before kickoff.",
  },
  {
    q: "Are these case studies real client references?",
    a: "Representative deliveries—anonymized or composite where NDAs apply. Named references when clients authorize public attribution.",
  },
  {
    q: "Can our engineering team review the approach before we commit?",
    a: "Yes. Intro calls include walkthroughs of comparable builds. We start once your internal procurement steps are satisfied.",
  },
  {
    q: `Where is ${site.companyShort} based?`,
    a: "Fully remote with overlap across US and EU business hours. Invoicing in USD through standard corporate payment rails.",
  },
  {
    q: `What technologies does ${site.companyShort} use?`,
    a: "Modern web stacks (Next.js-class), managed databases, API integrations, and inference from tier-one providers. Sensitive workloads stay inside your chosen boundaries and secrets tooling.",
  },
  {
    q: "Do you embed as staff augmentation?",
    a: "We lead structured fixed-scope builds first. If a follow-on phase makes sense, we quote it as a bounded continuation—not an open-ended bench.",
  },
  {
    q: "Legal, privacy, and NDAs?",
    a: `Mutual NDAs are standard before detailed scoping. See our Privacy Policy and Terms for site use. Blanket exclusivity or cross-sector non-competes are outside our policy.`,
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
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
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  {item.a}
                  {"links" in item && item.links ? (
                    <span className="mt-3 block">
                      {item.links.map((link, j) => (
                        <span key={link.href}>
                          {j > 0 ? " · " : null}
                          <Link
                            href={link.href}
                            className="font-medium text-foreground underline-offset-4 hover:underline"
                          >
                            {link.label}
                          </Link>
                        </span>
                      ))}
                    </span>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
