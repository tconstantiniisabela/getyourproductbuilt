import { site, siteOrigin } from "@/lib/site";

/** Voice rules for company-led outbound / social copy (site, email, X company framing). */
export const marketingVoice = {
  pronouns: "Use we, our, and AxisForge Labs. Stick to that brand name only—do not introduce alternate company names.",
  avoid: ["I/me/my as the primary voice", "Introducing any company name other than AxisForge Labs"],
  topicsMix:
    "Default commercial wedge: The Lead Qualifier ($1,500 / 5 days). Blend AI execution, product management discipline, and procurement-friendly delivery language. Mention Inbox Triage or Weekly Report only when the prospect's pain clearly maps there.",
  heroOffer: {
    slug: "lead-qualifier",
    title: "The Lead Qualifier",
    path: "/offers/lead-qualifier",
    price: "$1,500",
  },
} as const;

/**
 * LinkedIn drafts are written for the founder’s personal profile, then tagged with AxisForge Labs.
 * Keep company pages / site copy on marketingVoice; use this for LinkedIn generators only.
 */
export const linkedInPersonalVoice = {
  author: site.principalName,
  company: site.companyName,
  pronouns:
    "Write in first person as the founder (I / me / my). Sound like a sharp operator sharing a real observation—not a brand page, agency, or corporate newsletter.",
  companyMention:
    `Mention ${site.companyName} naturally when relevant (as the studio behind the work). The author will tag the company page when posting—do not invent @handles or fake employee counts.`,
  topicsMix:
    "Lead with Lead Qualifier pain (form leads sitting cold, Clay/Zapier ceiling, need HITL drafts). Rotate supporting posts across: AI that earns its place in a workflow, fixed-scope delivery vs open-ended retainers, product discipline on small builds, and one stuck internal tool that keeps slipping.",
  avoid: [
    "I'm excited to announce",
    "game-changing / revolutionary / disrupt",
    "hashtag dumps",
    "engagement bait (like if you agree)",
    "invented metrics, logos, or client names",
    "external URLs in the post body (put booking/site only in soft CTA posts, or as plain text once at the end)",
    "corporate we-voice as the primary narrator",
  ],
} as const;

/** Short package facts for prompts — keep aligned with components/offer.tsx tiers. */
export const marketingPackages = [
  {
    price: "$1,000",
    label: "Focused build",
    oneLine:
      "One clear automation or small internal tool—written scope, deposit, definition of done, handoff + recording.",
  },
  {
    price: "$1,500",
    label: "Standard build",
    oneLine:
      "Most chosen: real software people use—bounded scope, integrations like email/Slack/DB, progress updates.",
  },
  {
    price: "$3,000",
    label: "Advanced build",
    oneLine:
      "Heavier integrations, approvals in the loop, room for more sophisticated AI where it earns its place.",
  },
] as const;

export function marketingSiteSummary(): string {
  const origin = siteOrigin();
  const hero = marketingVoice.heroOffer;
  return [
    `Brand: ${site.companyName}.`,
    `Website: ${origin}`,
    `Hero offer: ${hero.title} (${hero.price}) → ${origin}${hero.path}`,
    `Book a call: ${site.calcomUrl}`,
    `LinkedIn profile (personal/company link as configured): ${site.linkedinUrl}`,
    `X: ${site.xUrl}`,
    `Packages: ${marketingPackages.map((p) => `${p.price} ${p.label}`).join("; ")}.`,
  ].join("\n");
}
