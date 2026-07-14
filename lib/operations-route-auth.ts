import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";

function secretsMatch(provided: string, configured: string): boolean {
  const left = Buffer.from(provided);
  const right = Buffer.from(configured);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

/**
 * Internal UI requests use the marketing dashboard session. External event relays
 * must use a distinct secret until each provider has a verified signature adapter.
 */
export function operationsEventAuthError(req: Request): NextResponse | null {
  const webhookSecret = process.env.OPERATIONS_WEBHOOK_SECRET?.trim();
  const suppliedSecret = req.headers.get("x-operations-webhook-secret")?.trim();
  if (webhookSecret && suppliedSecret && secretsMatch(suppliedSecret, webhookSecret)) {
    return null;
  }
  return marketingAuthError();
}
