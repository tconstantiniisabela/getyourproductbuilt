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
| [LOOM-RECORDING-GUIDE.md](./LOOM-RECORDING-GUIDE.md) | Record + embed case study videos |
| [PARTNER-REFERRAL-KIT.md](./PARTNER-REFERRAL-KIT.md) | 15 partner types + DM templates |
| [DISTRIBUTION-POSTS.md](./DISTRIBUTION-POSTS.md) | r/SaaS + IH post copy |
| [Q2-CHANNEL-PLAYBOOK.md](./Q2-CHANNEL-PLAYBOOK.md) | June 12–30 urgency push |
| [PIPELINE-TRACKER.md](./PIPELINE-TRACKER.md) | Notion/CSV pipeline + KPIs |
| [GOOGLE-SEARCH-CONSOLE-SETUP.md](./GOOGLE-SEARCH-CONSOLE-SETUP.md) | Submit sitemap |

## Your manual steps (cannot be automated)

1. **F5Bot** — Sign up at f5bot.com, add keywords from F5BOT-KEYWORDS.md
2. **Loom** — Record 3 walkthroughs, set `NEXT_PUBLIC_LOOM_*` in Vercel
3. **Google Search Console** — Verify domain, submit sitemap
4. **Notion** — Create pipeline database from PIPELINE-TRACKER.md
5. **Partners** — Send 5 DMs this week from PARTNER-REFERRAL-KIT.md
6. **Daily** — Run DAILY-INTENT-ROUTINE.md (30 min)

## Start here (Day 1)

1. Deploy site changes to Vercel
2. Configure F5Bot keywords
3. Post Scope Estimator on r/SaaS (DISTRIBUTION-POSTS.md Post 1)
4. Send 5 partner DMs
5. Create Notion pipeline
