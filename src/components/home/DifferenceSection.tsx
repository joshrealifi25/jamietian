"use client";

import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

const features = [
  {
    number: "01",
    title: "Strategic Judgment",
    description:
      "Jamie anticipates market shifts and positions clients advantageously — timing, leverage, and risk management, not just price.",
  },
  {
    number: "02",
    title: "Access & Exposure",
    description:
      "Curated exposure, off-market opportunities, and introductions that extend beyond traditional listings.",
  },
  {
    number: "03",
    title: "Execution Under Pressure",
    description:
      "Complex transactions require calm leadership. Jamie brings clarity and control to high-pressure negotiations.",
  },
  {
    number: "04",
    title: "Aligned Interests",
    description:
      "A long-term lens on every relationship — decisions you feel confident about at closing, and years later.",
  },
];

export function DifferenceSection() {
  return (
    <section className="bg-black py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <Reveal>
          <span className="rf-block-name text-white">The Advantage</span>
        </Reveal>

        <div className="pt-20">
          <h2 className="rf-display text-white mb-6 max-w-5xl">
            <LineReveal delay={0}>What Working With</LineReveal>
            <LineReveal delay={0.08}>Jamie Means</LineReveal>
          </h2>

          <div className="h-px bg-rf-accent/40 mb-12 md:mb-16" />

          {/* 2x2 feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <Reveal key={feature.number} delay={i * 0.08}>
                <div className="bg-[#0a0a0a] border border-white/5 p-6 sm:p-8 md:p-12 flex flex-col justify-between min-h-[200px] md:min-h-[280px] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-rf-accent/30 hover:bg-rf-accent/[0.03]">
                  <span className="rf-display text-white/10 select-none">
                    {feature.number}
                  </span>

                  <div className="mt-auto">
                    <p className="rf-eyebrow text-white mb-3">
                      {feature.title}
                    </p>
                    <p className="rf-body-sm text-white/60">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
