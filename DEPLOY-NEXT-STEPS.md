# Publish this site — your checklist

Everything below is **your** account setup (GitHub + Vercel). The project is already **`npm run build` clean** and has its **own git repo** in this folder so you can deploy without touching the rest of your Cursor workspace.

## Done for you (locally)

- Production build verified (`npm run build`).
- Git initialized here (`portfolio/` only) with an initial commit — ready to **push** to GitHub.
- `metadataBase` resolves automatically on Vercel (`VERCEL_URL`), so link previews work on your **`*.vercel.app`** URL before you buy a domain. Optional override: set **`NEXT_PUBLIC_SITE_URL`** in Vercel when you connect a custom domain (see below).

## What you do next (in order)

### 1. Create a GitHub repository

1. Log in at [github.com](https://github.com).
2. **New repository** → name it e.g. `portfolio` → **public** is fine → **do not** add README/gitignore (this folder already has files).
3. Copy the “push an existing repository” commands — you’ll use them in step 3.

### 2. Install Git on your Mac (if needed)

Open Terminal and run:

```bash
git --version
```

If that fails, install [Xcode Command Line Tools](https://developer.apple.com/download/all/) or Git from [git-scm.com](https://git-scm.com/download/mac).

### 3. Push this folder to GitHub

An initial commit already exists in `portfolio/`. In Terminal:

```bash
cd "/Users/isabelatarczewski/Desktop/Cursor - Bela/cursor-build-service/portfolio"

# Recommended — matches your GitHub account (used on future commits too)
git config user.email "you@example.com"
git config user.name "Your Name"

git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME/YOUR_REPO` with your real repo URL. If `git remote add` errors because `origin` exists, run `git remote remove origin` first, then add again.

### 4. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → sign up / log in → **Add New… → Project**.
2. **Import** the GitHub repo you just pushed.
3. Vercel should detect **Next.js**. Defaults are fine:
   - **Framework preset:** Next.js  
   - **Root Directory:** `./` (leave default — this repo **is** the app root)
   - **Build command:** `npm run build`  
   - **Output:** Next.js default  
4. Click **Deploy**. Wait ~1–2 minutes.

You’ll get a live URL like **`https://portfolio-xxxxx.vercel.app`**.

### 5. After it’s live

| Task | What to do |
|------|------------|
| **Optional: custom domain** | Vercel → Project → **Settings → Domains** → add domain → follow DNS instructions at your registrar ([DEPLOY.md](../01-portfolio-site/DEPLOY.md) has Cloudflare-style detail). |
| **SEO when domain is real** | In Vercel → **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com` (your exact canonical URL, with `https://`). Redeploy. |
| **`site.domain` in code** | Keep [`lib/site.ts`](lib/site.ts) `domain` aligned with the hostname you want long-term (helps consistency even though Vercel/env drives metadata when set). |
| **Case study Looms** | Replace `loomInbox`, `loomLeadQualifier`, `loomWeeklyReport` in [`lib/site.ts`](lib/site.ts) with real Loom share URLs. |
| **Internal marketing dashboard** | `/tools/marketing` — needs env vars (`MARKETING_DASHBOARD_SECRET`, Google OAuth, `OPENAI_API_KEY`, etc.). Full checklist: [MARKETING-DASHBOARD-SETUP.md](MARKETING-DASHBOARD-SETUP.md). |

### 6. CLI alternative (optional)

If you prefer the terminal:

```bash
npm i -g vercel
cd "/Users/isabelatarczewski/Desktop/Cursor - Bela/cursor-build-service/portfolio"
vercel
```

Log in when prompted, link to a project, then `vercel --prod` for production.

---

**Security:** This repo is safe for GitHub — no secrets in code. Never commit `.env.local` with API keys or dashboard secrets. Add sensitive vars only in Vercel/host env or local `.env.local`.
