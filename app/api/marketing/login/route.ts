import { NextResponse } from "next/server";
import { marketingCookieName, signMarketingSession } from "@/lib/marketing-auth";

export async function POST(req: Request) {
  const secret = process.env.MARKETING_DASHBOARD_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.password || body.password !== secret) {
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
