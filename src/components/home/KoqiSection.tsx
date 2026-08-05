"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

const features = [
  "Pricing Intelligence",
  "Market Analytics",
  "Competitive Analysis",
];

export function KoqiSection() {
  return (
    <section className="bg-black text-white py-20 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        <Reveal>
          <span className="rf-block-name text-white">Technology</span>
        </Reveal>

        <div className="pt-20">
          <h2 className="rf-display text-white mb-12">
            <LineReveal>Powered by</LineReveal>
            <LineReveal delay={0.08}>Intelligence</LineReveal>
          </h2>

          <Reveal delay={0.1}>
            <p className="rf-body-serif text-white/70 max-w-2xl mb-12">
              As broker-owner of RealiFi Realty, Jamie pairs fourteen years of
              market instinct with Koqi, an AI-powered pricing and market
              intelligence platform, so clients decide with data &mdash; not
              guesswork.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
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
          </Reveal>

          <Reveal delay={0.3}>
            <Link
              href="https://koqi.ai"
              target="_blank"
              rel="noopener"
              className="rf-btn-ghost text-white border-white"
            >
              Explore Koqi <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
