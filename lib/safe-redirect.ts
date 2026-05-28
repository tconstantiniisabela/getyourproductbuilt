/** Safe internal redirect targets after marketing dashboard login. */
export function safeMarketingRedirect(next: string | null | undefined): string {
  const fallback = "/tools/marketing";
  if (!next) return fallback;
  if (!next.startsWith("/tools/marketing")) return fallback;
  if (next.startsWith("//")) return fallback;
  return next;
}
