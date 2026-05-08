#!/usr/bin/env npx tsx
/**
 * AxisForge Labs marketing toolkit — local CLI for drafts, lead pipeline, capped email sends,
 * and digest/analytics. Run from portfolio root: npm run marketing -- <command>
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";

import {
  appendEvents,
  loadEvents,
  loadLeads,
  loadQuota,
  normalizeEmail,
  newId,
  saveLeads,
  saveQuota,
  utcDayString,
  type OutreachEvent,
} from "@/lib/marketing-store";
import { outreachBody, outreachSubject } from "@/lib/marketing-outreach";
import {
  generateAnalyticsAdvice,
  generateDailyDigest,
  generateSocialBundle,
  generateWeeklyLinkedIn,
} from "./lib/generate";
import { macNotify } from "./lib/macos-notify";
import { nextLinkedInSlots, platformHints } from "./lib/time-windows";

const DAILY_SEND_CAP = 20;

function argFlag(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`${name}=`));
  return hit?.split("=").slice(1).join("=");
}

function hasFlag(name: string): boolean {
  return process.argv.includes(name);
}

function ensureDir(p: string): void {
  fs.mkdirSync(p, { recursive: true });
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    const row: Record<string, string> = {};
    header.forEach((h, j) => {
      row[h] = cols[j] ?? "";
    });
    rows.push(row);
  }
  return rows;
}

async function cmdLinkedInWeek(): Promise<void> {
  const promoRaw = argFlag("--promo") ?? "1";
  const promotionalCount = promoRaw === "2" ? 2 : 1;
  const notify = hasFlag("--notify");
  const openChrome = hasFlag("--open-chrome");

  const brief = await generateWeeklyLinkedIn({ promotionalCount });
  const slots = nextLinkedInSlots(new Date(), 3);
  ensureDir(path.join(process.cwd(), "data", "marketing", "output"));

  const outDir = path.join(process.cwd(), "data", "marketing", "output");
  ensureDir(outDir);
  const mdPath = path.join(outDir, `linkedin-week-${utcDayString()}.md`);

  const lines: string[] = [
    `# LinkedIn week — ${utcDayString()}`,
    "",
    "_LinkedIn does not allow reliable personal posting APIs for most accounts; publish manually or route through an approved scheduler (Buffer, Later, Metricool). Below are drafts + suggested windows._",
    "",
    "## Suggested posting windows (US + Western Europe overlap heuristic)",
    "",
    ...slots.map((s, i) => `### ${i + 1}. ${s.label}\n\n${s.whenUtcApprox}\n\n_${s.tzHint}_\n`),
    "",
    "## Posts",
    "",
  ];

  brief.linkedin.forEach((p, i) => {
    lines.push(`### ${p.title}`, "", p.body, "", `_Suggested slot: ${slots[i]?.label ?? `Slot ${i + 1}`}_`, "");
  });

  lines.push("---", "", brief.meta, "");

  fs.writeFileSync(mdPath, lines.join("\n"), "utf8");
  console.log(`Wrote ${mdPath}`);

  const notifyBody =
    "LinkedIn drafts ready. Post during overlap windows (see markdown). Open the file for copy-paste.";
  if (notify) macNotify("AxisForge Labs — LinkedIn week", notifyBody);
  if (openChrome && os.platform() === "darwin") {
    execFileSync("/usr/bin/open", ["-a", "Google Chrome", mdPath], { stdio: "inherit" });
  }
}

async function cmdSocialBundle(): Promise<void> {
  const bundle = await generateSocialBundle();
  const outDir = path.join(process.cwd(), "data", "marketing", "output");
  ensureDir(outDir);
  const out = path.join(outDir, `social-bundle-${utcDayString()}.md`);

  const doc = [
    `# Social bundle — ${utcDayString()}`,
    "",
    "## Platform timing hints",
    "",
    `- LinkedIn: ${platformHints.linkedin}`,
    `- X: ${platformHints.x}`,
    `- Instagram: ${platformHints.instagram}`,
    `- Facebook: ${platformHints.facebook}`,
    "",
    "_Automated posting requires OAuth for each network or a scheduler (Buffer, Later). Export below manually or connect Zapier/Make._",
    "",
    "## X",
    "",
    bundle.x,
    "",
    "## Instagram",
    "",
    bundle.instagram,
    "",
    "## Facebook",
    "",
    bundle.facebook,
    "",
    "---",
    bundle.notes,
    "",
  ].join("\n");

  fs.writeFileSync(out, doc, "utf8");
  console.log(`Wrote ${out}`);
}

function cmdLeadsImport(filePath: string, source: string): void {
  const abs = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(abs)) {
    console.error(`File not found: ${abs}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(abs, "utf8");
  const rows = parseCsv(raw);
  const leads = loadLeads();
  const existing = new Set(leads.map((l) => normalizeEmail(l.email)));
  const now = new Date().toISOString();
  let added = 0;

  for (const row of rows) {
    const email =
      row.email ||
      row["work email"] ||
      row["business email"] ||
      row["e-mail"] ||
      "";
    if (!email.includes("@")) continue;
    const norm = normalizeEmail(email);
    if (existing.has(norm)) continue;
    leads.push({
      id: newId(),
      email: norm,
      name: row.name || row.first_name || "",
      company: row.company || row.organization || "",
      title: row.title || row.role || "",
      source,
      segment: row.segment || row.vertical || "",
      status: "pending",
      createdAt: now,
    });
    existing.add(norm);
    added++;
  }

  saveLeads(leads);
  appendEvents([
    {
      id: newId(),
      type: "note",
      meta: { imported: added, file: abs, source },
      at: now,
    },
  ]);
  console.log(`Imported ${added} new leads (${rows.length} CSV rows).`);
}

function cmdOutreachQueue(): void {
  const dry = hasFlag("--dry-run");
  const leads = loadLeads();
  const pending = leads.filter((l) => l.status === "pending");
  const quota = loadQuota();
  const day = utcDayString();
  let sentToday = quota.utcDay === day ? quota.sentCount : 0;
  const room = Math.max(0, DAILY_SEND_CAP - sentToday);

  const toSend = pending.slice(0, room);
  console.log(
    dry
      ? `[dry-run] Would queue ${toSend.length} sends (${sentToday}/${DAILY_SEND_CAP} already today).`
      : `Queueing ${toSend.length} sends (${sentToday}/${DAILY_SEND_CAP} already today).`,
  );

  if (!dry) {
    const now = new Date().toISOString();
    for (const l of toSend) {
      l.status = "queued";
      l.updatedAt = now;
    }
    saveLeads(leads);
    appendEvents(
      toSend.map((l) => ({
        id: newId(),
        type: "queued" as const,
        leadId: l.id,
        at: now,
      })),
    );
  }

  for (const l of toSend) {
    console.log("\n---");
    console.log("To:", l.email);
    console.log("Subject:", outreachSubject(l.segment));
    console.log(outreachBody(l));
  }
}

async function cmdOutreachSend(): Promise<void> {
  const dry = hasFlag("--dry-run");
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.OUTREACH_FROM_EMAIL;
  if (!dry && (!apiKey || !from)) {
    console.error("Set RESEND_API_KEY and OUTREACH_FROM_EMAIL (verified sender/domain on Resend).");
    process.exit(1);
  }

  const leads = loadLeads();
  const queued = leads.filter((l) => l.status === "queued");
  const quota = loadQuota();
  const day = utcDayString();
  let sentToday = quota.utcDay === day ? quota.sentCount : 0;
  const room = Math.max(0, DAILY_SEND_CAP - sentToday);
  const batch = queued.slice(0, room);

  if (batch.length === 0) {
    console.log("No queued leads (or daily cap reached). Run outreach-queue first.");
    return;
  }

  const now = new Date().toISOString();

  for (const lead of batch) {
    const subject = outreachSubject(lead.segment);
    const body = outreachBody(lead);

    if (dry) {
      console.log(`[dry-run] send to ${lead.email}`);
      continue;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: lead.email,
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error(`Failed ${lead.email}: ${res.status} ${t}`);
      appendEvents([
        {
          id: newId(),
          type: "note",
          leadId: lead.id,
          meta: { error: t, status: res.status },
          at: now,
        },
      ]);
      continue;
    }

    lead.status = "sent";
    lead.updatedAt = now;
    sentToday += 1;
    appendEvents([
      {
        id: newId(),
        type: "sent",
        leadId: lead.id,
        channel: "email",
        at: now,
      },
    ]);
    console.log(`Sent → ${lead.email}`);
  }

  saveLeads(leads);
  saveQuota({
    utcDay: day,
    sentCount: sentToday,
    draftCount: quota.utcDay === day ? quota.draftCount : 0,
  });
}

async function cmdAnalytics(): Promise<void> {
  const leads = loadLeads();
  const events = loadEvents();
  const sent = events.filter((e) => e.type === "sent").length;
  const replies = events.filter((e) => e.type === "reply").length;
  const bySegment = new Map<string, { sent: number }>();

  for (const e of events) {
    if (e.type !== "sent" || !e.leadId) continue;
    const lead = leads.find((l) => l.id === e.leadId);
    const seg = lead?.segment?.trim() || "(unspecified)";
    const cur = bySegment.get(seg) ?? { sent: 0 };
    cur.sent += 1;
    bySegment.set(seg, cur);
  }

  const summary = [
    `Leads total: ${leads.length}`,
    `Statuses: ${JSON.stringify(countBy(leads, (l) => l.status))}`,
    `Events — sent signals: ${sent}, replies logged: ${replies}`,
    `By segment (sent): ${JSON.stringify(Object.fromEntries(bySegment))}`,
    "",
    "Reminder: log replies/opens manually into events.json via `marketing log-event` for better coaching.",
  ].join("\n");

  console.log(summary);
  const advice = await generateAnalyticsAdvice(summary);
  console.log("\n--- Suggestions ---\n");
  console.log(advice);
}

function countBy<T extends string>(items: { status: T }[], fn: (x: { status: T }) => T): Record<string, number> {
  const out: Record<string, number> = {};
  for (const it of items) {
    const k = fn(it);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

async function cmdDigest(): Promise<void> {
  const leads = loadLeads();
  const events = loadEvents().slice(-50);
  const quota = loadQuota();

  const summary = [
    `UTC date: ${utcDayString()}`,
    `Send quota state: ${JSON.stringify(quota)}`,
    `Lead funnel snapshot: ${JSON.stringify(countBy(leads, (l) => l.status))}`,
    `Recent events (up to 50): ${events.map((e) => `${e.at} ${e.type}`).join("; ")}`,
  ].join("\n");

  const digest = await generateDailyDigest(summary);
  const outDir = path.join(process.cwd(), "data", "marketing", "output");
  ensureDir(outDir);
  const file = path.join(outDir, `daily-digest-${utcDayString()}.md`);
  fs.writeFileSync(file, `# Daily digest\n\n${digest}\n`, "utf8");
  console.log(digest);
  console.log(`\nSaved: ${file}`);
  if (hasFlag("--notify")) {
    macNotify("AxisForge Labs — Daily digest", `Saved ${path.basename(file)}. Review suggestions in the file.`);
  }
}

function cmdLogEvent(): void {
  const type = argFlag("--type");
  const leadEmail = argFlag("--email");
  if (!type) {
    console.error("Usage: marketing log-event --type=reply|open|click|opt_out|note --email=optional");
    process.exit(1);
  }
  const leads = loadLeads();
  const leadId = leadEmail
    ? leads.find((l) => normalizeEmail(l.email) === normalizeEmail(leadEmail))?.id
    : undefined;

  appendEvents([
    {
      id: newId(),
      type: type as OutreachEvent["type"],
      leadId,
      at: new Date().toISOString(),
      meta: { manual: true },
    },
  ]);
  console.log("Event appended.");
}

async function cmdPostingPlan(): Promise<void> {
  console.log(
    [
      "Automatic posting per-network requires OAuth or a paid scheduler.",
      "Recommended path:",
      "1) Buffer / Later / Metricool — connect LinkedIn, X, IG, FB.",
      "2) Paste outputs from `social-bundle` / `linkedin-week` into queued slots.",
      "3) Use Zapier/Make: trigger from folder (Google Drive) → create draft post if API allows.",
      "",
      "This CLI intentionally avoids storing social passwords or violating platform ToS.",
    ].join("\n"),
  );
}

async function main(): Promise<void> {
  const [, , cmd] = process.argv;
  if (!cmd || cmd === "--help" || cmd === "-h") {
    console.log(`
AxisForge Labs marketing toolkit

Commands:
  linkedin-week [--promo=1|2] [--notify] [--open-chrome]
  social-bundle
  leads-import <file.csv> [--source=label]
  outreach-queue [--dry-run]
  outreach-send [--dry-run]        # uses RESEND_API_KEY + OUTREACH_FROM_EMAIL, max ${DAILY_SEND_CAP}/day
  analytics
  digest [--notify]
  log-event --type=reply|open|click|opt_out|note [--email=addr]
  posting-plan                     # guidance for schedulers / Zapier

Environment:
  OPENAI_API_KEY / OPENAI_MODEL (optional)
  RESEND_API_KEY / OUTREACH_FROM_EMAIL (for outreach-send)
  NEXT_PUBLIC_SITE_URL or SITE_URL (canonical links)

Compliance:
  Import only contacts you may lawfully email (consent, legitimate interest with documentation).
  Honor opt-outs immediately; include physical address and unsubscribe on bulk sends per your counsel.
`);
    process.exit(0);
  }

  if (cmd === "linkedin-week") await cmdLinkedInWeek();
  else if (cmd === "social-bundle") await cmdSocialBundle();
  else if (cmd === "leads-import") {
    const file = process.argv[3];
    const source = argFlag("--source") ?? "csv-import";
    if (!file) {
      console.error("Usage: marketing leads-import ./path/to.csv [--source=label]");
      process.exit(1);
    }
    cmdLeadsImport(file, source);
  } else if (cmd === "outreach-queue") cmdOutreachQueue();
  else if (cmd === "outreach-send") await cmdOutreachSend();
  else if (cmd === "analytics") await cmdAnalytics();
  else if (cmd === "digest") await cmdDigest();
  else if (cmd === "posting-plan") await cmdPostingPlan();
  else if (cmd === "log-event") cmdLogEvent();
  else {
    console.error(`Unknown command: ${cmd}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
