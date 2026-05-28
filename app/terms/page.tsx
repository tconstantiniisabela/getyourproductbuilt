import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of ${site.domain} and ${site.companyName} marketing materials.`,
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="container max-w-3xl py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {legal.termsUpdated} · {legal.dataController}
        </p>

        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none space-y-8 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
          <section>
            <h2>Agreement</h2>
            <p>
              By using {site.domain}, you agree to these terms. Paid engagements are governed by a separate written
              statement of work (SOW) or proposal signed by both parties—those documents control delivery, payment, and
              intellectual property for client work.
            </p>
          </section>

          <section>
            <h2>Website use</h2>
            <ul>
              <li>This site is for informational and booking purposes only.</li>
              <li>Do not attempt unauthorized access to internal tools or APIs.</li>
              <li>Content may change without notice; package prices on the site are indicative until confirmed in writing.</li>
            </ul>
          </section>

          <section>
            <h2>Services</h2>
            <p>
              {site.companyName} provides fixed-scope custom software and automation builds. Timelines, deliverables,
              deposits, acceptance criteria, and support windows are defined per engagement—not by this page alone.
            </p>
          </section>

          <section>
            <h2>Intellectual property</h2>
            <p>
              Unless your SOW states otherwise, client engagements deliver working software and documentation into your
              accounts. You receive usage rights to project-specific deliverables upon payment. {site.companyName} retains
              rights to pre-existing tools, frameworks, and general know-how not unique to your project.
            </p>
          </section>

          <section>
            <h2>Confidentiality</h2>
            <p>
              Mutual NDAs are available before detailed scoping. Case studies and metrics on this site may be anonymized
              or composite; named references require client authorization.
            </p>
          </section>

          <section>
            <h2>Disclaimer</h2>
            <p>
              Site content is provided &ldquo;as is&rdquo; without warranties. Outcomes described in case studies are
              illustrative; your results depend on scope, data quality, and adoption.
            </p>
          </section>

          <section>
            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, {site.companyName} is not liable for indirect or consequential
              damages arising from use of this website. Liability under a signed SOW is capped as stated in that
              agreement.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href={`mailto:${legal.contactEmail}`} className="text-foreground underline-offset-4 hover:underline">
                {legal.contactEmail}
              </a>
              . See also our{" "}
              <a href="/privacy" className="text-foreground underline-offset-4 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
