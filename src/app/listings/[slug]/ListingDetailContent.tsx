"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageSection } from "@/components/layout/PageSection";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { WipeReveal } from "@/components/motion/WipeReveal";
import { CTASection } from "@/components/shared/MaterialTextureSection";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { PropertyGallery } from "@/components/shared/PropertyGallery";
import type { Property } from "@/types/property";
import { SITE } from "@/lib/constants";

function isSold(property: Property): property is Property & { soldPrice: number; soldPriceFormatted: string; soldDate: string } {
  return property.status === "sold";
}

export function ListingDetailContent({
  property,
  related,
}: {
  property: Property;
  related: Property[];
}) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8]);

  const sold = isSold(property);

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative min-h-[75vh] md:min-h-[85vh] flex items-end overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
            <Image
              src={property.image}
              alt={`${property.address}, ${property.city}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-16 md:pb-24 w-full">
            <div className="max-w-5xl">
              {/* Back link */}
              <Reveal>
                <Link
                  href={sold ? "/properties/sold" : "/listings"}
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors duration-300 mb-8"
                >
                  <span className="w-6 h-px bg-current" />
                  {sold ? "Back to Sold" : "Back to Listings"}
                </Link>
              </Reveal>

              {/* Status badge */}
              <Reveal delay={0.05}>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`inline-block px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase font-semibold ${
                      sold
                        ? "bg-rf-accent text-rf-page"
                        : "bg-white/10 text-white backdrop-blur-sm border border-white/20"
                    }`}
                  >
                    {sold ? "Sold" : "Active"}
                  </span>
                  {property.neighborhood && (
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">
                      {property.neighborhood}
                    </span>
                  )}
                </div>
              </Reveal>

              {/* Address */}
              <h1 className="rf-display text-white max-w-4xl">
                <LineReveal delay={0.1}>{property.address}</LineReveal>
              </h1>

              <Reveal delay={0.2}>
                <p className="text-white/50 text-sm tracking-wider mt-4">
                  {property.city}, {property.state} {property.zip}
                </p>
              </Reveal>

              {/* Price + Stats */}
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12 mt-8">
                  <div>
                    {sold && (
                      <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1">
                        Sale Price
                      </p>
                    )}
                    <p className="font-sans font-extrabold text-3xl md:text-5xl text-white tracking-tight">
                      {sold ? property.soldPriceFormatted : property.priceFormatted}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-xs tracking-[0.2em] uppercase text-white/60 pb-1.5">
                    <span>{property.beds} Bed</span>
                    <span className="w-px h-4 bg-white/20" />
                    <span>{property.baths} Bath</span>
                    <span className="w-px h-4 bg-white/20" />
                    <span>{property.sqft.toLocaleString()} Sqft</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Details */}
        <PageSection className="bg-rf-surface" width="md">
          {/* Details render instantly — this is the product, not a brand moment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <div>
                <p className="rf-eyebrow mb-4">Property Details</p>
                <h2 className="rf-h2 mb-6">
                  {sold ? "About this sale." : "About this property."}
                </h2>
                {property.description && (
                  <p className="rf-body mb-8">{property.description}</p>
                )}
                {!property.description && (
                  <p className="rf-body mb-8">
                    {sold
                      ? `This ${property.beds}-bedroom, ${property.baths}-bathroom residence in ${property.neighborhood || property.city} was successfully sold with Jamie Tian's representation. The ${property.sqft.toLocaleString()} square foot home reflects her commitment to strategic pricing and decisive negotiation.`
                      : `This ${property.beds}-bedroom, ${property.baths}-bathroom residence in ${property.neighborhood || property.city} offers ${property.sqft.toLocaleString()} square feet of refined living. Positioned with intention and priced with intelligence.`}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="space-y-0">
                {[
                  { label: "Address", value: property.address },
                  {
                    label: "Location",
                    value: `${property.city}, ${property.state} ${property.zip}`,
                  },
                  ...(property.neighborhood
                    ? [{ label: "Neighborhood", value: property.neighborhood }]
                    : []),
                  { label: "Bedrooms", value: String(property.beds) },
                  { label: "Bathrooms", value: String(property.baths) },
                  {
                    label: "Square Feet",
                    value: property.sqft.toLocaleString(),
                  },
                  {
                    label: sold ? "Sale Price" : "List Price",
                    value: sold
                      ? property.soldPriceFormatted
                      : property.priceFormatted,
                  },
                  ...(sold ? [{ label: "Year Sold", value: property.soldDate }] : []),
                  { label: "Status", value: sold ? "Sold" : "Active" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between py-4 border-b border-rf-border"
                  >
                    <span className="text-xs tracking-[0.2em] uppercase text-rf-muted">
                      {item.label}
                    </span>
                    <span className="text-rf-heading font-serif text-lg">
                      {item.value}
                    </span>
                  </div>
                ))}

                {/* Listing agent */}
                {property.agent && (
                  <div className="mt-10 border border-rf-border bg-rf-page p-6">
                    <p className="rf-eyebrow mb-5">
                      {!sold
                        ? "Listed By"
                        : property.agent.representation === "buyer"
                          ? "Represented the Buyer"
                          : property.agent.representation === "both"
                            ? "Represented Buyer & Seller"
                            : "Represented the Seller"}
                    </p>
                    <div className="flex items-center gap-5">
                      {property.agent.photo && (
                        <Link
                          href="/about"
                          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border border-rf-border block"
                          aria-label={`About ${property.agent.name}`}
                        >
                          <Image
                            src={property.agent.photo}
                            alt={property.agent.name}
                            fill
                            className="object-cover object-top"
                            sizes="80px"
                          />
                        </Link>
                      )}
                      <div className="min-w-0">
                        <p className="font-serif text-xl text-rf-heading">
                          {property.agent.slug ? (
                            <Link
                              href="/about"
                              className="hover:text-rf-accent transition-colors"
                            >
                              {property.agent.name}
                            </Link>
                          ) : (
                            property.agent.name
                          )}
                        </p>
                        {property.agent.role && (
                          <p className="text-xs tracking-[0.15em] uppercase text-rf-muted mt-0.5">
                            {property.agent.role}
                          </p>
                        )}
                        <div className="mt-2 space-y-0.5 text-sm text-rf-muted">
                          {property.agent.phone && (
                            <p>
                              <a
                                href={`tel:${property.agent.phone.replace(/\D/g, "")}`}
                                className="hover:text-rf-accent transition-colors"
                              >
                                {property.agent.phone}
                              </a>
                            </p>
                          )}
                          {property.agent.email && (
                            <p className="truncate">
                              <a
                                href={`mailto:${property.agent.email}`}
                                className="hover:text-rf-accent transition-colors"
                              >
                                {property.agent.email}
                              </a>
                            </p>
                          )}
                          {property.agent.license && (
                            <p className="text-xs">{property.agent.license}</p>
                          )}
                          {property.agent.slug && (
                            <p className="pt-1">
                              <Link
                                href="/about"
                                className="text-xs font-medium text-rf-accent hover:underline"
                              >
                                About {property.agent.name.split(" ")[0]} &rarr;
                              </Link>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </PageSection>

        {/* Photo gallery */}
        {property.images && property.images.length > 1 && (
          <PageSection className="bg-rf-page" width="xl">
            <p className="rf-eyebrow mb-4">Gallery</p>
            <h2 className="rf-h2 mb-12">
              {property.images.length} photos.
            </h2>
            <PropertyGallery images={property.images} address={property.address} />
          </PageSection>
        )}

        {/* Image break */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image
            src={property.image}
            alt={property.address}
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* CTA for active listings */}
        {!sold && (
          <PageSection className="bg-rf-page" width="sm">
            <WipeReveal direction="up">
              <div className="text-center">
                <div className="rf-divider-accent mx-auto mb-8" />
                <h2 className="rf-h2 mb-6">Interested in this property?</h2>
                <p className="rf-body max-w-xl mx-auto mb-10">
                  Schedule a private showing or get pricing intelligence powered
                  by Koqi. Our agents are ready to help you make an informed
                  decision.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact" className="rf-btn-primary">
                    Schedule a Showing
                  </Link>
                  <a href={SITE.phoneHref} className="rf-btn-ghost">
                    Call {SITE.phoneFormatted}
                  </a>
                </div>
              </div>
            </WipeReveal>
          </PageSection>
        )}

        {/* Sold CTA */}
        {sold && (
          <PageSection className="bg-rf-page" width="sm">
            <WipeReveal direction="up">
              <div className="text-center">
                <div className="rf-divider-accent mx-auto mb-8" />
                <h2 className="rf-h2 mb-6">
                  Want results like this?
                </h2>
                <p className="rf-body max-w-xl mx-auto mb-10">
                  Jamie combines strategic pricing, elevated marketing, and
                  decisive negotiation to deliver exceptional outcomes for her
                  clients.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/sell" className="rf-btn-primary">
                    Sell with Jamie
                  </Link>
                  <Link href="/buy" className="rf-btn-ghost">
                    Buy with Jamie
                  </Link>
                </div>
              </div>
            </WipeReveal>
          </PageSection>
        )}

        {/* Related Properties */}
        {related.length > 0 && (
          <PageSection className="bg-rf-surface" width="xl">
            <Reveal>
              <p className="rf-eyebrow mb-4">More Properties</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="rf-h2 max-w-2xl mb-16">Explore more.</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
            <Reveal delay={0.3}>
              <div className="mt-16 text-center">
                <Link href="/listings" className="rf-btn-text">
                  View All Listings
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </Reveal>
          </PageSection>
        )}

        <CTASection
          eyebrow="Let's Connect"
          heading="Ready to make a move?"
          body="Whether you are buying, selling, or exploring your options, Jamie is here to help you move with confidence."
          primaryCta="Get in Touch"
          primaryHref="/contact"
          secondaryCta="Call Jamie"
          secondaryHref={SITE.phoneHref}
        />
      </main>
      <SiteFooter />
    </>
  );
}
