import { NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/marketing-google";
import { takeOAuthPending } from "@/lib/marketing-store";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const err = url.searchParams.get("error");

  if (err) {
    return NextResponse.redirect(new URL(`/tools/marketing/login?googleError=${encodeURIComponent(err)}`, url.origin));
  }

  if (!code || !state || !takeOAuthPending(state)) {
    return NextResponse.redirect(new URL("/tools/marketing/login?googleError=invalid_state", url.origin));
  }

  try {
    await exchangeCodeForTokens(code);
  } catch {
    return NextResponse.redirect(new URL("/tools/marketing/login?googleError=token_exchange", url.origin));
  }

  return NextResponse.redirect(new URL("/tools/marketing?connected=1", url.origin));
}
