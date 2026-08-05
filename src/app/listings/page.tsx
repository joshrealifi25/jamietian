import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getActiveListings } from "@/lib/trestle";
import { ListingsPageContent } from "./ListingsPageContent";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Featured Listings",
  description:
    "Browse Jamie Tian's featured property listings across Los Angeles. Find your next home in Beverly Hills, Sherman Oaks, the Westside, and beyond.",
};

export default async function ListingsPage() {
  const listings = await getActiveListings();
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <ListingsPageContent listings={listings} />
      </main>
      <SiteFooter />
    </>
  );
}
