# Loom recording guide — case study walkthroughs

Record public Loom videos to embed on offer and case study pages. Free Loom tier is sufficient.

**Priority order (sellability plan):** Lead Qualifier first → Inbox Triage → Weekly Report. Do not delay the hero SKU Loom waiting for all three.

## Product UI to film (no live clients required)

Northpeak Ops fictional workspace (looks like a shipped client product on screen):

```bash
cd "/Users/isabelatarczewski/Desktop/Cursor - Bela/demos/loom-walkthroughs"
npm install
npm run dev
```

| Product | Film this URL |
|---------|----------------|
| Inbound Qualifier | http://localhost:3010/lead-qualifier |
| Support Desk | http://localhost:3010/inbox-triage |
| Monday Brief | http://localhost:3010/weekly-report |

Do **not** film http://localhost:3010/ (workspace launcher). Click paths: [`demos/loom-walkthroughs/README.md`](../../../demos/loom-walkthroughs/README.md)

A public Loom of this UI **counts** toward the proof bar in [PROOF-COLLECTION.md](./PROOF-COLLECTION.md). Off-camera: Northpeak is fictional — do not list it as a named client on the marketing site.

## Before you record

1. Start the app above; open the **product** URL (not the index).
2. Keep each video **4–7 minutes**.
3. Optional voiceover: outcomes may be labeled representative if you cite numbers; the UI no longer says “demo.”
4. Hide bookmarks; browser zoom 100%; full window.

## After recording

1. Copy each **share URL** from Loom.
2. Add to Vercel env (Production + Preview):

```bash
# Live share URLs (also defaults in lib/site.ts)
NEXT_PUBLIC_LOOM_LEAD_QUALIFIER=https://www.loom.com/share/1f7bb81420ab4dd191bb487ca38cbf65
NEXT_PUBLIC_LOOM_INBOX=https://www.loom.com/share/5d77568456754699beb9e7bdf627d1d6
NEXT_PUBLIC_LOOM_WEEKLY_REPORT=https://www.loom.com/share/4a253bede72d4ce99bc0b16c041a88d8
```

3. Redeploy. Embeds appear automatically on `/work/*` and `/offers/*`.

---

## Video 1 — Lead Qualifier (~6 min) — RECORD FIRST

**URL env var:** `NEXT_PUBLIC_LOOM_LEAD_QUALIFIER`  
**Offer:** https://getyourproductbuilt.com/offers/lead-qualifier  
**Demo:** http://localhost:3010/lead-qualifier

### Click path

1. Open `/lead-qualifier` — Northpeak Inbound Qualifier (no demo banner)
2. Submit **Request a demo** (Harbor Ledger defaults) or **New inbound test → Replay**
3. Narrate enrichment cards + ICP score in the leads table
4. Slack Block Kit → optionally **Edit**, then **Approve**
5. Show HubSpot contact properties + timeline
6. Optional: Replay **Pixelcraft** (below ICP) → no Slack ping
7. Close on-screen: getyourproductbuilt.com/offers/lead-qualifier

### Script outline

| Time | Content |
|------|---------|
| 0:00 | Hook: "Replace brittle Clay/Zapier glue with one workflow you own" |
| 0:30 | Problem: enrichment SaaS stack cost vs reply quality |
| 1:00 | Demo: form webhook fires → enrichment → ICP score |
| 2:30 | Demo: AI-drafted first email → Slack approval button |
| 4:00 | Demo: approved lead lands in CRM |
| 5:00 | Outcomes: reply lift band, tooling cost compression (label as representative unless client-approved) |
| 5:30 | Close: getyourproductbuilt.com/offers/lead-qualifier |

### Done when

- [ ] Loom privacy: **Anyone with link**
- [ ] `NEXT_PUBLIC_LOOM_LEAD_QUALIFIER` set on Vercel Production + Preview
- [ ] Redeployed; embed visible on `/offers/lead-qualifier` and `/work/lead-qualifier`
- [ ] Logged in [PROOF-COLLECTION.md](./PROOF-COLLECTION.md) status table

---

## Video 2 — Inbox Triage (~5 min)

**URL env var:** `NEXT_PUBLIC_LOOM_INBOX`  
**Demo:** http://localhost:3010/inbox-triage

### Click path

1. Open inbox list — click billing or how-to → show classification + Gmail draft
2. Click urgent or complaint → Slack escalation mock
3. Click ambiguous thread → untouched / no draft
4. **Show audit trail**
5. Close: getyourproductbuilt.com/offers/inbox-triage

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

## Video 3 — Weekly Report (~4 min)

**URL env var:** `NEXT_PUBLIC_LOOM_WEEKLY_REPORT`  
**Demo:** http://localhost:3010/weekly-report

### Click path

1. Show Stripe / PostHog / Linear toggles
2. **Send test report** → wait for generation
3. Email preview + Slack one-liner + run history
4. Close: getyourproductbuilt.com/offers/weekly-report

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
- [ ] Lead Qualifier URL live in Vercel env (**required before price test**)
- [ ] Inbox + Weekly URLs when ready
- [ ] Spot-check `/offers/lead-qualifier` and `/work/lead-qualifier` after redeploy
- [ ] Update proof status in PROOF-COLLECTION.md
