# AxisForge inbound marketing — implementation index

Zero-budget inbound plan to reach 3 clients by June 30, 2026.

## Site assets (live after deploy)

| Asset | URL |
|-------|-----|
| Lead Qualifier offer | `/offers/lead-qualifier` |
| Inbox Triage offer | `/offers/inbox-triage` |
| Weekly Report offer | `/offers/weekly-report` |
| Scope Estimator | `/tools/scope-estimator` |
| AI summary | `/llms.txt` |
| Sitemap | `/sitemap.xml` |

## Operator playbooks

| Doc | Purpose |
|-----|---------|
| [F5BOT-KEYWORDS.md](./F5BOT-KEYWORDS.md) | Keyword alerts for Reddit/HN |
| [DAILY-INTENT-ROUTINE.md](./DAILY-INTENT-ROUTINE.md) | 30-min daily inbound routine |
| [LOOM-RECORDING-GUIDE.md](./LOOM-RECORDING-GUIDE.md) | Record + embed case study videos (**Lead Qualifier first**) |
| [PROOF-COLLECTION.md](./PROOF-COLLECTION.md) | Replace composite proof with Loom + authorized outcomes |
| [KNOWLEDGE-ASSISTANT-VALIDATION.md](./KNOWLEDGE-ASSISTANT-VALIDATION.md) | 10 interviews before a 4th productized SKU |
| [PRICE-TEST.md](./PRICE-TEST.md) | After 3× Lead Qualifier, test $2.5k–$3k |
| [PARTNER-REFERRAL-KIT.md](./PARTNER-REFERRAL-KIT.md) | 15 partner types + DM templates |
| [DISTRIBUTION-POSTS.md](./DISTRIBUTION-POSTS.md) | r/SaaS + IH post copy |
| [Q2-CHANNEL-PLAYBOOK.md](./Q2-CHANNEL-PLAYBOOK.md) | June 12–30 urgency push |
| [PIPELINE-TRACKER.md](./PIPELINE-TRACKER.md) | Notion/CSV pipeline + KPIs |
| [GOOGLE-SEARCH-CONSOLE-SETUP.md](./GOOGLE-SEARCH-CONSOLE-SETUP.md) | Submit sitemap |

## Commercial focus (locked)

- **Hero SKU:** The Lead Qualifier (`/offers/lead-qualifier`) — default outbound + homepage emphasis
- **Do not** productize Internal Knowledge Assistant until KNOWLEDGE-ASSISTANT-VALIDATION.md clears
- **Do not** raise Standard/Advanced until PRICE-TEST.md prerequisites clear

## Your manual steps (cannot be automated)

1. **F5Bot** — Sign up at f5bot.com, add keywords from F5BOT-KEYWORDS.md (alerts → your Gmail)
2. **Growth dashboard** — Connect Google with inbox read; **Scan F5Bot inbox** on `/tools/marketing#reddit` (or install launchd). Review queue and **post replies yourself** — the tool never posts.
3. **Loom** — Run `demos/loom-walkthroughs` (`npm run dev` → localhost:3010). Record **Lead Qualifier first**, set `NEXT_PUBLIC_LOOM_LEAD_QUALIFIER` in Vercel (then Inbox / Weekly)
4. **Proof** — Run PROOF-COLLECTION.md after each paying delivery
5. **Knowledge Assistant** — Complete 10 interviews in KNOWLEDGE-ASSISTANT-VALIDATION.md before any 4th offer page
6. **Price test** — After 3× paid Lead Qualifier + proof bar, run PRICE-TEST.md
7. **Google Search Console** — Verify domain, submit sitemap
8. **Notion** — Create pipeline database from PIPELINE-TRACKER.md
9. **Partners** — Send 5 DMs this week from PARTNER-REFERRAL-KIT.md
10. **Daily** — Run DAILY-INTENT-ROUTINE.md (30 min)

## Start here (Day 1)

1. Deploy site changes to Vercel
2. Record Lead Qualifier Loom → set env → redeploy
3. Configure F5Bot keywords
4. Post with Lead Qualifier as primary CTA (DISTRIBUTION-POSTS.md)
5. Send 5 partner DMs (default scope = lead-qualifier)
6. Create Notion pipeline
7. Book Knowledge Assistant interviews (validation doc)