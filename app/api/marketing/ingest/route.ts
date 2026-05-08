import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import {
  appendEvents,
  appendIngested,
  loadLeads,
  newId,
  normalizeEmail,
  saveLeads,
} from "@/lib/marketing-store";

export async function POST(req: Request) {
  const denied = marketingAuthError();
  if (denied) return denied;

  let body: { rawText?: string; leadEmail?: string; leadId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const raw = body.rawText?.trim();
  if (!raw) {
    return NextResponse.json({ error: "rawText required" }, { status: 400 });
  }

  const leads = loadLeads();
  let leadId = body.leadId;
  if (!leadId && body.leadEmail) {
    const hit = leads.find((l) => normalizeEmail(l.email) === normalizeEmail(body.leadEmail!));
    leadId = hit?.id;
  }

  appendIngested({
    id: newId(),
    leadId,
    leadEmail: body.leadEmail ? normalizeEmail(body.leadEmail) : undefined,
    rawText: raw,
    ingestedAt: new Date().toISOString(),
  });

  appendEvents([
    {
      id: newId(),
      type: "reply",
      leadId,
      at: new Date().toISOString(),
      meta: { snippet: raw.slice(0, 280) },
    },
  ]);

  if (leadId) {
    const next = leads.map((l) =>
      l.id === leadId && l.status !== "opt_out"
        ? { ...l, status: "replied" as const, updatedAt: new Date().toISOString() }
        : l,
    );
    saveLeads(next);
  }

  return NextResponse.json({ ok: true });
}
