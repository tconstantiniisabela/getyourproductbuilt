"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
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

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
        >
          <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <ExternalLink
              href={site.calcomUrl}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90"
              onClick={() => setOpen(false)}
            >
              {site.ctaLabel}
            </ExternalLink>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
