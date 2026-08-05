"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CountUp } from "@/components/motion/CountUp";
import { LineReveal } from "@/components/motion/LineReveal";
import { HorizontalReveal } from "@/components/motion/HorizontalReveal";
import { AGENT } from "@/config/agent";

const stats = [
  AGENT.stats.salesVolume,
  AGENT.stats.homesSold,
  AGENT.stats.yearsExperience,
  AGENT.stats.ranking,
];

const fameEase = [0.83, 0, 0.17, 1] as const;

export function BeliefSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const dividerScaleX = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="rf-section bg-black text-white py-20 md:py-48 relative"
    >
      <motion.span
        className="rf-block-name text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: fameEase }}
        viewport={{ once: true }}
      >
        About
      </motion.span>

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <HorizontalReveal from="left" distance={80}>
          <h2 className="rf-h3 text-white mb-10 max-w-3xl">
            <LineReveal delay={0}>
              Most agents help you transact.
            </LineReveal>
            <LineReveal delay={0.1}>
              Jamie helps you decide.
            </LineReveal>
          </h2>
        </HorizontalReveal>

        <HorizontalReveal from="right" distance={60}>
          <motion.p
            className="rf-body-sm text-white/60 max-w-xl mb-12 md:mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: fameEase }}
            viewport={{ once: true }}
          >
            Jamie Tian has guided buyers, sellers, and investors through
            fourteen years of Los Angeles market cycles. Clients trust her for
            strategic pricing, decisive negotiation, and calm leadership when
            timing matters most &mdash; so every move protects long-term value.
          </motion.p>
        </HorizontalReveal>

        {/* Scroll-driven divider line */}
        <motion.div
          className="h-px bg-white/10 mb-12 md:mb-20"
          style={{ scaleX: dividerScaleX, transformOrigin: "left" }}
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-6 md:gap-12">
          {stats.map((stat, i) => (
            <HorizontalReveal
              key={stat.label}
              from={i % 2 === 0 ? "left" : "right"}
              distance={60}
            >
              <div className="font-sans font-800 uppercase tracking-[-0.048em] leading-none text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-3">
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="font-sans font-800 uppercase tracking-[-0.048em] leading-none text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                />
              </div>
              <p className="rf-eyebrow text-white/40">{stat.label}</p>
            </HorizontalReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
