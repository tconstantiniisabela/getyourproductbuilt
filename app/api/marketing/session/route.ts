import { NextResponse } from "next/server";
import { marketingCookieName } from "@/lib/marketing-auth";

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(marketingCookieName(), "", { path: "/", maxAge: 0 });
  return res;
}
