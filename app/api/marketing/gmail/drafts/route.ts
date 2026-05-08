import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import {
  appendEvents,
  loadLeads,
  loadQuota,
  newId,
  saveLeads,
  saveQuota,
  utcDayString,
} from "@/lib/marketing-store";
import { createGmailDraft } from "@/lib/marketing-google";
import { outreachBody, outreachSubject } from "@/lib/marketing-outreach";

const DRAFT_DAILY_CAP = 20;

export async function POST(req: Request) {
  const denied = marketingAuthError();
  if (denied) return denied;

  let body: { leadIds?: string[] };
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const ids = body.leadIds?.filter(Boolean);
  const leads = loadLeads();
  const targets =
    ids && ids.length > 0
      ? leads.filter((l) => ids.includes(l.id))
      : leads.filter((l) => l.status === "pending" || l.status === "queued");

  const day = utcDayString();
  let quota = loadQuota();
  if (quota.utcDay !== day) {
    quota = { utcDay: day, sentCount: quota.sentCount, draftCount: 0 };
  }

  const room = Math.max(0, DRAFT_DAILY_CAP - quota.draftCount);
  const batch = targets.slice(0, room);

  if (batch.length === 0) {
    return NextResponse.json({
      ok: true,
      created: 0,
      message: room === 0 ? "Daily Gmail draft cap reached (20)." : "No eligible leads.",
    });
  }

  const now = new Date().toISOString();
  let created = 0;

  for (const lead of batch) {
    try {
      await createGmailDraft(lead.email, outreachSubject(lead.segment), outreachBody(lead));
      created += 1;
      quota = { ...quota, draftCount: quota.draftCount + 1 };

      const idx = leads.findIndex((l) => l.id === lead.id);
      if (idx !== -1) {
        leads[idx] = {
          ...leads[idx],
          status: "draft_created",
          updatedAt: now,
        };
      }

      appendEvents([
        {
          id: newId(),
          type: "draft_created",
          leadId: lead.id,
          channel: "email",
          at: now,
        },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Draft failed";
      return NextResponse.json({ error: msg, created }, { status: 400 });
    }
  }

  saveLeads(leads);
  saveQuota(quota);

  return NextResponse.json({ ok: true, created });
}
