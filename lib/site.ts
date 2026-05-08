// Single source of truth for site-wide strings. Edit values here, save, then
// refresh the browser (restart `npm run dev` if hot reload seems stuck).

export const site = {
  name: "Bela Constantini",
  firstName: "Bela",
  /** Plain hostname only (no https://). Used for SEO metadata when deployed. */
  domain: "getyourproductbuilt.com",
  email: "t.constantini.isabela@gmail.com",
  xHandle: "belaconstantinit",
  xUrl: "https://x.com/belaconstantinit",
  linkedinUrl: "https://www.linkedin.com/in/isabela-constantini-t/",
  calcomUrl: "https://cal.com/isabela-constantini-t-b5sqlt/15min",
  // Case study walkthroughs — paste real Loom share URLs when you have them
  loomInbox: "[YOUR_LOOM_URL_INBOX]",
  loomLeadQualifier: "[YOUR_LOOM_URL_LEAD_QUALIFIER]",
  loomWeeklyReport: "[YOUR_LOOM_URL_WEEKLY_REPORT]",
} as const;
