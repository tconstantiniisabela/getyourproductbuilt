import { site } from "@/lib/site";

export type CaseStudy = {
  slug: string;
  title: string;
  oneLiner: string;
  loomUrl: string;
  problem: string;
  solution: string[];
  stack: string[];
  timeline: { day: string; text: string }[];
  outcome: string[];
  notes: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "inbox-triage",
    title: "Support inbox triage for a solo Shopify analytics founder",
    oneLiner:
      "From ~2 hours daily on repetitive tickets to ~15 minutes—with routing, drafts, and Slack escalations tuned to one voice.",
    loomUrl: site.loomInbox,
    problem:
      "A solo founder running a $40K MRR Shopify analytics SaaS was spending the first two hours of every workday triaging support email — about half were the same five questions, repeated. He wanted to keep replying himself (it's a major retention lever for him), but stop reading the obvious ones.",
    solution: [
      "Connected Gmail via OAuth and watched a single labeled inbox.",
      "Each new email runs through Claude 3.5 Sonnet with the founder's docs as context.",
      "Classifier outputs one of: bug, billing, how-to, feature request, partnership, spam.",
      "How-to and billing get an auto-drafted reply with the founder's tone, parked in Drafts for one-click send.",
      "Bug + feature requests get a Slack ping with full context and a suggested next action.",
      "Everything else stays in inbox untouched.",
    ],
    stack: [
      "Next.js 14 (App Router)",
      "Gmail API with OAuth",
      "Anthropic Claude 3.5 Sonnet",
      "Vercel Cron (every 5 min)",
      "Slack incoming webhooks",
      "Supabase (audit log + tone profile)",
    ],
    timeline: [
      { day: "Day 1", text: "Gmail OAuth + classifier prompt + label routing." },
      { day: "Day 2", text: "Tone profile from his last 200 sent emails. Draft generator." },
      { day: "Day 3", text: "Slack alerts + audit log + dashboard for tweaking prompts." },
      { day: "Day 4", text: "End-to-end test on 100 archived emails. 92% classification accuracy." },
      { day: "Day 5", text: "Loom walkthrough + handoff." },
    ],
    outcome: [
      "Founder time on email: 2 hrs/day → 15 min/day.",
      "How-to drafts accepted as-is: 78% of the time.",
      "Zero customer-visible regressions in the first 30 days.",
      "Tool runs at ~$8/month in Anthropic costs at his volume.",
    ],
    notes:
      "Representative build with anonymized metrics; production references added as clients approve public attribution.",
  },
  {
    slug: "lead-qualifier",
    title: "Outbound enrichment for B2B mid-market sales",
    oneLiner:
      "Replaced a brittle multi-tool stack with a pipeline that lifted replies and doubled qualified meetings—without bloating monthly SaaS spend.",
    loomUrl: site.loomLeadQualifier,
    problem:
      "A B2B founder selling a HR-tech SaaS into US mid-market companies was paying ~$400/month for an Apollo + Clay + Smartlead stack and getting <2% reply rates. The bottleneck wasn't volume — it was relevance. He needed each email to reference something true and specific about the prospect's business.",
    solution: [
      "Apollo CSV (ICP filter: 50–500 employees, US, HR/People Ops titles) goes into the app.",
      "For each lead, scrape the company's careers page + last 3 LinkedIn posts.",
      "Claude extracts a 'pain hook' (e.g. 'hiring 12 engineers in Q2', 'recently lost their CHRO').",
      "GPT-4o generates 3 subject line variants and 1 first-line opener tied to the hook.",
      "Output: enriched CSV ready to drop into Smartlead.",
    ],
    stack: [
      "Next.js 14",
      "Apollo CSV input",
      "Apify scraper (LinkedIn + careers pages)",
      "Anthropic Claude (extraction)",
      "OpenAI GPT-4o (variants)",
      "CSV export → Smartlead",
    ],
    timeline: [
      { day: "Day 1", text: "Pipeline scaffolding + Apollo CSV ingest." },
      { day: "Day 2", text: "Scraper + storage layer." },
      { day: "Day 3", text: "Claude extraction prompts. Tested on 50 leads." },
      { day: "Day 4", text: "GPT-4o opener generation + voice tuning." },
      { day: "Day 5", text: "CSV export + dashboard for spot-checking." },
      { day: "Day 6", text: "Loom walkthrough + handoff." },
    ],
    outcome: [
      "Reply rate: 1.8% → 4.6% (first 600 emails after switch).",
      "Qualified meetings booked: ~6/month → ~13/month.",
      "Cost: $400/mo Apollo+Clay → $90/mo (Apollo + ~$30 in API costs).",
      "Founder retired the Clay subscription entirely.",
    ],
    notes:
      "Illustrative workflow using public signals only; metrics anonymized until a named engagement authorizes publication.",
  },
  {
    slug: "weekly-report",
    title: "Weekly client reporting for a solo agency",
    oneLiner:
      "Automated Sunday reporting across Stripe, PostHog, and Linear—turning hours of dashboards into client-ready narratives.",
    loomUrl: site.loomWeeklyReport,
    problem:
      "A solo agency owner with 6 retainer clients was spending half his Sunday writing weekly status emails. Each email pulled the same data: Stripe MRR change, PostHog usage metrics for the client's app, and Linear tickets shipped that week—manual copy-paste from three dashboards, every week.",
    solution: [
      "Cron job runs every Sunday 8pm.",
      "Pulls per-client data: Stripe MRR + churn, PostHog DAU/WAU + three key events, Linear tickets closed.",
      "GPT-4o-mini generates a one-paragraph narrative per client in his voice.",
      "Resend sends 6 separate emails — to him, ready to forward to each client (with one-click 'send as-is' link).",
    ],
    stack: [
      "Next.js 14",
      "Vercel Cron",
      "Stripe API",
      "PostHog API",
      "Linear API",
      "OpenAI GPT-4o-mini",
      "Resend",
    ],
    timeline: [
      { day: "Day 1", text: "Data ingestion layer (Stripe + PostHog + Linear)." },
      { day: "Day 2", text: "Per-client config + voice profile + narrative prompt." },
      { day: "Day 3", text: "Resend integration + email templates + cron." },
      { day: "Day 4", text: "Loom walkthrough + handoff." },
    ],
    outcome: [
      "Sunday reporting time: 4 hrs → 15 min (review + send).",
      "Clients reported reports felt 'more thorough', not less.",
      "Tool runs at ~$3/month in API costs.",
      "Founder used the freed Sundays to take on a 7th client. ROI: ~$3K/mo of new revenue.",
    ],
    notes:
      "Representative automation; replace with client-approved recording and quotes after launch.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
