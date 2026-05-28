import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Offer } from "@/components/offer";
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
      <main id="main-content">
        <Hero />
        <Offer />
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
