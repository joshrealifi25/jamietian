"use client";

import { MarqueeStrip } from "@/components/motion/MarqueeStrip";
import { AGENT } from "@/config/agent";

const LOCATIONS = [...AGENT.serviceAreas];

export function MarqueeSection() {
  return (
    <section className="bg-black py-6 border-y border-white/5 overflow-hidden">
      <MarqueeStrip
        items={LOCATIONS}
        speed={35}
        separator="  ·  "
        className="text-white/40"
        itemClassName="rf-display text-[clamp(1rem,2.5vw,2rem)] whitespace-nowrap"
      />
    </section>
  );
}
