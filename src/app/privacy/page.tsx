import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "RealiFi Realty privacy policy. How we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-rf-page pt-32 md:pt-40 pb-20">
        <div className="px-6 md:px-12 lg:px-20 xl:px-32 max-w-3xl mx-auto">
          <p className="rf-eyebrow mb-6">Legal</p>
          <h1 className="rf-display-sm mb-4">Privacy Policy</h1>
          <p className="text-sm text-rf-muted mb-12">
            Effective: August 27, 2023 &middot; Last updated: June 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="rf-h3 mb-4">Information We Collect</h2>
              <p className="rf-body text-rf-text/80">
                RealiFi Realty, Inc. collects personal information that you
                voluntarily provide when using our website, including your name,
                email address, phone number, and any message content submitted
                through our contact forms. We also collect standard web analytics
                data including browser type, IP address, pages visited, and
                referring URLs.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">How We Use Your Information</h2>
              <p className="rf-body text-rf-text/80">
                We use the information we collect to deliver our real estate
                services, communicate with you about properties and offerings,
                respond to your inquiries, inform you about services from
                RealiFi Realty and affiliated partners, and improve our website
                and services.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Information Sharing</h2>
              <p className="rf-body text-rf-text/80">
                RealiFi Realty does not sell, rent, or lease customer lists or
                personal information to third parties. We may share data with
                trusted partners for the purposes of email delivery, customer
                support, and statistical analysis. These partners are required
                to maintain the confidentiality of your information.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Cookies and Tracking</h2>
              <p className="rf-body text-rf-text/80">
                Our website uses cookies to track user behavior, store
                preferences, and improve the browsing experience. You may choose
                to disable cookies through your browser settings, although this
                may limit certain features of the website.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Security</h2>
              <p className="rf-body text-rf-text/80">
                RealiFi Realty uses SSL encryption for sensitive transactions and
                employs reasonable security measures to protect personal
                information. However, no method of electronic transmission or
                storage is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Your Rights</h2>
              <p className="rf-body text-rf-text/80">
                You may request deletion of your personal information, subject to
                certain exceptions including ongoing transactions, fraud
                prevention, legal compliance requirements, and legitimate
                research purposes. California residents may have additional
                rights under the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section>
              <h2 className="rf-h3 mb-4">Contact Us</h2>
              {/* LEGAL REVIEW NEEDED: Verify all privacy policy language with legal counsel */}
              <p className="rf-body text-rf-text/80">
                For questions about this privacy policy or to exercise your data
                rights, contact us at:
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
