import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export type LeadStatus =
  | "pending"
  | "queued"
  | "draft_created"
  | "sent"
  | "replied"
  | "bounced"
  | "opt_out"
  | "skipped";

export type Lead = {
  id: string;
  email: string;
  name?: string;
  company?: string;
  title?: string;
  source: string;
  segment?: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
};

export type OutreachEvent = {
  id: string;
  type:
    | "queued"
    | "draft_created"
    | "sent"
    | "reply"
    | "bounce"
    | "open"
    | "click"
    | "opt_out"
    | "note";
  leadId?: string;
  channel?: "email";
  meta?: Record<string, unknown>;
  at: string;
};

export type SendQuota = {
  utcDay: string;
  /** CLI/API sends per day */
  sentCount: number;
  /** Gmail drafts created per day (dashboard) */
  draftCount: number;
};

/** Two AI variants per channel per UTC day */
export type DailyPair = {
  date: string;
  optionA: string;
  optionB: string;
  generatedAt: string;
};

export type DashboardContent = {
  linkedin?: DailyPair;
  social?: {
    date: string;
    x: Pick<DailyPair, "optionA" | "optionB">;
    instagram: Pick<DailyPair, "optionA" | "optionB">;
    facebook: Pick<DailyPair, "optionA" | "optionB">;
    generatedAt: string;
  };
  lastDigest?: string;
  lastDigestAt?: string;
  lastMessagingAnalysis?: string;
  lastMessagingAnalysisAt?: string;
};

export type IngestedReply = {
  id: string;
  leadId?: string;
  leadEmail?: string;
  rawText: string;
  ingestedAt: string;
};

export type GoogleStoredTokens = {
  access_token?: string | null;
  refresh_token?: string | null;
  expiry_date?: number | null;
  scope?: string;
  token_type?: string | null;
};

export type OAuthPending = {
  nonce: string;
  exp: number;
};

function rootDir(): string {
  return process.cwd();
}

export function dataDir(): string {
  return path.join(rootDir(), "data", "marketing");
}

export function ensureDataDir(): void {
  fs.mkdirSync(dataDir(), { recursive: true });
}

function readJson<T>(file: string, fallback: T): T {
  ensureDataDir();
  const p = path.join(dataDir(), file);
  if (!fs.existsSync(p)) return fallback;
  return JSON.parse(fs.readFileSync(p, "utf8")) as T;
}

function writeJson(file: string, value: unknown): void {
  ensureDataDir();
  const p = path.join(dataDir(), file);
  fs.writeFileSync(p, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function loadLeads(): Lead[] {
  return readJson<Lead[]>("leads.json", []);
}

export function saveLeads(leads: Lead[]): void {
  writeJson("leads.json", leads);
}

export function loadEvents(): OutreachEvent[] {
  return readJson<OutreachEvent[]>("events.json", []);
}

export function appendEvents(events: OutreachEvent[]): void {
  const cur = loadEvents();
  writeJson("events.json", [...cur, ...events]);
}

/** Tracks Gmail draft creations per UTC day */
export function loadQuota(): SendQuota {
  const raw = readJson<Partial<SendQuota>>("send_quota.json", {});
  return {
    utcDay: raw.utcDay ?? "",
    sentCount: raw.sentCount ?? 0,
    draftCount: raw.draftCount ?? 0,
  };
}

export function saveQuota(q: SendQuota): void {
  writeJson("send_quota.json", q);
}

export function loadDashboard(): DashboardContent {
  return readJson<DashboardContent>("dashboard.json", {});
}

export function saveDashboard(d: DashboardContent): void {
  writeJson("dashboard.json", d);
}

export function loadIngested(): IngestedReply[] {
  return readJson<IngestedReply[]>("ingested.json", []);
}

export function saveIngested(items: IngestedReply[]): void {
  writeJson("ingested.json", items);
}

export function appendIngested(item: IngestedReply): void {
  const cur = loadIngested();
  saveIngested([...cur, item]);
}

export function setOAuthPending(p: OAuthPending): void {
  writeJson("oauth-pending.json", p);
}

export function takeOAuthPending(nonce: string): boolean {
  const fullPath = path.join(dataDir(), "oauth-pending.json");
  if (!fs.existsSync(fullPath)) return false;
  try {
    const p = JSON.parse(fs.readFileSync(fullPath, "utf8")) as OAuthPending;
    fs.unlinkSync(fullPath);
    return p.nonce === nonce && Date.now() < p.exp;
  } catch {
    return false;
  }
}

export function loadGoogleTokens(): GoogleStoredTokens | null {
  ensureDataDir();
  const p = path.join(dataDir(), "google-tokens.json");
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as GoogleStoredTokens;
  } catch {
    return null;
  }
}

export function saveGoogleTokens(tokens: GoogleStoredTokens): void {
  ensureDataDir();
  writeJson("google-tokens.json", tokens);
}

export function utcDayString(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function newId(): string {
  return crypto.randomUUID();
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
