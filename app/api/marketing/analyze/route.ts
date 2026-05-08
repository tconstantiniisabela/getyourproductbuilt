import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import {
  loadDashboard,
  loadEvents,
  loadIngested,
  loadLeads,
  saveDashboard,
} from "@/lib/marketing-store";
import { aiMessagingAdvice } from "@/lib/marketing-ai";

export async function POST() {
  const denied = marketingAuthError();
  if (denied) return denied;

  const leads = loadLeads();
  const ingested = loadIngested();
  const events = loadEvents().filter((e) => e.type === "sent" || e.type === "reply");

  const statuses: Record<string, number> = {};
  for (const l of leads) {
    statuses[l.status] = (statuses[l.status] ?? 0) + 1;
  }

  const blob = [
    ...ingested.map((i) => `Reply (${i.leadEmail ?? "?"}): ${i.rawText}`),
    ...events.slice(-60).map((e) => `Event ${e.type} at ${e.at}`),
    `Funnel: ${JSON.stringify(statuses)}`,
  ].join("\n");

  let analysis: string;
  try {
    analysis =
      (await aiMessagingAdvice(blob)) ??
      "## Messaging (offline)\n\nPaste OPENAI_API_KEY to enable coaching.\n\n" + blob.slice(0, 1800);
  } catch {
    analysis = "## Messaging (offline)\n\n" + blob.slice(0, 1800);
  }

  const dash = loadDashboard();
  saveDashboard({
    ...dash,
    lastMessagingAnalysis: analysis,
    lastMessagingAnalysisAt: new Date().toISOString(),
  });

  return NextResponse.json({ analysis });
}
