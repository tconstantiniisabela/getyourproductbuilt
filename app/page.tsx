import { Nav } from "@/components/nav";
import { Q2Banner } from "@/components/q2-banner";
import { Hero } from "@/components/hero";
import { WhatWeBuild } from "@/components/what-we-build";
import { HowAiIsUsed } from "@/components/how-ai-is-used";
import { NotAFit } from "@/components/not-a-fit";
import { Offer } from "@/components/offer";
import { ProductizedOffersGrid } from "@/components/productized-offers-grid";
import { WorkGrid } from "@/components/work-grid";
import { HowWeWork } from "@/components/how-we-work";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Q2Banner />
      <main id="main-content">
        <Hero />
        <WhatWeBuild />
        <HowAiIsUsed />
        <NotAFit />
        <Offer />
        <ProductizedOffersGrid />
        <WorkGrid />
        <HowWeWork />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
