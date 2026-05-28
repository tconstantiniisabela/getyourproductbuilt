import { NextResponse } from "next/server";
import { marketingCookieName, signMarketingSession, verifyMarketingPassword } from "@/lib/marketing-auth";
import { rateLimit } from "@/lib/rate-limit";

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "unknown";
}

export async function POST(req: Request) {
  const secret = process.env.MARKETING_DASHBOARD_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const limit = rateLimit(`marketing-login:${clientKey(req)}`, { limit: 8, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!verifyMarketingPassword(body.password, secret)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = signMarketingSession(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(marketingCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
