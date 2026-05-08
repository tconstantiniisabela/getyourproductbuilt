import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { marketingCookieName, verifyMarketingSession } from "@/lib/marketing-auth";

export const dynamic = "force-dynamic";

export default function MarketingDashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const secret = process.env.MARKETING_DASHBOARD_SECRET?.trim();
  if (!secret) {
    redirect("/");
  }
  const token = cookies().get(marketingCookieName())?.value;
  if (!verifyMarketingSession(token, secret)) {
    redirect("/tools/marketing/login");
  }
  return children;
}
