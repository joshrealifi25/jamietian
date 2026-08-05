import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HomeHero } from "@/components/home/HomeHero";
import { BeliefSection } from "@/components/home/BeliefSection";
import { AudiencePathways } from "@/components/home/AudiencePathways";
import { ClientProof } from "@/components/home/ClientProof";
import { SoldMapSection } from "@/components/home/SoldMapSection";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { DifferenceSection } from "@/components/home/DifferenceSection";
import { KoqiSection } from "@/components/home/KoqiSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { getActiveListings, getSoldProperties } from "@/lib/trestle";

export const revalidate = 900;

export default async function Home() {
  const [listings, soldProperties] = await Promise.all([
    getActiveListings(),
    getSoldProperties(),
  ]);
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HomeHero />
        <BeliefSection />
        <MarqueeSection />
        <AudiencePathways />
        <ClientProof />
        <FeaturedListings listings={listings} />
        <SoldMapSection properties={soldProperties} />
        <DifferenceSection />
        <KoqiSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
