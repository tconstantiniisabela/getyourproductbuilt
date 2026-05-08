import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";
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

const description =
  "Ship one scoped AI tool or internal product in seven days—fixed scope, fixed price ($1,500). Built for solo SaaS founders who need clarity, speed, and zero retainers.";

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

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: `${site.name} — Ship your next AI build in 7 days`,
    template: `%s · ${site.name}`,
  },
  description,
  openGraph: {
    title: `${site.name} — Ship your next AI build in 7 days`,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Ship your next AI build in 7 days`,
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
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
