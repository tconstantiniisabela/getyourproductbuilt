# F5Bot keyword configuration — AxisForge Labs inbound

Sign up free at [f5bot.com](https://f5bot.com). Add each keyword below as a separate alert. Use flags exactly as shown.

## Core intent keywords

| Keyword / phrase | Flags | Why |
|------------------|-------|-----|
| `"need a developer"` | `only-reddit` | Founders hiring for backlog items |
| `"fixed price"` | `only-reddit` | Procurement-friendly buyers |
| `"Zapier alternative"` | `only-reddit` | No-code ceiling → custom build |
| `"lead scoring"` | `only-reddit` | Lead Qualifier offer fit |
| `"support inbox"` | `only-reddit` | Inbox Triage offer fit |
| `"internal tool"` | `only-reddit` | Core ICP language |
| `"automate my"` | `only-reddit` | General automation intent |
| `"AI workflow"` | `only-reddit` | AI automation wedge |
| `"Clay alternative"` | `only-reddit` | Lead Qualifier competitor angle |
| `"weekly report" automation` | `only-reddit` | Weekly Report offer fit |

## Subreddit-scoped (higher signal)

| Keyword | Flags |
|---------|-------|
| `"looking for freelancer"` | `only-url=/r/SaaS` |
| `"need help building"` | `only-url=/r/startups` |
| `"backlog"` | `in-title only-url=/r/SaaS` |
| `"automate"` | `only-url=/r/nocode` |
| `"hire developer"` | `only-url=/r/EntrepreneurRideAlong` |

## Hacker News + Lobsters

| Keyword | Flags |
|---------|-------|
| `"Ask HN" freelancer` | default (HN) |
| `"Show HN" automation` | default (HN) |
| `"looking for contractor"` | default (HN) |

## Google Alerts (backup, free)

Create alerts at [google.com/alerts](https://www.google.com/alerts):

- `"fixed scope" developer automation`
- `"internal tool" build quote`
- `site:reddit.com/r/SaaS "need developer"`

Deliver to email once per day.

## Response rules

1. Answer the question fully before linking.
2. Link to the **specific offer page**, not the homepage:
   - Lead pain → `https://getyourproductbuilt.com/offers/lead-qualifier`
   - Inbox pain → `https://getyourproductbuilt.com/offers/inbox-triage`
   - Reporting pain → `https://getyourproductbuilt.com/offers/weekly-report`
   - Unsure → `https://getyourproductbuilt.com/tools/scope-estimator`
3. Max 2–3 self-references per week per subreddit.
4. First week: 5–10 pure-help comments with **no links** to build karma.

## Alert triage (2 min)

When email arrives, score the thread:

| Score | Action |
|-------|--------|
| 3 | Posted in last 6h, specific pain, fits an offer page → respond today |
| 2 | General question, you can add real value → respond, no link |
| 1 | Vague or wrong audience → skip |

**Score 3 signals:** mentions tools you integrate (Gmail, Slack, Stripe, HubSpot), timeline pressure, or budget frustration with agencies/SaaS stacks.
