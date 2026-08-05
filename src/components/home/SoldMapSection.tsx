"use client";

import Image from "next/image";
import Link from "next/link";
import { LineReveal } from "@/components/motion/LineReveal";
import { HorizontalReveal } from "@/components/motion/HorizontalReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import type { SoldProperty } from "@/types/property";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

function SoldCard({ property }: { property: SoldProperty }) {
  return (
    <Link href={`/listings/${property.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.address}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ transitionTimingFunction: "cubic-bezier(0.83, 0, 0.17, 1)" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-0 right-0 bg-rf-accent text-black px-3 py-1.5 text-xs font-bold uppercase">
          SOLD
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-sans font-bold text-2xl text-white">
            {formatPrice(property.soldPrice)}
          </p>
          <p className="rf-eyebrow text-white mt-2">{property.address}</p>
          <p className="rf-body-sm text-rf-muted mt-1">
            {property.city}, {property.state}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function SoldMapSection({ properties }: { properties: SoldProperty[] }) {
  const featured = properties.slice(0, 6);

  return (
    <div className="bg-rf-page">
      <section className="rf-section py-20 md:py-32">
        <div className="px-6 md:px-12">
          <HorizontalReveal from="left" distance={100}>
            <p className="rf-eyebrow text-rf-accent mb-4">SOLD PROPERTIES</p>
            <h2 className="rf-display text-white mb-16 md:mb-24 max-w-3xl">
              <LineReveal delay={0.1}>PROVEN</LineReveal>
              <LineReveal delay={0.2}>RESULTS</LineReveal>
            </h2>
          </HorizontalReveal>

          {/* Sold grid — mirrors the featured listings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featured.map((property, i) => (
              <TiltCard
                key={property.slug}
                from={i % 2 === 0 ? "left" : "right"}
                tilt={8}
              >
                <SoldCard property={property} />
              </TiltCard>
            ))}
          </div>

          <HorizontalReveal from="right" distance={60}>
            <div className="mt-16 md:mt-20">
              <Link
                href="/properties/sold"
                className="rf-btn-ghost text-white border-white"
              >
                View All Sold &rarr;
              </Link>
            </div>
          </HorizontalReveal>
        </div>
      </section>
    </div>
  );
}
