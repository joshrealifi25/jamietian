"use client";

import Link from "next/link";
import Image from "next/image";
import { PageSection } from "@/components/layout/PageSection";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { WipeReveal } from "@/components/motion/WipeReveal";
import { PropertyCard } from "@/components/shared/PropertyCard";
import type { Listing } from "@/types/property";

export function ListingsPageContent({ listings }: { listings: Listing[] }) {
  return (
    <>
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/images/properties/1432-camden.jpg"
          alt="Featured California luxury property"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-16 md:pb-24 w-full">
          <div className="max-w-5xl">
            <Reveal>
              <p className="rf-eyebrow text-white/70 mb-6">Current Listings</p>
            </Reveal>
            <h1 className="rf-display text-white mb-6">
              <LineReveal>Featured properties.</LineReveal>
            </h1>
            <Reveal delay={0.2}>
              <p className="rf-body text-white/70 max-w-2xl">
                Each property is positioned with intention. Priced with data,
                presented with care, and marketed to create momentum.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <PageSection className="bg-rf-surface" width="full">
        {/* Inventory renders instantly — no scroll-triggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {listings.map((listing) => (
            <PropertyCard key={listing.slug} property={listing} />
          ))}
        </div>

        {listings.length < 4 && (
          <Reveal delay={0.2}>
            <div className="text-center mt-16 py-12 border border-rf-border bg-rf-page">
              <p className="rf-body-sm mb-4">
                Looking for something specific?
              </p>
              <Link href="/contact" className="rf-btn-primary text-xs">
                Tell Us What You Need
              </Link>
            </div>
          </Reveal>
        )}
      </PageSection>

      <PageSection className="bg-rf-page border-t border-rf-border" width="sm">
        <WipeReveal direction="up">
          <div className="text-center">
            <h2 className="rf-h2 mb-6">See what we&apos;ve already sold.</h2>
            <p className="rf-body text-rf-muted mb-8">
              Explore our track record of successfully closed transactions
              across California.
            </p>
            <Link href="/properties/sold" className="rf-btn-ghost">
              View Sold Properties
            </Link>
          </div>
        </WipeReveal>
      </PageSection>
    </>
  );
}
