import { NextResponse } from "next/server";
import { listOperations } from "@/lib/agent-operations";
import { marketingAuthError } from "@/lib/marketing-route-auth";

export async function GET() {
  const denied = marketingAuthError();
  if (denied) return denied;

  const data = listOperations();
  return NextResponse.json({
    events: data.events.slice(-20).reverse(),
    opportunities: data.opportunities.slice(-30).reverse(),
    projects: data.projects.slice(-30).reverse(),
    approvals: data.approvals.slice(-50).reverse(),
    runs: data.runs.slice(-30).reverse(),
  });
}
