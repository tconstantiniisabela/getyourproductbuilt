import { NextResponse } from "next/server";
import { buildOperationsBrief } from "@/lib/agent-operations";
import { marketingAuthError } from "@/lib/marketing-route-auth";

export async function GET() {
  const denied = marketingAuthError();
  if (denied) return denied;

  return NextResponse.json({ brief: buildOperationsBrief(), generatedAt: new Date().toISOString() });
}
