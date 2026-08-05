import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "RealiFi Realty terms and conditions of use.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-rf-page pt-32 md:pt-40 pb-20">
        <div className="px-6 md:px-12 lg:px-20 xl:px-32 max-w-3xl mx-auto">
          <p className="rf-eyebrow mb-6">Legal</p>
          <h1 className="rf-display-sm mb-4">Terms &amp; Conditions</h1>
          <p className="text-sm text-rf-muted mb-12">
            Effective: August 27, 2023
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="rf-h3 mb-4">Acceptance of Terms</h2>
              <p className="rf-body text-rf-text/80">
                By accessing and using the RealiFi Realty website, you accept
                and agree to be bound by these Terms and Conditions. If you do
                not agree to these terms, please do not use this website.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Use License</h2>
              <p className="rf-body text-rf-text/80">
                Permission is granted to temporarily access the materials on
                RealiFi Realty&apos;s website for personal, non-commercial
                transitory viewing only. This is the grant of a license, not a
                transfer of title, and under this license you may not modify or
                copy the materials, use the materials for any commercial
                purpose, attempt to reverse engineer any software contained on
                the website, remove any copyright or other proprietary
                notations, or transfer the materials to another person.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Disclaimer</h2>
              {/* LEGAL REVIEW NEEDED: Have legal counsel verify all disclaimer language */}
              <p className="rf-body text-rf-text/80">
                The materials on RealiFi Realty&apos;s website are provided on
                an &apos;as is&apos; basis. RealiFi Realty makes no warranties,
                expressed or implied, and hereby disclaims all other warranties
                including implied warranties or conditions of merchantability,
                fitness for a particular purpose, or non-infringement of
                intellectual property. Information about real estate listings,
                prices, and property details is deemed reliable but not
                guaranteed.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Limitations</h2>
              <p className="rf-body text-rf-text/80">
                In no event shall RealiFi Realty or its suppliers be liable for
                any damages arising out of the use or inability to use the
                materials on the website, even if RealiFi Realty has been
                notified of the possibility of such damage. Liability is
                disclaimed to the maximum extent permitted by applicable law.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Dispute Resolution</h2>
              <p className="rf-body text-rf-text/80">
                Any disputes arising from these terms shall be governed by and
                construed in accordance with the laws of the State of California.
                Disputes shall be resolved through binding arbitration
                administered by the American Arbitration Association under the
                Federal Arbitration Act. Class actions are prohibited.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Modifications</h2>
              <p className="rf-body text-rf-text/80">
                RealiFi Realty may revise these Terms at any time without notice.
                By using this website, you are agreeing to be bound by the
                then-current version of these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Termination</h2>
              <p className="rf-body text-rf-text/80">
                RealiFi Realty reserves the right to terminate access to the
                website at any time, without notice, for any reason.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Contact</h2>
              <p className="rf-body text-rf-text/80">
                Questions about these terms should be directed to:
              </p>
              <div className="mt-4 space-y-1">
                <p className="rf-body-sm">RealiFi Realty, Inc.</p>
                <p className="rf-body-sm">{SITE.address.full}</p>
                <p className="rf-body-sm">{SITE.email}</p>
                <p className="rf-body-sm">{SITE.phoneFormatted}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
