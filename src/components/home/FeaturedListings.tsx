"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Listing } from "@/types/property";
import { TiltCard } from "@/components/motion/TiltCard";
import { HorizontalReveal } from "@/components/motion/HorizontalReveal";
import { LineReveal } from "@/components/motion/LineReveal";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export function FeaturedListings({ listings }: { listings: Listing[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="rf-section bg-rf-surface py-20 md:py-48 relative">
      <div className="px-6 md:px-12">
        {/* Header */}
        <HorizontalReveal from="left" distance={100}>
          <p className="rf-eyebrow text-rf-accent mb-4">LISTINGS</p>
          <h2 className="rf-display text-white mb-4">
            <LineReveal>FEATURED</LineReveal>
            <LineReveal delay={0.1}>LISTINGS</LineReveal>
          </h2>
        </HorizontalReveal>

        <motion.div
          className="h-px bg-white/10 mb-16 md:mb-24"
          style={{ scaleX: lineScaleX, transformOrigin: "left" }}
        />

        {/* Tilting card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {listings.map((listing, i) => (
            <TiltCard
              key={listing.slug}
              from={i % 2 === 0 ? "left" : "right"}
              tilt={8}
            >
              <Link href={`/listings/${listing.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={listing.address}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ transitionTimingFunction: "cubic-bezier(0.83, 0, 0.17, 1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="pt-5 pb-6">
                  <p className="font-sans font-bold text-xl text-white">
                    {formatPrice(listing.price)}
                  </p>
                  <p className="rf-eyebrow text-white mt-2">
                    {listing.address}
                  </p>
                  <p className="rf-body-sm text-rf-muted mt-1">
                    {listing.beds} Beds &middot; {listing.baths} Baths &middot;{" "}
                    {listing.sqft.toLocaleString()} Sqft
                  </p>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>

        {/* CTA */}
        <HorizontalReveal from="right" distance={60}>
          <div className="mt-16 md:mt-20">
            <Link href="/listings" className="rf-btn-ghost text-white border-white">
              View All Listings &rarr;
            </Link>
          </div>
        </HorizontalReveal>
      </div>
    </section>
  );
}
