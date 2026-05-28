import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Q2Banner } from "@/components/q2-banner";
import { ScopeEstimator } from "@/components/scope-estimator";
import { siteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fixed-Scope Build Estimator",
  description:
    "Free tool: answer five questions and get a recommended AxisForge Labs package tier ($1,000 / $1,500 / $3,000) with in-scope and out-of-scope guidance.",
  openGraph: {
    title: "Fixed-Scope Build Estimator · AxisForge Labs",
    url: `${siteOrigin()}/tools/scope-estimator`,
  },
};

export default function ScopeEstimatorPage() {
  return (
    <>
      <Nav />
      <Q2Banner />
      <main id="main-content" className="container py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Free tool</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Fixed-scope build estimator
          </h1>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Five questions. We recommend a package tier and spell out what is likely in or out of
            scope — before you book a call. No email gate.
          </p>
        </div>
        <div className="mt-12">
          <ScopeEstimator />
        </div>
      </main>
      <Footer />
    </>
  );
}
