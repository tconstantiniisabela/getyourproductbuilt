import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="rounded-md transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link
            href="#pricing"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#work"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Selected work
          </Link>
          <Link
            href="#how-i-work"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            How we work
          </Link>
          <Link
            href="#about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="#faq"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>
        <Button asChild size="sm">
          <a href={site.calcomUrl}>Book intro</a>
        </Button>
      </div>
    </header>
  );
}
