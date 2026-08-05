"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SITE } from "@/lib/constants";
import { LineReveal } from "@/components/motion/LineReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 0.15]);

  return (
    <section
      ref={ref}
      className="relative bg-rf-accent text-rf-text-dark flex flex-col justify-center overflow-hidden"
    >
      {/* Scroll-linked radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Scale-on-scroll background */}
      <motion.div
        className="absolute inset-0 bg-rf-accent"
        style={{ scale: bgScale }}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease }}
        className="rf-block-name absolute top-8 left-6 md:left-12 lg:left-20 text-rf-text-dark/60 z-10"
      >
        CONTACT
      </motion.span>

      <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20 md:py-44 flex flex-col items-center text-center relative z-10">
        <h2 className="rf-display-mega text-rf-text-dark max-w-6xl">
          <LineReveal delay={0.2} className="block">
            <span className="text-rf-text-dark">WHAT IS YOUR</span>
          </LineReveal>
          <LineReveal delay={0.35} className="block">
            <span className="text-rf-text-dark">HOME WORTH?</span>
          </LineReveal>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-12 md:mt-16"
        >
          <Link
            href="/contact"
            className="rf-btn-ghost border-rf-text-dark text-rf-text-dark hover:bg-rf-text-dark hover:text-rf-accent"
          >
            Get a Free Valuation
          </Link>
          <Link
            href="/about"
            className="rf-btn-ghost border-rf-text-dark text-rf-text-dark hover:bg-rf-text-dark hover:text-rf-accent"
          >
            Meet Jamie
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="mt-8"
        >
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="rf-body-sm text-rf-text-dark/70 underline underline-offset-4 decoration-rf-text-dark/30 hover:text-rf-text-dark hover:decoration-rf-text-dark transition-colors duration-300"
          >
            Schedule a consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
