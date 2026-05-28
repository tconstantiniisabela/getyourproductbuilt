import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const INTERNAL_PREFIXES = ["/tools/marketing", "/api/marketing"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isInternal = INTERNAL_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (!isInternal) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/tools/marketing/:path*", "/api/marketing/:path*"],
};
