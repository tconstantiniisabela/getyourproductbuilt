# Loom recording guide — case study walkthroughs

Record three public Loom videos to embed on offer and case study pages. Free Loom tier is sufficient.

## Before you record

1. Prepare a **demo environment** or sanitized walkthrough of each build shape (can be representative UI, not a live client).
2. Keep each video **4–7 minutes**.
3. Label in the intro: *"Representative delivery — anonymized metrics."*

## After recording

1. Copy each **share URL** from Loom.
2. Add to Vercel env (Production + Preview):

```bash
NEXT_PUBLIC_LOOM_INBOX=https://www.loom.com/share/xxxxxxxx
NEXT_PUBLIC_LOOM_LEAD_QUALIFIER=https://www.loom.com/share/xxxxxxxx
NEXT_PUBLIC_LOOM_WEEKLY_REPORT=https://www.loom.com/share/xxxxxxxx
```

3. Redeploy. Embeds appear automatically on `/work/*` and `/offers/*`.

---

## Video 1 — Inbox Triage (~5 min)

**URL env var:** `NEXT_PUBLIC_LOOM_INBOX`

### Script outline

| Time | Content |
|------|---------|
| 0:00 | Hook: "How we cut tier-one support handling from ~2 hrs/day to ~15 min review" |
| 0:30 | Problem: repetitive Gmail themes, leadership wants human-approved sends |
| 1:00 | Demo: inbound email → classifier labels → draft in Gmail Drafts |
| 2:30 | Demo: escalation thread → Slack payload with context |
| 3:30 | Show audit trail / ambiguous mail left untouched |
| 4:30 | Close: fixed scope, 5 days, $1,500 — link on screen: getyourproductbuilt.com/offers/inbox-triage |

---

## Video 2 — Lead Qualifier (~6 min)

**URL env var:** `NEXT_PUBLIC_LOOM_LEAD_QUALIFIER`

### Script outline

| Time | Content |
|------|---------|
| 0:00 | Hook: "Replace brittle Clay/Zapier glue with one workflow you own" |
| 0:30 | Problem: enrichment SaaS stack cost vs reply quality |
| 1:00 | Demo: form webhook fires → enrichment → ICP score |
| 2:30 | Demo: AI-drafted first email → Slack approval button |
| 4:00 | Demo: approved lead lands in CRM |
| 5:00 | Outcomes: reply lift band, tooling cost compression (representative metrics) |
| 5:30 | Close: getyourproductbuilt.com/offers/lead-qualifier |

---

## Video 3 — Weekly Report (~4 min)

**URL env var:** `NEXT_PUBLIC_LOOM_WEEKLY_REPORT`

### Script outline

| Time | Content |
|------|---------|
| 0:00 | Hook: "Sunday report assembly: ~4 hrs → ~15 min review" |
| 0:30 | Problem: copying Stripe + analytics + Linear into status emails |
| 1:00 | Demo: scheduled job runs → data pulls → narrative generates |
| 2:30 | Demo: email/Slack delivery, voice-matched tone |
| 3:30 | Close: getyourproductbuilt.com/offers/weekly-report |

---

## Publishing checklist

- [ ] Loom privacy: **Anyone with link** (public)
- [ ] Add URLs to Vercel env
- [ ] Verify embed on `/work/inbox-triage`, `/offers/inbox-triage`
- [ ] Clip 30s segment for X build-in-public post (optional)

## No demo yet?

Use screen recording of:
- Architecture diagram walkthrough
- Case study page + explain flows verbally
- Scope estimator + offer page scope sections

Something on screen beats "available on request."
