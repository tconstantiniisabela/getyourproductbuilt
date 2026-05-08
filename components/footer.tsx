import { LogoMark } from "@/components/logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-start justify-between gap-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <div className="flex max-w-xl items-start gap-3">
          <LogoMark
            className="mt-0.5 h-8 max-h-8 shrink-0 opacity-95"
            aria-hidden
          />
          <div>
            © {new Date().getFullYear()} {site.companyName}. Production deployments on
            enterprise-grade edge infrastructure.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={site.xUrl}
            className="transition-colors hover:text-foreground"
          >
            X
          </a>
          <a
            href={site.linkedinUrl}
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
