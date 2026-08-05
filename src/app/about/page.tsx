import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageSection } from "@/components/layout/PageSection";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { HorizontalReveal } from "@/components/motion/HorizontalReveal";
import { WipeReveal } from "@/components/motion/WipeReveal";
import { CountUp } from "@/components/motion/CountUp";
import { CTASection } from "@/components/shared/MaterialTextureSection";
import { AGENT } from "@/config/agent";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About ${AGENT.name}`,
  description: AGENT.description,
  openGraph: {
    title: `About ${AGENT.name}`,
    description: AGENT.description,
  },
};

const bio = [
  "Jamie Tian is the CEO and Broker-Owner of RealiFi Realty and a leading real estate advisor in Southern California. With 14 years of experience, she helps buyers, sellers, and investors navigate complex decisions with clarity, confidence, and strong results.",
  "Licensed at 20 while attending UCLA, Jamie built her business in one of the most competitive real estate markets in the country. In 2017, she was named a National Association of REALTORS® 30 Under 30 honoree — one of 30 individuals selected nationwide each year for early success and industry impact. Her work consistently places her among the top 1.5% of real estate professionals nationwide, and among the top 1% in Los Angeles.",
  "Jamie is known for her ability to read markets, anticipate shifts, and negotiate decisively when timing matters most. Clients value her calm approach, honest guidance, and focus on protecting long-term value.",
  "In addition to leading RealiFi Realty, Jamie served as the 2024 and 2025 National President of the Asian Real Estate Association of America and has held leadership roles with the National Association of REALTORS®, the California Association of REALTORS®, and the Greater Los Angeles Association of REALTORS®. That experience gives her a rare vantage point on market cycles, policy, and the forces that shape real estate beyond any single transaction.",
  "Fluent in Chinese and connected across both local and global networks, Jamie works with clients who want thoughtful strategy, clear communication, and representation they can trust.",
];

const stats = [
  AGENT.stats.salesVolume,
  AGENT.stats.homesSold,
  AGENT.stats.yearsExperience,
  AGENT.stats.ranking,
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        {/* Hero with full-bleed property image */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <Image
            src="/images/hero/hero-slide-3.jpg"
            alt="California luxury property"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-16 md:pb-24 w-full">
            <div className="max-w-5xl">
              <Reveal>
                <p className="rf-eyebrow text-white/70 mb-6">About {AGENT.firstName}</p>
              </Reveal>
              <h1 className="rf-display text-white max-w-4xl">
                <LineReveal delay={0.1}>{AGENT.name}</LineReveal>
              </h1>
              <Reveal delay={0.2}>
                <p className="rf-body text-white/70 max-w-2xl mt-8">
                  {AGENT.title} &mdash; {SITE.dre.agentDisplay}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Bio with headshot */}
        <PageSection className="bg-rf-surface" width="lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-5 lg:col-span-4">
              <HorizontalReveal from="left" distance={80}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={AGENT.headshot}
                    alt={AGENT.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {AGENT.languages.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {AGENT.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rf-eyebrow text-rf-muted border border-rf-border px-4 py-2"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                )}
              </HorizontalReveal>
            </div>
            <div className="md:col-span-7 lg:col-span-8">
              <HorizontalReveal from="right" distance={80}>
                <p className="rf-eyebrow mb-4">The Story</p>
                <h2 className="rf-h2 mb-8">
                  Strategy, discretion, and results.
                </h2>
                {bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="rf-body mb-6">
                    {paragraph}
                  </p>
                ))}
              </HorizontalReveal>
            </div>
          </div>
        </PageSection>

        {/* Stats band */}
        <section className="bg-black text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="rf-display-sm text-white mb-2"
                />
                <p className="rf-eyebrow text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials */}
        <PageSection className="bg-rf-page" width="lg">
          <Reveal>
            <p className="rf-eyebrow mb-4">Credentials &amp; Honors</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="rf-h2 max-w-2xl mb-16">
              A track record that travels beyond any single transaction.
            </h2>
          </Reveal>
          <div className="space-y-0">
            {AGENT.credentials.map((credential, i) => (
              <HorizontalReveal
                key={credential}
                from={i % 2 === 0 ? "left" : "right"}
                distance={80}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-t border-rf-border first:border-t-0">
                  <div className="md:col-span-1">
                    <span className="text-rf-accent font-serif text-3xl font-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-11">
                    <p className="rf-h3">{credential}</p>
                  </div>
                </div>
              </HorizontalReveal>
            ))}
          </div>
        </PageSection>

        {/* Cinematic image break */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image
            src="/images/properties/1825-beverly-glen.jpg"
            alt="Beverly Glen luxury property"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* License block */}
        <PageSection className="bg-rf-surface" width="sm">
          <div className="text-center">
            <Reveal>
              <div className="rf-divider-accent mx-auto mb-8" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="rf-h2 mb-6">Licensed &amp; Trusted</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="rf-body max-w-xl mx-auto mb-4">
                {AGENT.name} is a licensed California real estate broker with{" "}
                {AGENT.brokerage.legalName}, headquartered in Beverly Hills.
              </p>
            </Reveal>
            <WipeReveal direction="up">
              <div className="inline-block border border-rf-border px-8 py-5 mt-4">
                <p className="rf-eyebrow mb-2">
                  California Department of Real Estate
                </p>
                <p className="text-rf-heading font-serif text-xl tracking-wide">
                  {AGENT.name} &middot; {SITE.dre.agentDisplay}
                </p>
                <p className="text-rf-muted font-serif text-base tracking-wide mt-1">
                  {AGENT.brokerage.legalName} &middot; {SITE.dre.brokerageDisplay}
                </p>
              </div>
            </WipeReveal>
            <Reveal delay={0.4}>
              <p className="rf-body-sm max-w-lg mx-auto mt-8">
                {SITE.address.full}
              </p>
            </Reveal>
          </div>
        </PageSection>

        <CTASection
          eyebrow="Let's Connect"
          heading="Work with Jamie."
          body="Whether you are buying, selling, or weighing your options, start with a conversation — clear guidance, no pressure."
          primaryCta="Get in Touch"
          primaryHref="/contact"
          secondaryCta="Read Client Stories"
          secondaryHref="/testimonials"
        />
      </main>
      <SiteFooter />
    </>
  );
}
