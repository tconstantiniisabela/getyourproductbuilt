import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productizedOffers } from "@/lib/offers";
import { Card } from "@/components/ui/card";

export function ProductizedOffersGrid() {
  return (
    <section id="offers" className="border-t border-border">
      <div className="container py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Productized offers
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Fixed scope, fixed price — pick the shape that matches
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Three builds we ship repeatedly. The Lead Qualifier is the default starting point for
            B2B revenue teams; Inbox Triage and Weekly Report cover support and ops. Each has a
            written in/out list, a set timeline, and a single price.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {productizedOffers.map((offer) => {
            const isHero = offer.slug === "lead-qualifier";
            return (
              <Card
                key={offer.slug}
                className={`relative flex flex-col p-8 ${
                  isHero ? "border-primary shadow-md ring-1 ring-primary/20" : ""
                }`}
              >
                {isHero ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Start here
                  </span>
                ) : null}
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {offer.price} fixed · {offer.timeline.split(" ")[0]} days
                </p>
                <h3 className="mt-3 text-xl font-semibold">{offer.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {offer.headline}
                </p>
                <Link
                  href={`/offers/${offer.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {isHero ? "View Lead Qualifier scope" : "View full scope"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Not sure which tier?{" "}
          <Link
            href="/tools/scope-estimator"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Try the free scope estimator
          </Link>
        </p>
      </div>
    </section>
  );
}
