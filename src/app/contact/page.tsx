import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Jamie Tian. Whether you're buying, selling, or exploring your options, Jamie is here to help you make your next move in Los Angeles real estate.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <ContactPageContent />
      </main>
      <SiteFooter />
    </>
  );
}
