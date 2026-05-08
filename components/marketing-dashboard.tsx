"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type LeadRow = {
  id: string;
  email: string;
  name?: string;
  company?: string;
  status: string;
};

type Bootstrap = {
  googleConnected: boolean;
  dashboard: {
    linkedin?: {
      date: string;
      optionA: string;
      optionB: string;
      generatedAt: string;
    };
    social?: {
      date: string;
      x: { optionA: string; optionB: string };
      instagram: { optionA: string; optionB: string };
      facebook: { optionA: string; optionB: string };
      generatedAt: string;
    };
    lastDigest?: string;
    lastDigestAt?: string;
    lastMessagingAnalysis?: string;
    lastMessagingAnalysisAt?: string;
  };
  leads: LeadRow[];
  quota: { utcDay: string; sentCount: number; draftCount: number };
  todayUtc: string;
};

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Europe/Madrid",
];

const textarea =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

async function parseErr(res: Response): Promise<string> {
  try {
    const j = await res.json();
    return typeof j.error === "string" ? j.error : res.statusText;
  } catch {
    return res.statusText;
  }
}

export function MarketingDashboard() {
  const [boot, setBoot] = useState<Bootstrap | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [linkedLiPick, setLinkedLiPick] = useState<"A" | "B">("A");
  const [linkedLiDT, setLinkedLiDT] = useState("");
  const [linkedLiTz, setLinkedLiTz] = useState("America/New_York");

  const [socialPick, setSocialPick] = useState<"A" | "B">("A");
  const [socialTab, setSocialTab] = useState<"x" | "instagram" | "facebook">("x");
  const [socialDT, setSocialDT] = useState("");
  const [socialTz, setSocialTz] = useState("Europe/Berlin");

  const [ingestEmail, setIngestEmail] = useState("");
  const [ingestBody, setIngestBody] = useState("");

  const loadBoot = useCallback(async () => {
    setErr(null);
    const res = await fetch("/api/marketing/bootstrap", { credentials: "include" });
    if (!res.ok) {
      setErr(await parseErr(res));
      return;
    }
    const data = (await res.json()) as Bootstrap;
    setBoot(data);
  }, []);

  useEffect(() => {
    loadBoot().catch(() => setErr("Failed to load dashboard."));
  }, [loadBoot]);

  const linkedInTexts = useMemo(() => {
    const li = boot?.dashboard.linkedin;
    return li ? { a: li.optionA, b: li.optionB } : null;
  }, [boot]);

  const socialTexts = useMemo(() => {
    const s = boot?.dashboard.social;
    if (!s) return null;
    const plat = s[socialTab];
    return plat ? { a: plat.optionA, b: plat.optionB } : null;
  }, [boot, socialTab]);

  async function copyText(label: string, text: string) {
    setErr(null);
    try {
      await navigator.clipboard.writeText(text);
      setMsg(`Copied (${label}).`);
      setTimeout(() => setMsg(null), 2500);
    } catch {
      setErr("Clipboard unavailable — select text manually.");
    }
  }

  async function genLinkedIn(force?: boolean) {
    setErr(null);
    const res = await fetch("/api/marketing/generate/linkedin", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ force: Boolean(force) }),
    });
    if (!res.ok) setErr(await parseErr(res));
    await loadBoot();
  }

  async function genSocial(force?: boolean) {
    setErr(null);
    const res = await fetch("/api/marketing/generate/social", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ force: Boolean(force) }),
    });
    if (!res.ok) setErr(await parseErr(res));
    await loadBoot();
  }

  async function scheduleReminder(kind: "linkedin" | "social") {
    setErr(null);
    const dtLocal = kind === "linkedin" ? linkedLiDT : socialDT;
    const tz = kind === "linkedin" ? linkedLiTz : socialTz;
    const channel = kind === "linkedin" ? "linkedin" : socialTab;

    if (!dtLocal) {
      setErr("Pick date & time first.");
      return;
    }

    const start = new Date(dtLocal);
    if (Number.isNaN(start.getTime())) {
      setErr("Invalid date.");
      return;
    }

    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const chosen =
      kind === "linkedin"
        ? linkedLiPick === "A"
          ? linkedInTexts?.a
          : linkedInTexts?.b
        : socialPick === "A"
          ? socialTexts?.a
          : socialTexts?.b;

    const description = [
      "AxisForge Labs marketing dashboard — paste the chosen draft into the network.",
      "",
      chosen ? chosen.slice(0, 1800) : "(generate drafts above first)",
    ].join("\n");

    const res = await fetch("/api/marketing/calendar", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel,
        startIso: start.toISOString(),
        endIso: end.toISOString(),
        timeZone: tz,
        description,
      }),
    });

    if (!res.ok) setErr(await parseErr(res));
    else setMsg("Calendar event added — Google will notify before go-time.");
  }

  async function refreshDigest() {
    setErr(null);
    const res = await fetch("/api/marketing/digest", { method: "POST", credentials: "include" });
    if (!res.ok) setErr(await parseErr(res));
    await loadBoot();
  }

  async function runMessaging() {
    setErr(null);
    const res = await fetch("/api/marketing/analyze", { method: "POST", credentials: "include" });
    if (!res.ok) setErr(await parseErr(res));
    await loadBoot();
  }

  async function submitIngest(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = await fetch("/api/marketing/ingest", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rawText: ingestBody,
        leadEmail: ingestEmail || undefined,
      }),
    });
    if (!res.ok) setErr(await parseErr(res));
    else {
      setMsg("Reply saved for analysis.");
      setIngestBody("");
    }
    await loadBoot();
  }

  async function createDrafts() {
    setErr(null);
    const res = await fetch("/api/marketing/gmail/drafts", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) setErr(typeof j.error === "string" ? j.error : await parseErr(res));
    else setMsg(`Created ${j.created ?? 0} Gmail draft(s). Open Gmail → Drafts → Send.`);
    await loadBoot();
  }

  async function markSent(id: string) {
    setErr(null);
    const res = await fetch(`/api/marketing/leads/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "sent" }),
    });
    if (!res.ok) setErr(await parseErr(res));
    await loadBoot();
  }

  async function importCsv(form: FormData) {
    setErr(null);
    const res = await fetch("/api/marketing/leads/import", {
      method: "POST",
      credentials: "include",
      body: form,
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) setErr(typeof j.error === "string" ? j.error : await parseErr(res));
    else setMsg(`Imported ${j.added ?? 0} new lead(s).`);
    await loadBoot();
  }

  if (!boot) {
    return (
      <div className="container max-w-5xl py-16 text-muted-foreground">
        Loading marketing dashboard…
      </div>
    );
  }

  return (
    <div className="container max-w-5xl space-y-10 py-12 pb-24">
      <header className="flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Internal — AxisForge Labs
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Growth dashboard</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
            LinkedIn & social drafts (two daily options), Google Calendar reminders on your primary calendar,
            Gmail drafts for outreach, funnel visibility, and messaging coaching from ingested replies.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!boot.googleConnected ? (
            <Button asChild variant="outline">
              <a href="/api/marketing/google/start">Connect Google Calendar + Gmail</a>
            </Button>
          ) : (
            <span className="rounded-md border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
              Google connected
            </span>
          )}
          <Button variant="ghost" asChild>
            <Link href="/">Back to site</Link>
          </Button>
          <Button
            variant="ghost"
            onClick={async () => {
              await fetch("/api/marketing/session", { method: "DELETE", credentials: "include" });
              window.location.href = "/tools/marketing/login";
            }}
          >
            Sign out
          </Button>
        </div>
      </header>

      {err ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {err}
        </p>
      ) : null}
      {msg ? (
        <p className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">
          {msg}
        </p>
      ) : null}

      <section id="linkedin" className="scroll-mt-24 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>LinkedIn — daily options</CardTitle>
            <CardDescription>
              Generate once per day (UTC). Pick option A or B, copy into LinkedIn. Schedule a primary-calendar
              block — reminders fire ~60 min, ~45 min email, and ~30 min before.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={() => genLinkedIn(false)}>
                Load / generate today
              </Button>
              <Button type="button" variant="outline" onClick={() => genLinkedIn(true)}>
                Force regenerate
              </Button>
            </div>
            {!linkedInTexts ? (
              <p className="text-sm text-muted-foreground">No drafts yet — tap generate.</p>
            ) : (
              <>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Option A
                  </span>
                  <textarea readOnly className={`${textarea} min-h-[140px]`} value={linkedInTexts.a} />
                  <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => copyText("LinkedIn A", linkedInTexts.a)}>
                    Copy option A
                  </Button>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Option B
                  </span>
                  <textarea readOnly className={`${textarea} min-h-[140px]`} value={linkedInTexts.b} />
                  <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => copyText("LinkedIn B", linkedInTexts.b)}>
                    Copy option B
                  </Button>
                </label>
                <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
                  <p className="text-sm font-medium text-foreground">Reminder on Google Calendar</p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <label className="flex flex-col gap-1 text-xs font-medium uppercase text-muted-foreground">
                      Which option is this post?
                      <select
                        className={`${textarea} h-11`}
                        value={linkedLiPick}
                        onChange={(e) => setLinkedLiPick(e.target.value as "A" | "B")}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium uppercase text-muted-foreground">
                      Post time (your browser local)
                      <input
                        type="datetime-local"
                        className={`${textarea} h-11`}
                        value={linkedLiDT}
                        onChange={(e) => setLinkedLiDT(e.target.value)}
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium uppercase text-muted-foreground">
                      Calendar TZ
                      <select className={`${textarea} h-11`} value={linkedLiTz} onChange={(e) => setLinkedLiTz(e.target.value)}>
                        {TIMEZONES.map((z) => (
                          <option key={z} value={z}>
                            {z}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <Button type="button" disabled={!boot.googleConnected} onClick={() => scheduleReminder("linkedin")}>
                    Add calendar reminder
                  </Button>
                  {!boot.googleConnected ? (
                    <p className="text-xs text-muted-foreground">Connect Google above first.</p>
                  ) : null}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <section id="social" className="scroll-mt-24 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Other social — daily pairs</CardTitle>
            <CardDescription>
              X, Instagram, and Facebook — each has two variants to choose from. Same calendar reminder flow,
              separate from LinkedIn.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={() => genSocial(false)}>
                Load / generate today
              </Button>
              <Button type="button" variant="outline" onClick={() => genSocial(true)}>
                Force regenerate
              </Button>
            </div>
            <div className="flex gap-2 border-b border-border pb-2">
              {(["x", "instagram", "facebook"] as const).map((t) => (
                <Button
                  key={t}
                  type="button"
                  size="sm"
                  variant={socialTab === t ? "default" : "ghost"}
                  className="capitalize"
                  onClick={() => setSocialTab(t)}
                >
                  {t === "x" ? "X" : t}
                </Button>
              ))}
            </div>
            {!socialTexts ? (
              <p className="text-sm text-muted-foreground">No drafts yet — tap generate.</p>
            ) : (
              <>
                <textarea readOnly className={`${textarea} min-h-[120px]`} value={socialTexts.a} />
                <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => copyText(`${socialTab} A`, socialTexts.a)}>
                  Copy option A
                </Button>
                <textarea readOnly className={`${textarea} min-h-[120px]`} value={socialTexts.b} />
                <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => copyText(`${socialTab} B`, socialTexts.b)}>
                  Copy option B
                </Button>
                <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
                  <p className="text-sm font-medium text-foreground">Reminder on Google Calendar</p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <label className="flex flex-col gap-1 text-xs font-medium uppercase text-muted-foreground">
                      Option
                      <select className={`${textarea} h-11`} value={socialPick} onChange={(e) => setSocialPick(e.target.value as "A" | "B")}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium uppercase text-muted-foreground">
                      Post time
                      <input type="datetime-local" className={`${textarea} h-11`} value={socialDT} onChange={(e) => setSocialDT(e.target.value)} />
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium uppercase text-muted-foreground">
                      Calendar TZ
                      <select className={`${textarea} h-11`} value={socialTz} onChange={(e) => setSocialTz(e.target.value)}>
                        {TIMEZONES.map((z) => (
                          <option key={z} value={z}>
                            {z}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <Button type="button" disabled={!boot.googleConnected} onClick={() => scheduleReminder("social")}>
                    Add calendar reminder
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <section id="digest" className="scroll-mt-24">
        <Card>
          <CardHeader>
            <CardTitle>Daily recap & next steps</CardTitle>
            <CardDescription>
              Snapshot of funnel + recent activity. Uses OpenAI when{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">OPENAI_API_KEY</code> is set on the server.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button type="button" onClick={() => refreshDigest()}>
              Refresh digest
            </Button>
            <div className="max-w-none rounded-md border border-border bg-muted/20 p-6 text-sm leading-relaxed">
              {boot.dashboard.lastDigest ? (
                <pre className="whitespace-pre-wrap font-sans text-foreground">{boot.dashboard.lastDigest}</pre>
              ) : (
                <p className="text-muted-foreground">No digest yet — tap refresh.</p>
              )}
            </div>
            {boot.dashboard.lastDigestAt ? (
              <p className="text-xs text-muted-foreground">Updated {boot.dashboard.lastDigestAt}</p>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <section id="outreach" className="scroll-mt-24 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Leads & Gmail drafts</CardTitle>
            <CardDescription>
              Upload a CSV with an <code className="rounded bg-muted px-1 text-xs">email</code> column (plus optional
              name, company, title, segment). We create Gmail drafts so you only hit send — max {20} drafts per UTC day.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xs text-muted-foreground">
              Drafts today: {boot.quota.utcDay === boot.todayUtc ? boot.quota.draftCount : 0} / 20 · Always comply with
              GDPR / CAN-SPAM for your lists.
            </p>
            <form
              className="flex flex-wrap items-end gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                importCsv(new FormData(e.currentTarget));
              }}
            >
              <label className="flex flex-col gap-1 text-xs font-medium uppercase text-muted-foreground">
                CSV file
                <input type="file" name="file" accept=".csv,text/csv" required className="text-sm" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium uppercase text-muted-foreground">
                Source label
                <input type="text" name="source" placeholder="e.g. webinar-may" className={`${textarea} h-11 max-w-xs`} />
              </label>
              <Button type="submit">Import leads</Button>
            </form>

            <Button type="button" disabled={!boot.googleConnected} onClick={() => createDrafts()}>
              Create Gmail drafts (pending / queued leads)
            </Button>

            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {boot.leads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-muted-foreground">
                        No leads yet — import CSV.
                      </td>
                    </tr>
                  ) : (
                    boot.leads.map((l) => (
                      <tr key={l.id} className="border-b border-border/60">
                        <td className="px-4 py-3 font-mono text-xs">{l.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{l.company ?? "—"}</td>
                        <td className="px-4 py-3 capitalize">{l.status.replace("_", " ")}</td>
                        <td className="px-4 py-3">
                          <Button type="button" size="sm" variant="outline" disabled={l.status === "sent"} onClick={() => markSent(l.id)}>
                            Mark sent
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="coaching" className="scroll-mt-24 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Ingest replies & adapt messaging</CardTitle>
            <CardDescription>
              Paste email replies you receive (after you send drafts). We store them for funnel tracking and coaching.
              Run analysis to tune tone and cadence.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={submitIngest}>
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Lead email (optional — maps to stage)
                </span>
                <input
                  type="email"
                  className={`${textarea} h-11`}
                  placeholder="founder@company.com"
                  value={ingestEmail}
                  onChange={(e) => setIngestEmail(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Reply text
                </span>
                <textarea className={`${textarea} min-h-[140px]`} required value={ingestBody} onChange={(e) => setIngestBody(e.target.value)} />
              </label>
              <Button type="submit">Save reply</Button>
            </form>

            <Button type="button" variant="outline" onClick={() => runMessaging()}>
              Analyze messaging from saved replies
            </Button>

            <div className="max-w-none rounded-md border border-border bg-muted/20 p-6 text-sm leading-relaxed">
              {boot.dashboard.lastMessagingAnalysis ? (
                <pre className="whitespace-pre-wrap font-sans text-foreground">{boot.dashboard.lastMessagingAnalysis}</pre>
              ) : (
                <p className="text-muted-foreground">Run analysis after you ingest a few replies.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
