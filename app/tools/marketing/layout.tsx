import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth dashboard",
  robots: { index: false, follow: false },
};

export default function ToolsMarketingShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
