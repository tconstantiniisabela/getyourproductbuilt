import crypto from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function secretsMatch(provided: string, configured: string): boolean {
  const left = Buffer.from(provided);
  const right = Buffer.from(configured);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function withSecret(url: string, secret: string): string {
  const target = new URL(url);
  target.searchParams.set("key", secret);
  return target.toString();
}

/**
 * Telegram requires a direct 2xx response. Google Apps Script web apps issue a
 * 302 before reaching doPost, so this endpoint preserves the POST through that
 * redirect and returns the resulting status to Telegram.
 */
export async function POST(req: Request) {
  const telegramSecret = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();
  const suppliedSecret = req.headers.get("x-telegram-bot-api-secret-token")?.trim();
  const appsScriptUrl = process.env.APPS_SCRIPT_TELEGRAM_WEBHOOK_URL?.trim();

  if (
    !telegramSecret ||
    !suppliedSecret ||
    !secretsMatch(suppliedSecret, telegramSecret) ||
    !appsScriptUrl
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.text();
  if (body.length > 1_000_000) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const upstream = withSecret(appsScriptUrl, telegramSecret);
  const headers = { "content-type": req.headers.get("content-type") ?? "application/json" };

  try {
    let response = await fetch(upstream, {
      method: "POST",
      headers,
      body,
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("Apps Script redirect missing Location header");
      response = await fetch(withSecret(location, telegramSecret), {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(10_000),
      });
    }

    if (!response.ok) throw new Error(`Apps Script returned ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "Telegram webhook relay failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json({ error: "Unable to process update" }, { status: 502 });
  }
}
