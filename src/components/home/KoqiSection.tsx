"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { LineReveal } from "@/components/motion/LineReveal";
import { HorizontalReveal } from "@/components/motion/HorizontalReveal";
import { WipeReveal } from "@/components/motion/WipeReveal";

const fameEase = [0.83, 0, 0.17, 1] as const;

const features = [
  "Pricing Intelligence",
  "Market Analytics",
  "Competitive Analysis",
];

export function KoqiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.03, 0.03, 0]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["20%", "80%"]);
  const bigTextX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-20 md:py-48 relative overflow-hidden"
    >
      {/* Scroll-linked grid background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: gridOpacity,
          backgroundImage:
            "linear-gradient(rgba(26,191,209,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(26,191,209,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Moving glow orb */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rf-accent/5 blur-[150px] pointer-events-none"
        style={{ left: glowX }}
      />

      {/* Giant background text that drifts */}
      <motion.span
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-sans font-800 text-white/[0.015] select-none pointer-events-none whitespace-nowrap leading-none"
        style={{ x: bigTextX }}
      >
        INTELLIGENCE
      </motion.span>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        <motion.span
          className="rf-block-name text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: fameEase }}
          viewport={{ once: true }}
        >
          Technology
        </motion.span>

        <div className="pt-20">
          <HorizontalReveal from="left" distance={120}>
            <h2 className="rf-display text-white mb-12">
              <LineReveal>Powered by</LineReveal>
              <LineReveal delay={0.08}>Intelligence</LineReveal>
            </h2>
          </HorizontalReveal>

          <HorizontalReveal from="right" distance={80}>
            <p className="rf-body-serif text-white/70 max-w-2xl mb-12">
              As broker-owner of RealiFi Realty, Jamie pairs fourteen years of
              market instinct with Koqi, an AI-powered pricing and market
              intelligence platform, so clients decide with data &mdash; not
              guesswork.
            </p>
          </HorizontalReveal>

          {/* Feature pills — wipe reveal from left */}
          <WipeReveal direction="left">
            <div className="flex flex-wrap gap-4 mb-12">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="rf-eyebrow text-white/40 flex items-center gap-3 border border-white/10 px-5 py-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rf-accent inline-block" />
                  {feature}
                </span>
              ))}
            </div>
          </WipeReveal>

          <HorizontalReveal from="left" distance={40}>
            <Link
              href="https://koqi.ai"
              target="_blank"
              rel="noopener"
              className="rf-btn-ghost text-white border-white"
            >
              Explore Koqi <span aria-hidden="true">&rarr;</span>
            </Link>
          </HorizontalReveal>
        </div>
      </div>
    </section>
  );
}
