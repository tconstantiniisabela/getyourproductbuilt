import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import { createOAuthClient } from "@/lib/marketing-google";
import { newId, setOAuthPending } from "@/lib/marketing-store";

export async function GET() {
  const denied = marketingAuthError();
  if (denied) return denied;

  const nonce = newId();
  setOAuthPending({ nonce, exp: Date.now() + 15 * 60 * 1000 });

  try {
    const client = createOAuthClient();
    const url = client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/calendar.events",
        "https://www.googleapis.com/auth/gmail.compose",
      ],
      state: nonce,
    });
    return NextResponse.redirect(url);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "OAuth configuration error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
