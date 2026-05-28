import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { site, siteOrigin } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description = `${site.companyShort} builds fixed-price AI tools and automations for teams—three clear packages plus custom scoping. Remote delivery with US and EU hours overlap.`;

/** Canonical URL for OG/metadata: env overrides → Vercel preview URL → site.domain */
function resolveMetadataBase(): URL | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    try {
      return new URL(explicit);
    } catch {
      /* ignore */
    }
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const withProto = vercel.startsWith("http") ? vercel : `https://${vercel}`;
    try {
      return new URL(withProto);
    } catch {
      /* ignore */
    }
  }
  if (!site.domain.startsWith("[")) {
    try {
      return new URL(`https://${site.domain}`);
    } catch {
      return undefined;
    }
  }
  return undefined;
}

const titleDefault = `${site.companyShort} — Fixed-scope AI tools & automation`;

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: titleDefault,
    template: `%s · ${site.companyShort}`,
  },
  description,
  openGraph: {
    title: titleDefault,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.companyName,
    url: siteOrigin(),
    email: site.email,
    description,
    areaServed: ["US", "EU"],
    priceRange: "$1000-$3000+",
    sameAs: [site.linkedinUrl, site.xUrl],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
