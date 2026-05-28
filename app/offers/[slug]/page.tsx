import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { OfferPageContent } from "@/components/offer-page-content";
import { getOffer, productizedOffers } from "@/lib/offers";
import { siteOrigin } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return productizedOffers.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const offer = getOffer(params.slug);
  if (!offer) return {};
  return {
    title: `${offer.title} — ${offer.price} fixed`,
    description: offer.bluf,
    openGraph: {
      title: `${offer.title} · ${offer.price} fixed · AxisForge Labs`,
      description: offer.headline,
      url: `${siteOrigin()}/offers/${offer.slug}`,
    },
  };
}

export default function OfferPage({ params }: { params: Params }) {
  const offer = getOffer(params.slug);
  if (!offer) notFound();

  return (
    <>
      <Nav />
      <OfferPageContent offer={offer} />
      <Footer />
    </>
  );
}
