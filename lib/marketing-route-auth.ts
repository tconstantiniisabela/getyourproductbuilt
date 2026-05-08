import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { marketingCookieName, verifyMarketingSession } from "@/lib/marketing-auth";

export function marketingAuthError(): NextResponse | null {
  const secret = process.env.MARKETING_DASHBOARD_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "Marketing dashboard is not configured." }, { status: 503 });
  }
  const token = cookies().get(marketingCookieName())?.value;
  if (!verifyMarketingSession(token, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
