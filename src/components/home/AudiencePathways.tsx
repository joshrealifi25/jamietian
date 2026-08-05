"use client";

import { PinnedReveal } from "@/components/motion/PinnedReveal";

const slides = [
  {
    image: "/images/properties/2170-sunset-plaza.jpg",
    alt: "Sunset Plaza luxury residence",
    label: "For Buyers",
    heading: "Know the Price\nBefore You Offer",
    body: "Jamie routinely knows about homes coming to market before they can be found online — and structures offers that win without overpaying.",
  },
  {
    image: "/images/properties/1830-westholme.jpg",
    alt: "Westholme Avenue luxury estate",
    label: "For Sellers",
    heading: "Price with\nConfidence",
    body: "Strategic pricing, disciplined launch timing, and curated exposure. Jamie's listings are engineered to create competition for your home.",
  },
  {
    image: "/images/properties/1750-camino-palmero.jpg",
    alt: "Camino Palmero luxury property",
    label: "For Investors",
    heading: "Protect\nLong-Term Value",
    body: "From 1031 exchanges to remote sales managed end-to-end, Jamie brings clear judgment and disciplined execution to complex transactions.",
  },
];

export function AudiencePathways() {
  return (
    <PinnedReveal
      slides={slides}
      className="bg-black"
    />
  );
}
