"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { PageSection } from "@/components/layout/PageSection";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { PropertyCard } from "@/components/shared/PropertyCard";
import type { SoldProperty } from "@/types/property";

// Leaflet needs the browser — skip SSR for the map only.
const SoldMap = dynamic(
  () => import("@/components/shared/SoldMap").then((m) => m.SoldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] md:h-[540px] border border-rf-border bg-rf-page animate-pulse" />
    ),
  },
);

const MAX_FILTERS = 6;

export function SoldPageContent({ properties }: { properties: SoldProperty[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Condense filters to the top cities by sale count; everything else
  // stays reachable under "All".
  const cities = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of properties) {
      if (p.city) counts.set(p.city, (counts.get(p.city) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_FILTERS)
      .map(([city]) => city);
  }, [properties]);

  const filteredProperties =
    activeFilter === "All"
      ? properties
      : properties.filter((p) => p.city === activeFilter);

  return (
    <>
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/images/properties/10390-la-grange.jpg"
          alt="Recently sold California luxury property"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-16 md:pb-24 w-full">
          <div className="max-w-5xl">
            <Reveal>
              <p className="rf-eyebrow text-white/70 mb-6">Track Record</p>
            </Reveal>
            <h1 className="rf-display text-white mb-6">
              <LineReveal>Properties we&apos;ve sold.</LineReveal>
            </h1>
            <Reveal delay={0.2}>
              <p className="rf-body text-white/70 max-w-2xl">
                Every sale tells a story of strategy, timing, and trust. Explore
                our portfolio of successfully closed transactions across
                California.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sold map — every pin is a closed deal */}
      <PageSection className="bg-rf-surface pb-0 pt-12 md:pt-16" width="full">
        <p className="rf-eyebrow text-rf-accent mb-3">Every Pin, A Closed Deal</p>
        <h2 className="rf-h2 mb-8">Our sales across California.</h2>
        <div className="relative z-0 isolate">
          <SoldMap properties={properties} />
        </div>
        <p className="text-xs text-rf-muted mt-3">
          Hover a pin to preview the sale — click through for the full story.
        </p>
      </PageSection>

      {/* Filter pills — top markets */}
      <PageSection className="bg-rf-surface pb-0 pt-12 md:pt-16" width="full">
        <div className="flex flex-wrap items-center gap-3">
          {["All", ...cities].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setActiveFilter(city)}
              className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors duration-300 ${
                activeFilter === city
                  ? "bg-rf-accent text-rf-page"
                  : "border border-rf-border text-rf-muted hover:border-rf-accent hover:text-rf-accent"
              }`}
            >
              {city}
            </button>
          ))}
          <span className="text-xs text-rf-muted ml-1">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1 ? "sale" : "sales"}
          </span>
        </div>
      </PageSection>

      {/* Sold grid — renders instantly, no scroll-triggered animation */}
      <PageSection className="bg-rf-surface" width="full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <p className="rf-body text-center py-16">
            No sales in this market yet — check back soon.
          </p>
        )}

        <Reveal delay={0.2}>
          <div className="text-center mt-16 py-12 border border-rf-border bg-rf-page">
            <p className="rf-body-sm mb-4">Want results like these?</p>
            <Link href="/sell" className="rf-btn-primary">
              Sell with Jamie
            </Link>
          </div>
        </Reveal>
      </PageSection>
    </>
  );
}
