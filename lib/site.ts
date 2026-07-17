// Single source of truth for site-wide strings. Edit values here, save, then
// refresh the browser (restart `npm run dev` if hot reload seems stuck).

export const site = {
  /** Public-facing brand name */
  companyName: "AxisForge Labs",
  /** Same as company name—kept for call sites that need a short wordmark */
  companyShort: "AxisForge Labs",
  /**
   * Optional principal contact for contracts—kept out of main marketing copy.
   * Remove if you standardize on company-only signing.
   */
  principalName: "Bela Constantini",
  /** Plain hostname only (no https://). Used for SEO metadata when deployed. */
  domain: "getyourproductbuilt.com",
  email: "t.constantini.isabela@gmail.com",
  xHandle: "belaconstantinit",
  xUrl: "https://x.com/belaconstantinit",
  linkedinUrl: "https://www.linkedin.com/in/isabela-constantini-t/",
  calcomUrl: "https://cal.com/bela-constantini-t/15min",
  /** Primary booking CTA — keep consistent across the site */
  ctaLabel: "Book a free intro call",
  /** Legal page last-updated stamps (ISO date) */
  privacyUpdated: "2026-05-28",
  termsUpdated: "2026-05-28",
  /** Q2 inbound campaign deadline */
  q2Deadline: "June 30, 2026",
  // Case study walkthroughs — set NEXT_PUBLIC_LOOM_* in .env.local or paste URLs here
  loomInbox: process.env.NEXT_PUBLIC_LOOM_INBOX?.trim() || "[YOUR_LOOM_URL_INBOX]",
  loomLeadQualifier:
    process.env.NEXT_PUBLIC_LOOM_LEAD_QUALIFIER?.trim() || "[YOUR_LOOM_URL_LEAD_QUALIFIER]",
  loomWeeklyReport:
    process.env.NEXT_PUBLIC_LOOM_WEEKLY_REPORT?.trim() || "[YOUR_LOOM_URL_WEEKLY_REPORT]",
} as const;

/** Canonical site URL for outbound links (email, social drafts). Uses NEXT_PUBLIC_SITE_URL or SITE_URL when set. */
export function siteOrigin(): string {
  const fromEnv =
    typeof process !== "undefined"
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL)?.trim()
      : undefined;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return `https://${site.domain}`;
}
