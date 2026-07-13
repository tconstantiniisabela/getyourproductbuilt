import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { site } from "@/lib/site";

const links = [
  { href: "#what-we-build", label: "What we build" },
  { href: "#pricing", label: "Pricing" },
  { href: "#offers", label: "Offers" },
  { href: "#work", label: "Selected work" },
  { href: "/tools/scope-estimator", label: "Scope estimator" },
  { href: "#how-we-work", label: "How we work" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center justify-between">
        <Link
          href="/"
          className="rounded-md transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <ExternalLink href={site.calcomUrl}>{site.ctaLabel}</ExternalLink>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
