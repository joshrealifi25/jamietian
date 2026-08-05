"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { LineReveal } from "@/components/motion/LineReveal";
import { AGENT } from "@/config/agent";

const stats = [
  AGENT.stats.salesVolume,
  AGENT.stats.homesSold,
  AGENT.stats.yearsExperience,
  AGENT.stats.ranking,
];

export function BeliefSection() {
  return (
    <section className="rf-section bg-black text-white py-20 md:py-32 relative">
      <Reveal>
        <span className="rf-block-name text-white">About</span>
      </Reveal>

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="rf-h3 text-white mb-10 max-w-3xl">
          <LineReveal delay={0}>
            Most agents help you transact.
          </LineReveal>
          <LineReveal delay={0.1}>
            Jamie helps you decide.
          </LineReveal>
        </h2>

        <Reveal delay={0.15}>
          <p className="rf-body-sm text-white/60 max-w-xl mb-12 md:mb-16">
            Jamie Tian has guided buyers, sellers, and investors through
            fourteen years of Los Angeles market cycles. Clients trust her for
            strategic pricing, decisive negotiation, and calm leadership when
            timing matters most &mdash; so every move protects long-term value.
          </p>
        </Reveal>

        <div className="h-px bg-white/10 mb-12 md:mb-16" />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-6 md:gap-12">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="font-sans font-800 uppercase tracking-[-0.048em] leading-none text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-3">
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="font-sans font-800 uppercase tracking-[-0.048em] leading-none text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                />
              </div>
              <p className="rf-eyebrow text-white/40">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
