"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LineReveal } from "@/components/motion/LineReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollParallaxText } from "@/components/motion/ScrollParallaxText";

const fameEase = [0.83, 0, 0.17, 1] as const;

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const accentLineWidth = useTransform(scrollYProgress, [0.05, 0.25], ["0%", "100%"]);
  const bgNumberX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={sectionRef} className="bg-black py-20 md:py-48 relative overflow-hidden">
      {/* Giant background number */}
      <motion.span
        className="absolute top-1/2 left-1/2 -translate-y-1/2 text-[30vw] font-sans font-800 text-white/[0.02] select-none pointer-events-none leading-none"
        style={{ x: bgNumberX }}
      >
        04
      </motion.span>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.span
          className="rf-block-name text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: fameEase }}
          viewport={{ once: true }}
        >
          The Advantage
        </motion.span>

        <div className="pt-20">
          <ScrollParallaxText speed={0.2}>
            <h2 className="rf-display text-white mb-6 max-w-5xl">
              <LineReveal delay={0}>What Working With</LineReveal>
              <LineReveal delay={0.08}>Jamie Means</LineReveal>
            </h2>
          </ScrollParallaxText>

          <motion.div
            className="h-px bg-rf-accent/40 mb-12 md:mb-20"
            style={{ width: accentLineWidth }}
          />

          {/* 2x2 feature grid with tilting cards from alternating sides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <TiltCard
                key={feature.number}
                from={i % 2 === 0 ? "left" : "right"}
                tilt={4}
              >
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
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
