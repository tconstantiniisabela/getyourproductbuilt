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
    title: "Enterprise-grade support triage for high-volume commerce analytics",
    oneLiner:
      "Reduced manual tier-one handling by routing repetitive inquiries through structured classification—with human-approved drafts and escalation paths ops trusts.",
    loomUrl: site.loomInbox,
    problem:
      "A mid-market analytics operator supporting Shopify-adjacent merchants was burning senior capacity on tier-one mail—roughly half of volume repeated the same five themes. Leadership needed retention-sensitive replies to remain human-authored while stripping cognitive load from obvious buckets.",
    solution: [
      "Provisioned Gmail OAuth against a designated shared inbox namespace.",
      "Each inbound message evaluated through a frontier-model classifier grounded in the organization's approved response corpus.",
      "Taxonomy outputs: defect, commercial, procedural how-to, roadmap signal, partnership, noise.",
      "How-to and billing classes produce tone-matched drafts in Gmail Drafts for single-click supervisory release.",
      "Escalation-worthy classes emit Slack payloads with structured context and recommended next actions.",
      "Ambiguous traffic remains untouched for manual triage.",
    ],
    stack: [
      "Next.js 14 (App Router)",
      "Gmail API with OAuth",
      "Anthropic Claude 3.5 Sonnet",
      "Vercel Cron (5-minute cadence)",
      "Slack incoming webhooks",
      "Supabase (audit trail + tone calibration store)",
    ],
    timeline: [
      { day: "Day 1", text: "OAuth harness + classifier blueprint + label routing." },
      { day: "Day 2", text: "Tone calibration against historical outbound corpus; draft synthesis layer." },
      { day: "Day 3", text: "Operational alerting + audit surfaces + prompt governance UI." },
      { day: "Day 4", text: "Regression pass across archived mail sample; 92% routing fidelity." },
      { day: "Day 5", text: "Executive walkthrough recording + production hardening checklist." },
    ],
    outcome: [
      "Manual handling window: ~2 hrs/day → ~15 min supervisory review.",
      "Draft acceptance without rewrite: 78% within first month.",
      "Zero customer-visible regressions across initial 30-day observation.",
      "Inference spend stabilized near ~$8/month at observed throughput.",
    ],
    notes:
      "Representative delivery with anonymized metrics; named references available subject to client publicity approvals.",
  },
  {
    slug: "lead-qualifier",
    title: "Outbound enrichment pipeline for B2B revenue teams",
    oneLiner:
      "Consolidated brittle SaaS glue code into a controlled enrichment workflow—lifting reply quality without multiplying vendor contracts.",
    loomUrl: site.loomLeadQualifier,
    problem:
      "Revenue leadership at an HR-tech vendor targeting US mid-market seats was underwriting ~$400/month of overlapping enrichment SaaS yet seeing sub-2% cold reply rates. Volume was never the constraint—signal specificity was. Pipeline economics demanded authentic, account-level hooks without additional headcount.",
    solution: [
      "CSV ingest from Apollo with governed ICP segmentation (50–500 employees, HR decision-makers).",
      "Programmatic extraction from careers surfaces plus recent public narrative signals.",
      "Frontier-model extraction pass surfaces account-level narrative anchors.",
      "Secondary inference pass generates controlled variant subject lines + bespoke opening lines.",
      "Exports reconcile directly into Smartlead with QA checkpoints.",
    ],
    stack: [
      "Next.js 14",
      "Apollo CSV ingestion",
      "Managed scraping layer (careers + social signals)",
      "Anthropic Claude (structured extraction)",
      "OpenAI GPT-4o (controlled linguistic variants)",
      "CSV export → Smartlead",
    ],
    timeline: [
      { day: "Day 1", text: "Pipeline skeleton + governed ingest contracts." },
      { day: "Day 2", text: "Signal acquisition subsystem + durability testing." },
      { day: "Day 3", text: "Extraction prompt suite calibrated against pilot cohort." },
      { day: "Day 4", text: "Variant synthesis tuned to corporate voice guidelines." },
      { day: "Day 5", text: "QA dashboard + export hardening." },
      { day: "Day 6", text: "Stakeholder recording + operational sign-off packet." },
    ],
    outcome: [
      "Observed reply lift from 1.8% → 4.6% on first 600 sends post-cutover.",
      "Qualified meetings booked increased ~2× within equivalent outbound capacity.",
      "Recurring tooling spend compressed materially versus prior Clay dependency.",
    ],
    notes:
      "Illustrative workflow operating on publicly accessible signals; identifiers fictionalized pending formal reference release.",
  },
  {
    slug: "weekly-report",
    title: "Executive reporting automation for multi-account services firms",
    oneLiner:
      "Unified billing, product analytics, and delivery telemetry into Monday-ready stakeholder narratives—eliminating Sunday reconciliation drag.",
    loomUrl: site.loomWeeklyReport,
    problem:
      "The principal of a six-account professional services firm was losing half of Sunday leadership bandwidth assembling status narratives—each pulling Stripe velocity deltas, PostHog adoption curves, and Linear execution summaries via manual dashboard choreography every single week.",
    solution: [
      "Scheduled orchestration job triggers Sunday evening.",
      "Per-account ingestion of Stripe commercial telemetry, PostHog behavioral KPIs, Linear closure metrics.",
      "Narrative condensation via lightweight inference model aligned to principal voice profile.",
      "Transactional delivery through Resend producing six discrete stakeholder-ready drafts.",
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
      { day: "Day 1", text: "Telemetry ingestion adapters + schema normalization." },
      { day: "Day 2", text: "Voice calibration corpus + narrative synthesis prompts." },
      { day: "Day 3", text: "Deliverability integration + scheduling controls." },
      { day: "Day 4", text: "Executive walkthrough + stabilization playbook." },
    ],
    outcome: [
      "Weekly narrative assembly: ~4 hrs → ~15 min supervisory review.",
      "External stakeholders perceived depth improvements versus manual drafts.",
      "Marginal inference spend ~$3/month at steady-state.",
      "Leadership redeployed reclaimed capacity toward net-new account acquisition.",
    ],
    notes:
      "Representative automation narrative; formal testimonial assets exchanged post-engagement authorization.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
