# Internal Knowledge Assistant — demand validation (before productizing)

**Do not** add a fourth productized offer page until this validation passes.

Plan rule: interview **10** ICP owners; productize only if demand signal clears the thresholds below.

## What we would sell later (draft SKU — not live)

| Field | Draft |
|-------|--------|
| Name | Internal Knowledge Assistant |
| Job | Answer policy / process / product questions from company docs with citations |
| Surface | Slack bot **or** internal web chat |
| Stack | Next.js, embeddings/RAG over Notion/Drive/PDF, HITL for “I don’t know” |
| Tentative price | $1,500–$3,000 depending on corpus + auth |
| Not included | Public customer chatbot, auto-send external answers, fine-tuned models |

## ICP for interviews

Owner-operated B2B / services / practice (~1–30 people) where:

- Docs live in Notion, Drive, Confluence, or PDFs
- Team asks the same questions repeatedly (ops, sales, support)
- No eng team to build RAG themselves

Skip: AI product companies, enterprise RFP theater, regulated health/finance needing SOC2 day-one.

## Interview script (15 min)

1. **Context:** “Where do your team’s answers live today—Notion, Drive, Slack archaeology?”
2. **Pain:** “How often does someone ask something that *is* documented but hard to find?”
3. **Cost:** “What happens when the answer is wrong or late—lost deal, support ticket, founder interrupt?”
4. **Status quo:** “Have you tried ChatGPT with pasted docs, Notion AI, or Glean?”
5. **Willingness:** “If a fixed-scope internal Q&A bot (Slack or private web) with citations and no auto-send to customers shipped in ~5–10 days for $1.5–3k, would you book a scoping call this quarter?” (Yes / Maybe / No)
6. **Trigger:** “What would make you buy in the next 30 days vs never?”

Log answers in the tracker below. Do not pitch a fake live offer URL.

## Tracker (fill as you go)

| # | Company / role | Date | Docs stack | Pain 1–5 | Tried DIY? | Buy signal Y/M/N | Notes |
|---|---------------|------|------------|----------|------------|------------------|-------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |
| 9 | | | | | | | |
| 10 | | | | | | | |

## Decision thresholds

| Signal | Action |
|--------|--------|
| **Go:** ≥4 “Yes” buy signals **or** ≥6 “Maybe” with ≥3 asking for a written scope | Draft offer page + Loom outline; price from Advanced band if multi-source auth |
| **Hold:** 2–3 Yes / mixed Maybe | Keep as custom-only on homepage; revisit after 5 more interviews |
| **No-go:** ≤1 Yes and DIY ChatGPT “good enough” dominates | Do **not** productize; keep Lead Qualifier as hero |

## Success / failure for this experiment

- **Success:** Clear go/hold/no-go after 10 interviews logged here.
- **Failure:** Productizing without 10 interviews or inventing demand.

## After a Go decision (later work — not now)

1. Add slug to `lib/offers.ts` with full in/out list
2. Case study only after a real delivery
3. Homepage “What we build” gets a linked card — not before
