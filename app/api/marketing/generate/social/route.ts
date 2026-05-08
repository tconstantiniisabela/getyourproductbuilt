import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import {
  loadDashboard,
  saveDashboard,
  utcDayString,
} from "@/lib/marketing-store";
import { aiSocialPairs, fallbackSocial } from "@/lib/marketing-ai";

export async function POST(req: Request) {
  const denied = marketingAuthError();
  if (denied) return denied;

  let force = false;
  try {
    const j = await req.json();
    force = Boolean(j?.force);
  } catch {
    /* optional */
  }

  const dash = loadDashboard();
  const today = utcDayString();
  if (!force && dash.social?.date === today) {
    return NextResponse.json({ social: dash.social, cached: true });
  }

  let bundle;
  try {
    bundle = (await aiSocialPairs()) ?? fallbackSocial();
  } catch (e) {
    bundle = fallbackSocial();
    console.error(e);
  }

  const social = {
    date: today,
    ...bundle,
    generatedAt: new Date().toISOString(),
  };

  saveDashboard({ ...dash, social });

  return NextResponse.json({ social, cached: false });
}
