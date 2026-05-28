# Inbound pipeline tracker

Track every inbound conversation from first touch to signed deposit. Review every **Friday**.

## Option A — Notion (recommended)

### Create database

1. New Notion page → `/database` → **Table**
2. Name: `AxisForge Inbound Pipeline`
3. Add properties:

| Property | Type | Options / notes |
|----------|------|-----------------|
| Name | Title | Company or person |
| Status | Select | `New`, `Replied`, `Call booked`, `Scope sent`, `Deposit paid`, `Lost`, `Stale` |
| Source | Select | `Reddit`, `HN`, `X`, `Partner`, `GEO/Google`, `IH`, `Dev.to`, `Referral`, `Other` |
| Source detail | Text | Thread URL, partner name, search query |
| Tier | Select | `$1K`, `$1.5K`, `$3K`, `Custom`, `Unknown` |
| Offer fit | Select | `Lead Qualifier`, `Inbox Triage`, `Weekly Report`, `Other` |
| Last touch | Date | Last message from you |
| Next step | Text | e.g. "Send scope by EOD" |
| Est. value | Number | 1000, 1500, 3000 |
| Notes | Text | Pain, timeline, objections |

### Views

1. **Active** — Status not in `Lost`, `Stale`, `Deposit paid`
2. **This week** — Last touch within 7 days
3. **By source** — Group by Source (see which channel works)

### Weekly review checklist (Friday, 15 min)

- [ ] Count: new DMs, calls booked, scopes sent, deposits signed
- [ ] Move no-reply 7+ days to **Stale**
- [ ] Follow up **Scope sent** leads at 48h and 7d
- [ ] Log KPIs in table below

---

## Option B — CSV import

Import [`pipeline-template.csv`](./pipeline-template.csv) into Notion or Google Sheets.

---

## KPI log (copy to Notion page above database)

| Week ending | Replies posted | Inbound DMs | Calls booked | Deposits | Notes |
|-------------|----------------|-------------|--------------|----------|-------|
| Jun 6 | | | | | Week 1 |
| Jun 13 | | | | | Week 2 |
| Jun 20 | | | | | Week 3 |
| Jun 27 | | | | | Week 4 |

### Targets

| Metric | W1 | W2 | W3 | W4 |
|--------|----|----|----|-----|
| Helpful replies | 15+ | 25+ | 30+ | 30+ |
| Inbound DMs | 2 | 4 | 6 | 8 |
| Cal bookings (cum.) | 1 | 3 | 5 | 8 |
| Deposits (cum.) | 0 | 1 | 2 | **3** |

---

## Stage definitions

| Status | Meaning |
|--------|---------|
| New | First inbound — not yet replied |
| Replied | You responded, awaiting their move |
| Call booked | Cal.com confirmed |
| Scope sent | Written scope + price sent same day as call |
| Deposit paid | **Win** — counts toward monthly goal |
| Lost | Not a fit or chose someone else |
| Stale | No reply 7+ days — archive |

---

## Decision gates

| Signal | Action |
|--------|--------|
| Week 2, 0 Cal bookings | Post Scope Estimator on r/SaaS + IH ([DISTRIBUTION-POSTS.md](./DISTRIBUTION-POSTS.md)) |
| Calls but no closes | Same-day scope + deposit link; 48h follow-up |
| One channel >50% of wins | Double time on that channel next week |
