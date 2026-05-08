import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import { createReminderEvent } from "@/lib/marketing-google";

export async function POST(req: Request) {
  const denied = marketingAuthError();
  if (denied) return denied;

  let body: {
    channel: string;
    title?: string;
    description?: string;
    startIso: string;
    endIso?: string;
    timeZone: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.startIso || !body.timeZone || !body.channel) {
    return NextResponse.json({ error: "Missing startIso, timeZone, or channel" }, { status: 400 });
  }

  const start = new Date(body.startIso);
  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ error: "Invalid startIso" }, { status: 400 });
  }

  const end = body.endIso ? new Date(body.endIso) : new Date(start.getTime() + 30 * 60 * 1000);

  const title =
    body.title ??
    ({
      linkedin: "LinkedIn post — AxisForge Labs",
      x: "X post — AxisForge Labs",
      instagram: "Instagram post — AxisForge Labs",
      facebook: "Facebook post — AxisForge Labs",
    }[body.channel] ?? `Social — ${body.channel}`);

  const description =
    body.description ??
    "Reminder: copy today's draft from the AxisForge Labs marketing dashboard, paste into the network, publish during your overlap window.";

  try {
    await createReminderEvent({
      title,
      description,
      startIso: start.toISOString(),
      endIso: end.toISOString(),
      timeZone: body.timeZone,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Calendar error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
