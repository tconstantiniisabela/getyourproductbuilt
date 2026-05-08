import { site, siteOrigin } from "@/lib/site";
import { marketingPackages } from "@/lib/marketing";
import type { Lead } from "@/lib/marketing-store";

export function outreachSubject(segment?: string): string {
  const seg = segment?.trim();
  if (seg) return `${seg}: fixed-scope internal tools (quick question)`;
  return "Fixed-scope build for your next internal tool?";
}

export function outreachBody(lead: Pick<Lead, "name" | "company">): string {
  const greet = lead.name?.trim() ? `Hi ${lead.name.trim()},` : "Hi,";
  const co = lead.company?.trim() ? ` At ${lead.company.trim()},` : "";
  return [
    greet,
    "",
    `We help teams ship bounded internal tools and AI-assisted workflows—written scope, deposit at kickoff, and a clear definition of done.${co} Our builds sit in fixed tiers (${marketingPackages.map((p) => p.price).join(", ")}) so procurement gets a clean quote.`,
    "",
    `If a backlog item keeps slipping, we can usually map fit on a short intro call: ${siteOrigin()} · ${site.calcomUrl}`,
    "",
    "— AxisForge Labs",
    "",
    "If you'd rather not hear from us, reply stop and we'll remove you.",
  ].join("\n");
}
