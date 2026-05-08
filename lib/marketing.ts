import { site, siteOrigin } from "@/lib/site";

/** Voice rules for generated outbound / social copy — company-led, no solo “I/me” framing. */
export const marketingVoice = {
  pronouns: "Use we, our, and AxisForge Labs. Stick to that brand name only—do not introduce alternate company names.",
  avoid: ["I/me/my as the primary voice", "Introducing any company name other than AxisForge Labs"],
  topicsMix:
    "Blend AI execution, product management discipline, and procurement-friendly delivery language.",
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
  return [
    `Brand: ${site.companyName}.`,
    `Website: ${origin}`,
    `Book a call: ${site.calcomUrl}`,
    `LinkedIn profile (personal/company link as configured): ${site.linkedinUrl}`,
    `X: ${site.xUrl}`,
    `Packages: ${marketingPackages.map((p) => `${p.price} ${p.label}`).join("; ")}.`,
  ].join("\n");
}
