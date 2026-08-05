"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AGENT } from "@/config/agent";

const FAME_EASE = [0.83, 0, 0.17, 1] as const;

function EntranceLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: FAME_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HomeHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/hero-main.jpg"
        alt="Luxury California residence"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center items-center text-center px-6">
        <EntranceLine delay={0.2}>
          <p className="rf-eyebrow mb-8 text-white/70">{AGENT.heroMarkets}</p>
        </EntranceLine>

        <h1 className="rf-display max-w-5xl mb-8">
          <EntranceLine delay={0.35}>
            Calm strategy for
          </EntranceLine>
          <EntranceLine delay={0.5}>
            your highest-stakes
          </EntranceLine>
          <EntranceLine delay={0.65}>
            decisions
          </EntranceLine>
        </h1>

        <EntranceLine delay={0.85}>
          <p className="rf-body-sm max-w-xl mb-10 text-white/60">
            {AGENT.name} &mdash; {AGENT.title}. $200M+ in closed sales,
            14 years in Los Angeles&apos;s most competitive markets, and
            representation trusted for discretion, clarity, and results.
          </p>
        </EntranceLine>

        <EntranceLine delay={1.0}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link href="/contact" className="rf-btn-ghost text-white border-white">
              Get a Free Home Valuation
            </Link>
            <Link href="/properties/sold" className="rf-btn-primary text-white">
              View Recent Sales
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </EntranceLine>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="rf-eyebrow text-[10px] tracking-widest text-white/60">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-rf-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
