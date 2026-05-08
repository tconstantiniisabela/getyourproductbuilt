import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import {
  loadDashboard,
  saveDashboard,
  utcDayString,
  type DailyPair,
} from "@/lib/marketing-store";
import { aiLinkedInPair, fallbackLinkedInPair } from "@/lib/marketing-ai";

export async function POST(req: Request) {
  const denied = marketingAuthError();
  if (denied) return denied;

  let force = false;
  try {
    const j = await req.json();
    force = Boolean(j?.force);
  } catch {
    /* optional body */
  }

  const dash = loadDashboard();
  const today = utcDayString();
  if (!force && dash.linkedin?.date === today) {
    return NextResponse.json({ linkedin: dash.linkedin, cached: true });
  }

  let pair: { optionA: string; optionB: string };
  try {
    pair = (await aiLinkedInPair()) ?? fallbackLinkedInPair();
  } catch (e) {
    pair = fallbackLinkedInPair();
    console.error(e);
  }

  const linkedin: DailyPair = {
    date: today,
    optionA: pair.optionA,
    optionB: pair.optionB,
    generatedAt: new Date().toISOString(),
  };

  saveDashboard({ ...dash, linkedin });

  return NextResponse.json({ linkedin, cached: false });
}
