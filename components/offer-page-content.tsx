import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProductizedOffer } from "@/lib/offers";
import { offerLoomUrl } from "@/lib/offers";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { FaqJsonLd } from "@/components/faq-json-ld";
import { LoomWalkthrough } from "@/components/loom-embed";
import { Q2Banner } from "@/components/q2-banner";

export function OfferPageContent({ offer }: { offer: ProductizedOffer }) {
  const loomUrl = offerLoomUrl(offer);

  return (
    <>
      <FaqJsonLd faqs={offer.faqs} />
      <Q2Banner />
      <main id="main-content" className="container max-w-3xl py-16">
        <Link
          href="/#pricing"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All packages
        </Link>

        <article className="mt-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Fixed-scope offer · {offer.price}
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            {offer.title}
          </h1>
          <p className="mt-4 text-lg font-medium text-foreground">{offer.headline}</p>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            {offer.bluf}
          </p>

          <dl className="mt-8 grid gap-4 rounded-lg border border-border bg-muted/20 p-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Investment
              </dt>
              <dd className="mt-1 text-xl font-semibold">{offer.price} fixed</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Timeline
              </dt>
              <dd className="mt-1 text-xl font-semibold">{offer.timeline}</dd>
            </div>
          </dl>

          <div className="mt-12">
            <LoomWalkthrough url={loomUrl} title={`${offer.title} walkthrough`} />
          </div>

          <Section title="Who this is for">
            <p>{offer.forWho}</p>
          </Section>

          <Section title="What you get">
            <ul className="space-y-3">
              {offer.included.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="What you don't get">
            <p className="mb-4 text-sm">
              Scope firewall — additions require a separate change order after kickoff.
            </p>
            <ul className="space-y-3">
              {offer.excluded.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="AxisForge vs agency vs DIY">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-3 pr-4 font-semibold text-foreground" scope="col" />
                    <th className="py-3 pr-4 font-semibold text-primary" scope="col">
                      AxisForge Labs
                    </th>
                    <th className="py-3 pr-4 font-semibold text-muted-foreground" scope="col">
                      Agency retainer
                    </th>
                    <th className="py-3 font-semibold text-muted-foreground" scope="col">
                      DIY no-code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {offer.comparison.map((row) => (
                    <tr key={row.label} className="border-b border-border/60">
                      <th className="py-3 pr-4 font-medium text-foreground" scope="row">
                        {row.label}
                      </th>
                      <td className="py-3 pr-4 text-foreground">{row.axisForge}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{row.agency}</td>
                      <td className="py-3 text-muted-foreground">{row.diy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="FAQ">
            <dl className="space-y-6">
              {offer.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-foreground">{faq.question}</dt>
                  <dd className="mt-2 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <p className="mt-8 text-sm text-muted-foreground">
            Related case study:{" "}
            <Link
              href={`/work/${offer.caseStudySlug}`}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Full delivery narrative
            </Link>
            {" · "}
            <Link
              href="/tools/scope-estimator"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Not sure which tier?
            </Link>
          </p>

          <div className="mt-16 flex flex-col items-start gap-4 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold">{site.ctaLabel}</div>
              <div className="text-sm text-muted-foreground">
                15 minutes — confirm fit, walk scope, recommend tier if different.
              </div>
            </div>
            <Button asChild size="lg">
              <ExternalLink href={site.calcomUrl}>
                {site.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </ExternalLink>
            </Button>
          </div>
        </article>
      </main>
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
      <div className="mt-4 text-pretty leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
