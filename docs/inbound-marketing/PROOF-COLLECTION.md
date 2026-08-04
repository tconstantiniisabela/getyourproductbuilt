# Proof collection — replace composite-only sales proof

Goal: ship **1–2 real proof assets** before raising Standard/Advanced prices. Do **not** invent logos, metrics, or client names.

## Current status

| Asset | Status | Action |
|-------|--------|--------|
| Lead Qualifier case study copy | Representative / composite | Keep labeled; replace notes when a paying client authorizes |
| Inbox / Weekly case studies | Representative | Same rule |
| `NEXT_PUBLIC_LOOM_LEAD_QUALIFIER` | Live | https://www.loom.com/share/1f7bb81420ab4dd191bb487ca38cbf65 (also default in `lib/site.ts`) |
| `NEXT_PUBLIC_LOOM_INBOX` | Live | https://www.loom.com/share/5d77568456754699beb9e7bdf627d1d6 |
| `NEXT_PUBLIC_LOOM_WEEKLY_REPORT` | Live | https://www.loom.com/share/4a253bede72d4ce99bc0b16c041a88d8 |
| Demo app (no clients) | Ready | Film `localhost:3010/lead-qualifier` (Northpeak UI). Do not film the workspace index. |
| Named client testimonial | Missing | Ask at handoff (template below) |
| Permissioned logo | Missing | Written email approval only |

## Minimum bar before price raises

Complete **either**:

1. **Public Loom** of Lead Qualifier demo (the local mock app in `demos/loom-walkthroughs` is enough — label representative) **plus** one written outcome a real buyer will stand behind, **or**
2. **Two** of: public Loom · 30–60s client quote (text or video) · named logo with written permission

A Loom recorded on the mock demo app counts as the **public Loom** half of the bar. It does **not** replace a real buyer outcome or authorized logo.

Until then: keep “representative / anonymized” language on `/work/*` and do not claim “clients include…”.

## Capture sequence (per paying delivery)

1. **Day of handoff** — record Loom walkthrough in the client’s stack (or sanitized twin). Ask: “Can we publish a public Loom with company name redacted?”
2. **+3 days** — send testimonial ask (email below).
3. **If yes** — update `lib/case-studies.ts` notes + outcomes with **only** approved numbers; set Vercel `NEXT_PUBLIC_LOOM_*`; redeploy.
4. **If no** — keep composite label; still store private Loom for intro calls.

## Testimonial ask (copy/paste)

Subject: Quick favor — 2-sentence outcome for our site?

```
Hi [Name],

Glad the Lead Qualifier is live. Would you be willing to share 2–3 sentences we can publish on getyourproductbuilt.com? Ideal shape:

- What was broken before
- What shipped
- One concrete result (time saved, reply rate, meetings, tooling cost)—only numbers you’re comfortable with

Optional: company name + logo. We won’t publish either without your written OK.

Reply with the quote (or “happy to hop on a 5-min Loom”) and we’ll send a preview before anything goes live.

— AxisForge Labs
```

## Where proof appears on the site

| Surface | File / route |
|---------|----------------|
| Work grid (homepage) | `components/work-grid.tsx` |
| Case study pages | `/work/[slug]` ← `lib/case-studies.ts` |
| Offer pages | `/offers/[slug]` ← Loom via `lib/site.ts` |
| Loom env | Vercel `NEXT_PUBLIC_LOOM_LEAD_QUALIFIER` (priority #1) |

## Anti-patterns

- Pasting invented reply-rate lifts as “client results”
- Using logos scraped from the web
- Raising prices before the minimum bar above
