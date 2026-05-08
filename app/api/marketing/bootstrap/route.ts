import { NextResponse } from "next/server";
import { marketingAuthError } from "@/lib/marketing-route-auth";
import {
  loadDashboard,
  loadGoogleTokens,
  loadIngested,
  loadLeads,
  loadQuota,
  utcDayString,
} from "@/lib/marketing-store";

export async function GET() {
  const denied = marketingAuthError();
  if (denied) return denied;

  const tokens = loadGoogleTokens();
  const googleConnected = Boolean(tokens?.refresh_token ?? tokens?.access_token);

  return NextResponse.json({
    googleConnected,
    dashboard: loadDashboard(),
    leads: loadLeads(),
    ingested: loadIngested(),
    quota: loadQuota(),
    todayUtc: utcDayString(),
  });
}
