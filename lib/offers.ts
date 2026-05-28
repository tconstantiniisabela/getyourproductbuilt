import { site } from "@/lib/site";

export type OfferComparison = {
  label: string;
  axisForge: string;
  agency: string;
  diy: string;
};

export type ProductizedOffer = {
  slug: string;
  title: string;
  headline: string;
  bluf: string;
  price: string;
  timeline: string;
  caseStudySlug: string;
  loomKey: "loomInbox" | "loomLeadQualifier" | "loomWeeklyReport";
  targetQueries: string[];
  forWho: string;
  included: string[];
  excluded: string[];
  comparison: OfferComparison[];
  faqs: { question: string; answer: string }[];
};

export const productizedOffers: ProductizedOffer[] = [
  {
    slug: "lead-qualifier",
    title: "The Lead Qualifier",
    headline: "Custom lead scoring and enrichment — fixed price, five days",
    bluf:
      "AxisForge Labs builds a webhook-to-Slack lead qualifier for B2B revenue teams: real-time enrichment, ICP scoring, and AI-drafted first emails for human approval. $1,500 fixed. Five business days from deposit. Written scope before engineering starts.",
    price: "$1,500",
    timeline: "5 business days from deposit",
    caseStudySlug: "lead-qualifier",
    loomKey: "loomLeadQualifier",
    targetQueries: [
      "custom lead scoring automation",
      "Clay alternative fixed price",
      "lead enrichment workflow",
      "ICP scoring automation",
    ],
    forWho:
      "B2B SaaS founders and revenue ops leads who outgrew Zapier/Make but do not want a $400/month Clay stack or an open-ended agency retainer.",
    included: [
      "Webhook on your demo signup or Typeform (single source)",
      "Real-time lead enrichment via Clearbit and/or Apollo APIs",
      "Custom ICP scoring against your criteria (firmographics + role fit)",
      "AI-drafted personalized first email per lead",
      "Slack DM with draft for one-click approval",
      "Push to HubSpot, Pipedrive, or Attio (one CRM)",
      "Written scope, 50% deposit, recorded handoff walkthrough",
    ],
    excluded: [
      "Frontend dashboard (data lives in Slack + CRM)",
      "Multi-user collaboration or role-based permissions",
      "Multiple webhook sources (one form only)",
      "Outbound sequencing beyond the first draft email",
    ],
    comparison: [
      {
        label: "Price",
        axisForge: "$1,500 fixed, scoped upfront",
        agency: "$8K–$25K+ retainer or T&M",
        diy: "$200–$400/mo SaaS stack + your time",
      },
      {
        label: "Timeline",
        axisForge: "5 business days",
        agency: "6–12 weeks discovery + build",
        diy: "Weeks of glue-code debugging",
      },
      {
        label: "Scope",
        axisForge: "Frozen after kickoff — in/out in writing",
        agency: "Often expands mid-project",
        diy: "You own every edge case",
      },
      {
        label: "Handoff",
        axisForge: "You keep code, accounts, and API keys",
        agency: "Varies — often vendor-hosted",
        diy: "Fragile no-code chains",
      },
    ],
    faqs: [
      {
        question: "How is this different from Clay or Apollo sequences?",
        answer:
          "Clay and Apollo are powerful but generic. We build a workflow tuned to your ICP rules, voice, and CRM — one fixed price, you own the code, and there is no per-seat SaaS bill stacking up.",
      },
      {
        question: "What do I need ready before kickoff?",
        answer:
          "Your ICP criteria (employee band, titles, geo), API keys for enrichment tools you already use or want us to wire, one form/webhook source, and Slack + CRM access for integration.",
      },
      {
        question: "Can we change scope mid-build?",
        answer:
          "Scope is frozen after kickoff and deposit. Additions are a separate fixed-scope change order — that is how we protect your price and our delivery date.",
      },
      {
        question: "What if it takes longer than five days?",
        answer:
          "We scope conservatively. If we miss the agreed delivery window due to our side, we do not invoice the final 50% until the definition of done is met.",
      },
      {
        question: "Do you sign NDAs and work in our repo?",
        answer:
          "Yes. We can work in your GitHub org or hand off a clean repo. NDAs are standard for revenue workflows.",
      },
      {
        question: "Is this a good fit for enterprise procurement?",
        answer:
          "Best for teams that need a clean quote and definition of done without a six-month RFP. We provide written scope suitable for internal sign-off.",
      },
    ],
  },
  {
    slug: "inbox-triage",
    title: "Inbox Triage",
    headline: "AI support triage with human-approved drafts — fixed price, five days",
    bluf:
      "AxisForge Labs builds Gmail-to-Slack support triage: classify incoming mail, draft replies in your voice for supervisor approval, and escalate what needs a human. $1,500 fixed. Five business days from deposit.",
    price: "$1,500",
    timeline: "5 business days from deposit",
    caseStudySlug: "inbox-triage",
    loomKey: "loomInbox",
    targetQueries: [
      "AI support triage Gmail Slack",
      "reduce tier-one support volume",
      "automated email classification support",
      "Gmail draft automation support team",
    ],
    forWho:
      "Ops and support leads at SaaS or services companies where half of inbox volume is repetitive — and leadership will not let AI send without human approval.",
    included: [
      "Gmail OAuth against one shared inbox or support alias",
      "Classifier grounded in your approved response corpus",
      "Taxonomy: defect, billing, how-to, roadmap, partnership, noise",
      "Tone-matched drafts in Gmail Drafts for one-click release",
      "Slack alerts for escalation-worthy threads with context",
      "Ambiguous mail left untouched for manual triage",
      "Audit trail, written scope, recorded handoff",
    ],
    excluded: [
      "Multi-inbox or Help Scout / Zendesk migration",
      "Auto-send without human approval in the loop",
      "Customer-facing chat widget",
      "Historical backfill beyond a pilot sample for calibration",
    ],
    comparison: [
      {
        label: "Price",
        axisForge: "$1,500 fixed",
        agency: "$15K+ custom integration project",
        diy: "Zapier + ChatGPT — breaks on edge cases",
      },
      {
        label: "Trust model",
        axisForge: "Human approves every outbound draft",
        agency: "Varies",
        diy: "Often fully automated — risky for retention",
      },
      {
        label: "Timeline",
        axisForge: "5 business days",
        agency: "2–3 months",
        diy: "Ongoing maintenance burden",
      },
      {
        label: "Inference cost",
        axisForge: "Typically under $15/mo at SMB volume",
        agency: "Bundled in hourly rate",
        diy: "Unpredictable API spend",
      },
    ],
    faqs: [
      {
        question: "Will AI reply to customers automatically?",
        answer:
          "No. Drafts land in Gmail Drafts or Slack for your team to approve. Nothing customer-visible sends without a human.",
      },
      {
        question: "Which email providers do you support?",
        answer:
          "Gmail / Google Workspace on kickoff. Other providers can be scoped as a custom build.",
      },
      {
        question: "How do you calibrate tone?",
        answer:
          "We train against your historical outbound replies during days 1–2. You review sample drafts before go-live.",
      },
      {
        question: "What results should we expect?",
        answer:
          "Representative deliveries cut manual tier-one handling from hours to minutes of supervisory review. Exact impact depends on volume and taxonomy fit — we validate on a pilot sample before launch.",
      },
      {
        question: "Can this integrate with Zendesk instead of Gmail?",
        answer:
          "This offer is Gmail-native. Zendesk or Intercom routing is a separate scoped build.",
      },
      {
        question: "What about data privacy?",
        answer:
          "Mail is processed via your OAuth tokens. We do not store message bodies beyond the audit trail you configure. NDAs available.",
      },
    ],
  },
  {
    slug: "weekly-report",
    title: "The Weekly Report",
    headline: "Automated KPI narrative to Slack and email — fixed price, four days",
    bluf:
      "AxisForge Labs pulls Stripe, product analytics, and project-tool metrics into a Monday-ready executive summary — delivered to Slack and email on your schedule. $1,500 fixed. Four business days from deposit.",
    price: "$1,500",
    timeline: "4 business days from deposit",
    caseStudySlug: "weekly-report",
    loomKey: "loomWeeklyReport",
    targetQueries: [
      "automated weekly KPI report Slack email",
      "executive reporting automation",
      "Stripe PostHog weekly summary automation",
      "automated client status report agency",
    ],
    forWho:
      "Founders and ops leads who spend Sunday night copying numbers from Stripe, analytics, and Linear into status emails — and want that hour back every week.",
    included: [
      "Scheduled job (e.g. Sunday evening or Monday 7am)",
      "Ingestion from up to three sources (Stripe, PostHog/Mixpanel, Linear/Jira)",
      "AI narrative condensed to your voice profile",
      "Delivery via email (Resend) and/or Slack webhook",
      "One report template — single stakeholder audience on kickoff",
      "Written scope, deposit terms, recorded walkthrough",
    ],
    excluded: [
      "Per-client custom dashboards in a browser UI",
      "More than three data sources without change order",
      "Real-time alerting (this is a scheduled summary)",
      "PDF design polish or board-deck formatting",
    ],
    comparison: [
      {
        label: "Price",
        axisForge: "$1,500 fixed",
        agency: "Custom BI project $10K+",
        diy: "Manual exports every week — your time",
      },
      {
        label: "Output",
        axisForge: "Narrative ready to forward",
        agency: "Often charts without story",
        diy: "Spreadsheet gymnastics",
      },
      {
        label: "Maintenance",
        axisForge: "You own the job — we hand off docs",
        agency: "Retainer for changes",
        diy: "Breaks when APIs change",
      },
      {
        label: "Timeline",
        axisForge: "4 business days",
        agency: "4–8 weeks",
        diy: "Never quite finished",
      },
    ],
    faqs: [
      {
        question: "Which tools can you connect?",
        answer:
          "Stripe, PostHog, Mixpanel, Linear, and Jira are common on kickoff. Tell us your stack on the intro call — if it has an API, we will confirm fit before deposit.",
      },
      {
        question: "Can one report cover multiple clients or accounts?",
        answer:
          "This offer covers one report template. Multi-account rollups (e.g. agency with six clients) are scoped as an Advanced build — book an intro call.",
      },
      {
        question: "Will the AI sound like me?",
        answer:
          "We calibrate against 3–5 past reports you provide. You approve the voice profile before scheduling goes live.",
      },
      {
        question: "What if our metrics change?",
        answer:
          "Minor prompt tweaks in the first 14 days post-handoff are included. New data sources are a change order.",
      },
      {
        question: "Is $1,000 Focused build enough?",
        answer:
          "If you only need one source (e.g. Stripe MRR → Slack), the $1,000 Focused tier may fit. Two or more integrations land in Standard ($1,500).",
      },
      {
        question: "How much does inference cost per month?",
        answer:
          "Representative runs land around a few dollars per month at weekly cadence using efficient models.",
      },
    ],
  },
];

export function getOffer(slug: string): ProductizedOffer | undefined {
  return productizedOffers.find((o) => o.slug === slug);
}

export function offerLoomUrl(offer: ProductizedOffer): string {
  return site[offer.loomKey];
}
