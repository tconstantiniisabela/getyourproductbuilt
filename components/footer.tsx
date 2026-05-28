import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col gap-8 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex max-w-xl items-start gap-3">
            <LogoMark
              className="mt-0.5 h-8 max-h-8 shrink-0 opacity-95"
              aria-hidden
            />
            <div>
              © {new Date().getFullYear()} {site.companyName}. Fixed-scope builds with written scope and clean handoff.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <ExternalLink href={site.xUrl} className="transition-colors hover:text-foreground">
              X
            </ExternalLink>
            <ExternalLink href={site.linkedinUrl} className="transition-colors hover:text-foreground">
              LinkedIn
            </ExternalLink>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
              Email
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <ExternalLink href={site.calcomUrl} className="transition-colors hover:text-foreground">
            {site.ctaLabel}
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
}
