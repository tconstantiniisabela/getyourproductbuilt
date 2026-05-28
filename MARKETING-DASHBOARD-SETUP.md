# Marketing dashboard — how to install and get access

The tool lives at **`/tools/marketing`** (password login). Everything below uses the **`portfolio/`** folder — the same directory as `package.json`.

---

## Part A — Install & access (do this first)

Follow these in order. **Steps 1–7 are enough** to open the dashboard and use AI fallback copy without connecting Google.

### Step 1 — Go to the project folder

```bash
cd "/Users/isabelatarczewski/Desktop/Cursor - Bela/cursor-build-service/portfolio"
```

*(Adjust the path if your Mac username or folder location is different.)*

### Step 2 — Install dependencies

```bash
npm install
```

You may see `npm fund` or audit messages — you can ignore **`npm fund`**. See **§ Notes** at the bottom for audits.

### Step 3 — Start the dev server

```bash
npm run dev
```

Wait until the terminal shows **Ready** and a **Local:** URL, for example:

- `http://localhost:3000` **or**
- `http://localhost:3001` (if it says port 3000 is in use)

Call this your **BASE URL** — it must include the correct **port**.

### Step 4 — Create `.env.local`

In **`portfolio/`** (next to `package.json`), create a file named **`.env.local`**.

Put at least:

```bash
MARKETING_DASHBOARD_SECRET=choose-a-long-password-only-you-know
NEXT_PUBLIC_SITE_URL=http://localhost:PUT-YOUR-PORT-HERE
```

**Examples:**

- If Step 3 showed port **3000**:  
  `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- If Step 3 showed port **3001**:  
  `NEXT_PUBLIC_SITE_URL=http://localhost:3001`

Rules:

- **No** trailing slash after the port.
- `MARKETING_DASHBOARD_SECRET` is what you will type on the login screen (not your Google password).

### Step 5 — Restart the dev server

After saving `.env.local`:

1. Stop the server: **Ctrl+C** in the terminal.
2. Start again: **`npm run dev`**.

### Step 6 — Open the login page

Use the **same host and port** as in Step 3 and Step 4.

**Chrome on macOS** — pick the line that matches your port:

```bash
# Port 3000
open -a "Google Chrome" "http://localhost:3000/tools/marketing/login"

# Port 3001 (when 3000 was busy)
open -a "Google Chrome" "http://localhost:3001/tools/marketing/login"
```

Or paste manually into the browser: **`YOUR_BASE_URL/tools/marketing/login`**

### Step 7 — Sign in

On the login page, enter **exactly** the value you set for **`MARKETING_DASHBOARD_SECRET`**.

You should land on **`/tools/marketing`** — that **is** the tool. You can generate LinkedIn/social drafts (fallback text works without OpenAI).

---

## Part B — Optional: better AI drafts & digest

1. Get an API key from [platform.openai.com](https://platform.openai.com/) (API keys).
2. Add to `.env.local`:

   ```bash
   OPENAI_API_KEY=sk-your-key-here
   ```

   Optional: `OPENAI_MODEL=gpt-4o-mini`

3. Restart **`npm run dev`**.

---

## Part C — Optional: Google Calendar reminders + Gmail drafts

Needed only if you want **calendar nudges** before posting or **Gmail drafts** for outreach.

### C1 — Google Cloud

1. [Google Cloud Console](https://console.cloud.google.com/) → create/select a project.
2. Enable **Google Calendar API** and **Gmail API** (APIs & Services → Library).

### C2 — OAuth consent (must be External for personal Gmail)

APIs & Services → **OAuth consent screen**.

**User type must be External** — not Internal. Internal only allows Google Workspace accounts in your organization; personal Gmail (e.g. `@gmail.com`) gets **`403: org_internal`**.

1. Click **Edit app** (or **Make external** if offered).
2. Set **User type** to **External**.
3. Fill app name (e.g. AxisForge Labs), support email, developer contact → Save.
4. While **Publishing status** is **Testing**, open **Test users** → **+ Add users** → add the Gmail you will sign in with (must match the account used on Connect Google).
5. Save.

If Google will not let you switch Internal → External on this project, create a **new** Google Cloud project, choose **External** from the start, and put the new Client ID/Secret in `.env.local`.

### C3 — OAuth client (Web)

APIs & Services → **Credentials** → **OAuth client ID** → **Web application**.

**Authorized redirect URI** — must match your app exactly:

```text
YOUR_BASE_URL/api/marketing/google/callback
```

Example for local port **3001**:

```text
http://localhost:3001/api/marketing/google/callback
```

Copy **Client ID** and **Client secret** into `.env.local`:

```bash
MARKETING_GOOGLE_CLIENT_ID=....apps.googleusercontent.com
MARKETING_GOOGLE_CLIENT_SECRET=....
```

Restart **`npm run dev`**.

### C4 — Connect from the dashboard

1. Open **`YOUR_BASE_URL/tools/marketing`** (logged in).
2. Click **Connect Google Calendar + Gmail** and finish consent.

If you see **redirect_uri_mismatch**, the redirect URI in Google Console and **`NEXT_PUBLIC_SITE_URL`** (including port) do not match — fix them to be the same origin. Restart **`npm run dev`** after any `.env.local` change.

**Client ID must match:** the OAuth client where you added the redirect URI must be the same Client ID in `.env.local`. If they differ, update `.env.local` or add the URI to the correct client.

### C5 — Google OAuth troubleshooting

| Google error | Fix |
|--------------|-----|
| **`403: org_internal`** | OAuth consent screen is **Internal**. Change to **External** (C2) and add your Gmail as a **Test user**. |
| **`access_denied`** | Gmail not listed under **Test users**, or you signed in with a different Google account. |
| **`redirect_uri_mismatch`** | Add exact `{NEXT_PUBLIC_SITE_URL}/api/marketing/google/callback` to **Authorized redirect URIs** on the OAuth client that matches `.env.local`. |
| Old Client ID in OAuth request | Restart **`npm run dev`** after editing `.env.local`. |

---

## Production (Vercel)

Deploy using [DEPLOY-NEXT-STEPS.md](./DEPLOY-NEXT-STEPS.md). In Vercel → Environment Variables, set the same names with **`NEXT_PUBLIC_SITE_URL=https://your-real-domain`** (no localhost). Add a second redirect URI in Google:

`https://your-real-domain/api/marketing/google/callback`

**Important:** On typical Vercel hosting, files under `data/marketing/` may **not persist**. Easiest reliable workflow is running **`npm run dev` on your Mac** for this dashboard until you add a database.

---

## Notes

### Port changed?

Update **both**:

1. `NEXT_PUBLIC_SITE_URL` in `.env.local`
2. Google **Authorized redirect URI** (if you use Part C)

Then restart **`npm run dev`**.

### `npm audit` / `npm audit fix --force`

- Prefer **`npm audit`** / **`npm audit fix`** without `--force`.
- **`npm audit fix --force`** can upgrade packages in breaking ways — avoid unless you know what changed.

### Compliance

Only email contacts you’re allowed to reach; honor opt-outs.

---

## Quick reference — URLs

| What | URL pattern |
|------|-------------|
| Login | `{BASE_URL}/tools/marketing/login` |
| Dashboard | `{BASE_URL}/tools/marketing` |

`BASE_URL` = whatever **`npm run dev`** prints (including port).
