import { NextResponse } from "next/server";
import {
  ingestOperationEvent,
  type OperationEventType,
} from "@/lib/agent-operations";
import { operationsEventAuthError } from "@/lib/operations-route-auth";

const EVENT_TYPES: OperationEventType[] = [
  "booking",
  "inbound_message",
  "scope_submission",
  "payment",
  "acceptance",
  "support_request",
];

export async function POST(req: Request) {
  const denied = operationsEventAuthError(req);
  if (denied) return denied;

  let body: {
    type?: OperationEventType;
    idempotencyKey?: string;
    occurredAt?: string;
    contactEmail?: string;
    company?: string;
    payload?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.type || !EVENT_TYPES.includes(body.type)) {
    return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
  }
  if (!body.idempotencyKey?.trim() || body.idempotencyKey.length > 160) {
    return NextResponse.json({ error: "A valid idempotency key is required" }, { status: 400 });
  }
  if (body.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.contactEmail.trim())) {
    return NextResponse.json({ error: "Invalid contact email" }, { status: 400 });
  }

  try {
    const result = ingestOperationEvent({
      type: body.type,
      idempotencyKey: body.idempotencyKey,
      occurredAt: body.occurredAt,
      contactEmail: body.contactEmail,
      company: body.company,
      payload: body.payload,
    });
    return NextResponse.json({ ok: true, ...result }, { status: result.duplicate ? 200 : 201 });
  } catch {
    return NextResponse.json({ error: "Unable to record the event" }, { status: 500 });
  }
}
