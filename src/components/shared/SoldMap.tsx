"use client";

import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { SoldProperty } from "@/types/property";

const PIN = L.divIcon({
  className: "",
  html: `<div class="rf-map-pin"><span></span></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export function SoldMap({ properties }: { properties: SoldProperty[] }) {
  const router = useRouter();
  const pinned = properties.filter(
    (p): p is SoldProperty & { lat: number; lng: number } =>
      typeof p.lat === "number" && typeof p.lng === "number",
  );

  if (pinned.length === 0) return null;

  // Center on the densest market (median coordinate ≈ LA metro) at a
  // neighborhood-legible zoom; outliers stay reachable by panning out.
  const median = (xs: number[]) =>
    [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
  const center: [number, number] = [
    median(pinned.map((p) => p.lat)),
    median(pinned.map((p) => p.lng)),
  ];

  return (
    <div className="relative h-[420px] md:h-[540px] overflow-hidden border border-rf-border">
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ background: "#0b1114" }}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {pinned.map((p) => (
          <Marker
            key={p.slug}
            position={[p.lat, p.lng]}
            icon={PIN}
            eventHandlers={{
              click: () => router.push(`/listings/${p.slug}`),
              keypress: () => router.push(`/listings/${p.slug}`),
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={1}
              className="rf-map-tooltip"
            >
              <div className="w-52">
                {/* Leaflet tooltips are plain DOM — use img, not next/image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.address}
                  className="w-full h-28 object-cover block"
                />
                <div className="p-3 bg-[#0b1114]">
                  <p className="font-sans font-bold text-sm text-white">
                    {p.soldPriceFormatted}
                  </p>
                  <p className="text-[11px] text-white/80 mt-0.5">{p.address}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">
                    {p.city} · Sold {p.soldDate}
                  </p>
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
