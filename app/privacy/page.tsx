import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.companyName} handles personal data on getyourproductbuilt.com.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="container max-w-3xl py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {legal.privacyUpdated} · {legal.dataController}
        </p>

        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none space-y-8 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
          <section>
            <h2>Who we are</h2>
            <p>
              {site.companyName} operates {site.domain}. For privacy questions, contact us at{" "}
              <a href={`mailto:${legal.contactEmail}`} className="text-foreground underline-offset-4 hover:underline">
                {legal.contactEmail}
              </a>
              .
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong className="text-foreground">Contact and booking data</strong> — when you email us or book a call
                through Cal.com, we receive the information you submit (name, email, and any notes you add).
              </li>
              <li>
                <strong className="text-foreground">Technical logs</strong> — our hosting provider may process standard
                server logs (IP address, browser type, pages visited) for security and reliability.
              </li>
              <li>
                <strong className="text-foreground">Theme preference</strong> — if you toggle light/dark mode, that
                choice may be stored locally in your browser.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell personal data. We do not run third-party advertising trackers on this marketing site.
            </p>
          </section>

          <section>
            <h2>How we use data</h2>
            <ul>
              <li>Respond to inquiries and schedule discovery calls</li>
              <li>Prepare proposals and deliver contracted work</li>
              <li>Protect the site from abuse and maintain uptime</li>
            </ul>
          </section>

          <section>
            <h2>Third-party services</h2>
            <p>
              Booking links route to Cal.com. Email may be handled by your and our respective mail providers. Client
              projects may use additional processors (cloud hosting, AI APIs, etc.) defined in your statement of work—not
              on this public site.
            </p>
          </section>

          <section>
            <h2>Retention</h2>
            <p>
              Sales correspondence is kept as long as needed for business records and legal obligations. You may request
              deletion of marketing contact data where no active contract applies.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, or restrict processing of your
              personal data. Email{" "}
              <a href={`mailto:${legal.contactEmail}`} className="text-foreground underline-offset-4 hover:underline">
                {legal.contactEmail}
              </a>{" "}
              to exercise these rights.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              We may update this policy when our practices change. The date at the top reflects the latest revision.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
