import { google } from "googleapis";
import type { GoogleStoredTokens } from "@/lib/marketing-store";
import { loadGoogleTokens, saveGoogleTokens } from "@/lib/marketing-store";

export const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events";
export const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.compose";

export function marketingGoogleRedirectUri(): string {
  const explicit = process.env.MARKETING_GOOGLE_REDIRECT_URI?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const pub = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (pub) return `${pub.replace(/\/$/, "")}/api/marketing/google/callback`;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const withProto = vercel.startsWith("http") ? vercel : `https://${vercel}`;
    return `${withProto.replace(/\/$/, "")}/api/marketing/google/callback`;
  }

  throw new Error(
    "Set MARKETING_GOOGLE_REDIRECT_URI or NEXT_PUBLIC_SITE_URL for Google OAuth.",
  );
}

export function createOAuthClient() {
  const id = process.env.MARKETING_GOOGLE_CLIENT_ID ?? process.env.GOOGLE_CLIENT_ID;
  const secret = process.env.MARKETING_GOOGLE_CLIENT_SECRET ?? process.env.GOOGLE_CLIENT_SECRET;
  if (!id || !secret) {
    throw new Error("Set MARKETING_GOOGLE_CLIENT_ID and MARKETING_GOOGLE_CLIENT_SECRET.");
  }
  return new google.auth.OAuth2(id, secret, marketingGoogleRedirectUri());
}

export function getGoogleAuthUrl(): string {
  const client = createOAuthClient();
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [CALENDAR_SCOPE, GMAIL_SCOPE],
  });
}

export async function exchangeCodeForTokens(code: string): Promise<void> {
  const client = createOAuthClient();
  const { tokens } = await client.getToken(code);
  saveGoogleTokens(tokens as GoogleStoredTokens);
}

export async function getAuthorizedClient() {
  const stored = loadGoogleTokens();
  if (!stored?.refresh_token && !stored?.access_token) return null;

  const client = createOAuthClient();
  client.setCredentials(stored);

  client.on("tokens", (t) => {
    const cur = loadGoogleTokens() ?? {};
    saveGoogleTokens({
      ...cur,
      access_token: t.access_token ?? cur.access_token,
      refresh_token: t.refresh_token ?? cur.refresh_token,
      expiry_date: t.expiry_date ?? cur.expiry_date,
    });
  });

  return client;
}

export async function createReminderEvent(opts: {
  title: string;
  description: string;
  startIso: string;
  endIso: string;
  timeZone: string;
}) {
  const auth = await getAuthorizedClient();
  if (!auth) throw new Error("Google not connected");

  const calendar = google.calendar({ version: "v3", auth });

  await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: opts.title,
      description: opts.description,
      start: { dateTime: opts.startIso, timeZone: opts.timeZone },
      end: { dateTime: opts.endIso, timeZone: opts.timeZone },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 60 },
          { method: "popup", minutes: 30 },
          { method: "email", minutes: 45 },
        ],
      },
    },
  });
}

function encodeRawEmail(to: string, subject: string, body: string): string {
  const lines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ];
  const message = lines.join("\r\n");
  return Buffer.from(message).toString("base64url");
}

export async function createGmailDraft(to: string, subject: string, body: string) {
  const auth = await getAuthorizedClient();
  if (!auth) throw new Error("Google not connected");

  const gmail = google.gmail({ version: "v1", auth });
  const raw = encodeRawEmail(to, subject, body);

  await gmail.users.drafts.create({
    userId: "me",
    requestBody: {
      message: { raw },
    },
  });
}
