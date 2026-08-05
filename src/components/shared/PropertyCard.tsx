"use client";

import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const isSold = property.status === "sold";

  return (
    <Link href={`/listings/${property.slug}`} className="group block">
      <div className="relative overflow-hidden bg-rf-surface transition-transform duration-500 ease-out hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image}
            alt={`${property.address}, ${property.city}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {isSold && (
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase bg-rf-accent text-rf-page font-medium">
                Sold
              </span>
            </div>
          )}

          <div className="absolute bottom-4 left-4">
            <span className="text-xl font-serif font-light text-white drop-shadow-lg">
              {property.priceFormatted}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-serif text-lg text-rf-heading mb-1 group-hover:text-rf-accent transition-colors duration-300">
            {property.address}
          </h3>
          <p className="text-sm text-rf-muted mb-3">
            {property.city}, {property.state} {property.zip}
          </p>
          <div className="flex items-center gap-4 text-xs text-rf-muted tracking-wider uppercase">
            <span>{property.beds} Bed</span>
            <span className="w-px h-3 bg-rf-border" />
            <span>{property.baths} Bath</span>
            <span className="w-px h-3 bg-rf-border" />
            <span>{property.sqft.toLocaleString()} Sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PropertyGrid({
  properties,
  columns = 3,
}: {
  properties: Property[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : ""
      } gap-6 md:gap-8`}
    >
      {properties.map((property) => (
        <PropertyCard key={property.slug} property={property} />
      ))}
    </div>
  );
}
