import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import { appendEvents, loadLeads, newId, saveLeads, type LeadStatus } from "@/lib/marketing-store";

const ALLOWED: LeadStatus[] = [
  "pending",
  "queued",
  "draft_created",
  "sent",
  "replied",
  "bounced",
  "opt_out",
  "skipped",
];

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  const denied = marketingAuthError();
  if (denied) return denied;

  const { id } = ctx.params;

  let body: { status?: LeadStatus };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.status || !ALLOWED.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const leads = loadLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const now = new Date().toISOString();
  leads[idx] = { ...leads[idx], status: body.status, updatedAt: now };
  saveLeads(leads);

  if (body.status === "sent") {
    appendEvents([
      {
        id: newId(),
        type: "sent",
        leadId: id,
        channel: "email",
        at: now,
      },
    ]);
  }

  return NextResponse.json({ ok: true, lead: leads[idx] });
}
