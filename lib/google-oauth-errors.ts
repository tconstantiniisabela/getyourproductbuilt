/** User-facing hints when Google OAuth returns an error code. */
export function googleOAuthErrorMessage(code: string | null | undefined): string | null {
  if (!code) return null;

  const hints: Record<string, string> = {
    org_internal:
      "Your OAuth consent screen is set to Internal (Workspace org only). In Google Cloud → OAuth consent screen, change User type to External, add your Gmail under Test users, save, then try Connect Google again.",
    access_denied:
      "Google denied access. Add your Gmail under OAuth consent screen → Test users (while the app is in Testing), then retry.",
    redirect_uri_mismatch:
      "Redirect URI mismatch. In Google Cloud → Credentials → your Web OAuth client, add exactly: {NEXT_PUBLIC_SITE_URL}/api/marketing/google/callback (same port as npm run dev). Restart the dev server after .env.local changes.",
    invalid_state:
      "OAuth session expired or was interrupted. Open the dashboard and click Connect Google again.",
    token_exchange:
      "Could not exchange the Google auth code. Confirm Client ID and Client secret in .env.local match the OAuth client in Google Cloud, then restart npm run dev.",
  };

  return hints[code] ?? `Google connection failed (${code}). See MARKETING-DASHBOARD-SETUP.md → Part C troubleshooting.`;
}
