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
  xHandle: "AxisForgeLabs",
  xUrl: "https://x.com/AxisForgeLabs",
  linkedinUrl: "https://www.linkedin.com/company/axisforge-labs/",
  calcomUrl: "https://cal.com/bela-constantini-t/15min",
  /** Primary booking CTA — keep consistent across the site */
  ctaLabel: "Book a free intro call",
  /** Legal page last-updated stamps (ISO date) */
  privacyUpdated: "2026-05-28",
  termsUpdated: "2026-05-28",
  // Case study walkthroughs — env overrides these defaults when set on Vercel
  loomLeadQualifier:
    process.env.NEXT_PUBLIC_LOOM_LEAD_QUALIFIER?.trim() ||
    "https://www.loom.com/share/1f7bb81420ab4dd191bb487ca38cbf65",
  loomInbox:
    process.env.NEXT_PUBLIC_LOOM_INBOX?.trim() ||
    "https://www.loom.com/share/5d77568456754699beb9e7bdf627d1d6",
  loomWeeklyReport:
    process.env.NEXT_PUBLIC_LOOM_WEEKLY_REPORT?.trim() ||
    "https://www.loom.com/share/4a253bede72d4ce99bc0b16c041a88d8",
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

/**
 * Public production origin for customer-facing links in drafts (Reddit, email, etc.).
 * Never returns localhost — local NEXT_PUBLIC_SITE_URL would leak into copy.
 */
export function publicSiteOrigin(): string {
  const fromEnv =
    typeof process !== "undefined"
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL)?.trim()
      : undefined;
  if (fromEnv) {
    const cleaned = fromEnv.replace(/\/$/, "");
    if (!/localhost|127\.0\.0\.1/i.test(cleaned)) return cleaned;
  }
  return `https://${site.domain}`;
}
