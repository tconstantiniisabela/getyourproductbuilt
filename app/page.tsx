import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Offer } from "@/components/offer";
import { WorkGrid } from "@/components/work-grid";
import { HowIWork } from "@/components/how-i-work";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Offer />
        <WorkGrid />
        <HowIWork />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
