import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import { loadDashboard, loadEvents, loadIngested, loadLeads, saveDashboard, utcDayString } from "@/lib/marketing-store";
import { aiDigest } from "@/lib/marketing-ai";

export async function POST() {
  const denied = marketingAuthError();
  if (denied) return denied;

  const leads = loadLeads();
  const events = loadEvents().slice(-80);
  const ingested = loadIngested().slice(-40);

  const statuses: Record<string, number> = {};
  for (const l of leads) {
    statuses[l.status] = (statuses[l.status] ?? 0) + 1;
  }

  const summary = [
    `UTC date: ${utcDayString()}`,
    `Lead statuses: ${JSON.stringify(statuses)}`,
    `Recent events: ${events.map((e) => `${e.at} ${e.type}`).join("; ")}`,
    `Ingested replies: ${ingested.map((i) => i.rawText.slice(0, 140)).join(" || ")}`,
  ].join("\n");

  let digest: string;
  try {
    digest =
      (await aiDigest(summary)) ??
      "## Daily digest\n\n(set OPENAI_API_KEY)\n\n" + summary;
  } catch {
    digest = "## Daily digest (offline)\n\n" + summary;
  }

  const dash = loadDashboard();
  saveDashboard({
    ...dash,
    lastDigest: digest,
    lastDigestAt: new Date().toISOString(),
  });

  return NextResponse.json({ digest });
}
