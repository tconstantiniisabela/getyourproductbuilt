import { site, siteOrigin, publicSiteOrigin } from "@/lib/site";
import { marketingPackages } from "@/lib/marketing";
import type { Lead } from "@/lib/marketing-store";

const HERO_OFFER_PATH = "/offers/lead-qualifier";

export function outreachSubject(segment?: string): string {
  const seg = segment?.trim();
  if (seg) return `${seg}: lead qualifier in 5 days (fixed scope)`;
  return "Lead qualifier for your inbound form — fixed $1,500?";
}

export function outreachBody(lead: Pick<Lead, "name" | "company">): string {
  const greet = lead.name?.trim() ? `Hi ${lead.name.trim()},` : "Hi,";
  const co = lead.company?.trim() ? ` At ${lead.company.trim()},` : "";
  const origin = publicSiteOrigin();
  return [
    greet,
    "",
    `We help B2B teams ship a fixed-scope Lead Qualifier—webhook → enrich → ICP score → Slack draft for human approval → CRM.${co} $1,500, five business days, written scope before deposit.`,
    "",
    `Full scope: ${origin}${HERO_OFFER_PATH}`,
    `Other packages (${marketingPackages.map((p) => p.price).join(", ")}) if the shape differs: ${siteOrigin()}`,
    `Intro call: ${site.calcomUrl}`,
    "",
    "— AxisForge Labs",
    "",
    "If you'd rather not hear from us, reply stop and we'll remove you.",
  ].join("\n");
}
