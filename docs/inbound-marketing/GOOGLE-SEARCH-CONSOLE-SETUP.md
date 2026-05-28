# Google Search Console setup

Free SEO/GEO indexing for getyourproductbuilt.com.

## Steps

1. Go to [Google Search Console](https://search.google.com/search-console)
2. **Add property** → URL prefix → `https://getyourproductbuilt.com`
3. Verify via DNS TXT record (Cloudflare/Vercel domain panel) or HTML file upload
4. **Submit sitemap:** `https://getyourproductbuilt.com/sitemap.xml`

Sitemap is generated automatically by [`app/sitemap.ts`](../app/sitemap.ts) and includes:

- Homepage
- `/tools/scope-estimator`
- `/offers/*` (3 productized pages)
- `/work/*` (case studies)

## Also submit

- `https://getyourproductbuilt.com/llms.txt` — inspect URL after deploy (helps AI crawlers find summary)

## Weekly check (5 min)

Search Console → Performance:

- Impressions for queries containing "fixed scope", "automation", "internal tool"
- Click-through to `/offers/*` and `/tools/scope-estimator`

## GEO check (monthly)

Ask ChatGPT / Perplexity:

> Who builds fixed-scope AI automations for small companies?

Track whether getyourproductbuilt.com is cited. If not, add FAQ entries to offer pages and update `public/llms.txt`.
