import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSoldProperties } from "@/lib/trestle";
import { SoldPageContent } from "./SoldPageContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sold Properties",
  description:
    "Explore Jamie Tian's sold properties across Los Angeles. See her track record in Beverly Hills, Manhattan Beach, Sherman Oaks, and beyond.",
};

export default async function SoldPropertiesPage() {
  const soldProperties = await getSoldProperties();
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <SoldPageContent properties={soldProperties} />
      </main>
      <SiteFooter />
    </>
  );
}
