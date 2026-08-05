"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

const slides = [
  {
    image: "/images/properties/2170-sunset-plaza.jpg",
    alt: "Sunset Plaza luxury residence",
    label: "For Buyers",
    heading: "Know the Price Before You Offer",
    body: "Jamie routinely knows about homes coming to market before they can be found online — and structures offers that win without overpaying.",
  },
  {
    image: "/images/properties/1830-westholme.jpg",
    alt: "Westholme Avenue luxury estate",
    label: "For Sellers",
    heading: "Price with Confidence",
    body: "Strategic pricing, disciplined launch timing, and curated exposure. Jamie's listings are engineered to create competition for your home.",
  },
  {
    image: "/images/properties/1750-camino-palmero.jpg",
    alt: "Camino Palmero luxury property",
    label: "For Investors",
    heading: "Protect Long-Term Value",
    body: "From 1031 exchanges to remote sales managed end-to-end, Jamie brings clear judgment and disciplined execution to complex transactions.",
  },
];

export function AudiencePathways() {
  return (
    <section className="bg-black py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {slides.map((slide, i) => (
            <Reveal key={slide.label} delay={i * 0.12}>
              <div className="group">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="rf-eyebrow text-white/60 mb-3">{slide.label}</p>
                <h3 className="font-sans font-800 text-xl md:text-2xl uppercase tracking-tight text-white mb-3">
                  {slide.heading}
                </h3>
                <p className="rf-body-sm text-white/50">{slide.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
