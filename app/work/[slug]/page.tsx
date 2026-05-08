import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.oneLiner,
  };
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <>
      <Nav />
      <main className="container max-w-3xl py-16">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All selected work
        </Link>

        <article className="mt-10">
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            {study.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            {study.oneLiner}
          </p>

          <Card className="mt-12 flex flex-col items-start gap-4 border-dashed bg-muted/30 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Play className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">Product walkthrough</div>
                <div className="text-sm text-muted-foreground">
                  Screen recording of flows, UI, and integration touchpoints
                </div>
              </div>
            </div>
            <Button asChild variant="outline">
              <a href={study.loomUrl}>Watch recording</a>
            </Button>
          </Card>

          <Section title="Challenge">
            <p>{study.problem}</p>
          </Section>

          <Section title="Solution">
            <ul className="space-y-3">
              {study.solution.map((step) => (
                <li key={step} className="flex gap-3">
                  <span
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Stack">
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Timeline">
            <dl className="space-y-4">
              {study.timeline.map((item) => (
                <div
                  key={`${item.day}-${item.text}`}
                  className="grid grid-cols-[80px_1fr] gap-4"
                >
                  <dt className="text-sm font-medium tabular-nums text-foreground">
                    {item.day}
                  </dt>
                  <dd className="text-muted-foreground leading-relaxed">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Impact">
            <ul className="space-y-3">
              {study.outcome.map((line) => (
                <li key={line} className="flex gap-3">
                  <span
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </Section>

          <p className="mt-12 rounded-md border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Disclaimer · </span>
            {study.notes}
          </p>

          <div className="mt-16 flex flex-col items-start gap-4 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold">Similar initiative on your roadmap?</div>
              <div className="text-sm text-muted-foreground">
                Same seven-day engagement model and fixed fee structure.
              </div>
            </div>
            <Button asChild>
              <a href={site.calcomUrl}>
                Book an intro
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 text-pretty leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
