# Portfolio site

A Next.js 14 + Tailwind + shadcn/ui portfolio built from the spec in `../01-portfolio-site/`.

This is **Day 1, Block 2** of the build service kit. After this is deployed, you have an asset to point cold emails and X DMs at.

## Run it locally

### Terminal.app (or any shell starting in `~`)

If your prompt looks like `~ %`, you are in your **home folder**, not the Cursor workspace. A bare `cd cursor-build-service/portfolio` resolves to `~/cursor-build-service/portfolio`, which does not exist—run **`npm`** only **after** you `cd` into the real folder:

```bash
cd "/Users/isabelatarczewski/Desktop/Cursor - Bela/cursor-build-service/portfolio"
npm install
npm run dev
```

Adjust `isabelatarczewski` if your macOS username is different.

Wait until the terminal shows the server is ready (for example “Ready” / localhost URL), **then** open the site:

```bash
open -a "Google Chrome" "http://localhost:3000"
```

### Cursor integrated terminal (workspace root)

If the terminal opens with **current directory** = your Cursor project folder (`Cursor - Bela`), the short path works:

```bash
cd cursor-build-service/portfolio
npm install
npm run dev
```

That shorter `cd` only works when your shell’s working directory is already the workspace root.

## Customize before deploying

The whole site is wired through one file: `lib/site.ts`. Open it and replace every `[YOUR_*]` placeholder with your real value:

- `companyName` — brand name (footer, About heading), e.g. Northtrace
- `companyShort` — short wordmark where repeated (nav, SEO titles); often same as `companyName`
- `principalName` — optional signing contact for contracts (not shown in main marketing)
- `domain` — e.g. `getyourproductbuilt.com` (no protocol). Drives metadata + OG.
- `email` — the email on the FAQ + final CTA
- `xHandle` — without the `@`
- `xUrl` — full URL to your X profile
- `linkedinUrl` — full URL to your LinkedIn profile
- `calcomUrl` — your Cal.com booking URL (e.g. `https://cal.com/your-org/intro`)
- `loomInbox`, `loomLeadQualifier`, `loomWeeklyReport` — your 3 case-study Looms

Marketing copy lives in `components/`; tune voice there if you rebrand.

## Edit content

- **Hero copy** → `components/hero.tsx`
- **Offer / pricing details** → `components/offer.tsx`
- **The 3 project cards** → `components/work-grid.tsx` (the `projects` array)
- **Full case studies** → `lib/case-studies.ts`
- **How I work** → `components/how-i-work.tsx`
- **About** → `components/about.tsx`
- **FAQ** → `components/faq.tsx` (the `faqs` array)

All copy is sourced from `../01-portfolio-site/COPY.md` and `../01-portfolio-site/CASE-STUDIES.md`.

## Theme

Default theme is **dark**. Toggle via `defaultTheme` in `app/layout.tsx`. Colors are in `app/globals.css` (CSS variables under `:root` and `.dark`). Spacing/typography is in `tailwind.config.ts`.

## Deploy to Vercel

**Start here:** [DEPLOY-NEXT-STEPS.md](DEPLOY-NEXT-STEPS.md) — git history is initialized in this folder; add GitHub remote and import on Vercel.

Optional deeper DNS notes: [../01-portfolio-site/DEPLOY.md](../01-portfolio-site/DEPLOY.md).

Build time: ~30 seconds on Vercel. No env vars required for v1; after you connect a custom domain, add `NEXT_PUBLIC_SITE_URL` per DEPLOY-NEXT-STEPS.

## What's NOT here yet (intentionally)

- **Contact form** — Cal.com is the booking funnel. A contact form is a redundant CTA at this stage.
- **Blog** — once you have something to write about, add `app/blog/[slug]/page.tsx`.
- **Analytics** — add Vercel Analytics or Plausible after first deploy. One line in `app/layout.tsx`.
- **OG image** — placeholder at the moment. Generate one at https://og-playground.vercel.app/ or use Vercel's `@vercel/og` once you have a brand.

## Project structure

```
app/
  layout.tsx          # html shell, fonts, theme provider, SEO metadata
  page.tsx            # composes the 8 homepage sections
  globals.css         # tailwind + CSS variables for light/dark themes
  work/[slug]/page.tsx # dynamic case study pages (3 generated at build)
components/
  nav.tsx             # sticky top bar
  hero.tsx            # H1 + value prop + CTA
  offer.tsx           # the 3-column "what's included" deck
  work-grid.tsx       # 3 case-study cards (links to /work/[slug])
  how-i-work.tsx      # 6 numbered principles
  about.tsx           # personal story + secondary CTA
  faq.tsx             # 8-item accordion
  final-cta.tsx       # closing CTA above footer
  footer.tsx          # copyright + social
  theme-provider.tsx  # next-themes wrapper
  ui/                 # shadcn primitives (button, card, accordion)
lib/
  site.ts             # ALL placeholders + URLs in one file
  case-studies.ts     # case-study data (problem/solution/stack/timeline/outcome)
  utils.ts            # cn() helper
```
