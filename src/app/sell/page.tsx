import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageSection } from "@/components/layout/PageSection";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { HorizontalReveal } from "@/components/motion/HorizontalReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { WipeReveal } from "@/components/motion/WipeReveal";
import { CTASection } from "@/components/shared/MaterialTextureSection";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sell Your Home in Los Angeles | Listing Agent Jamie Tian",
  description:
    "Sell your Los Angeles home with confidence. Jamie Tian delivers strategic pricing, elevated marketing, and decisive negotiation to maximize your result in Beverly Hills, Sherman Oaks, the Westside, and across LA.",
  keywords: [
    "sell home Los Angeles",
    "Beverly Hills listing agent",
    "Los Angeles home selling",
    "Jamie Tian listing agent",
    "luxury home marketing",
    "sell house in LA",
  ],
  openGraph: {
    title: "Sell Your Home in Los Angeles | Jamie Tian",
    description:
      "Strategic pricing, elevated marketing, and decisive negotiation to maximize your result.",
  },
  alternates: {
    canonical: `${SITE.url}/sell`,
  },
};

const sellerFaqs = [
  {
    question: "How does Jamie price my home for sale?",
    answer:
      "Jamie pairs fourteen years of Los Angeles pricing instinct with Koqi, an AI-powered pricing intelligence platform, to analyze comparable sales, market velocity, buyer demand, and neighborhood-specific trends. This data-driven approach goes beyond a traditional CMA to recommend a pricing strategy that maximizes offers and final sale price.",
  },
  {
    question: "How long does it take to sell a home in Los Angeles?",
    answer:
      "Days on market varies by price point and location. In competitive areas like Beverly Hills and the Westside, well-priced homes under $3 million typically sell within 30 to 45 days — Jamie's listings have drawn multiple offers within the first weekend. Luxury properties above $5 million average 90 to 180 days. Strategic pricing from day one is the most important factor.",
  },
  {
    question: "What does Jamie charge to sell my home?",
    answer:
      "Commission is discussed transparently during your initial consultation and is tailored to the scope of marketing and representation your property requires. Under the 2024 NAR settlement rules, seller and buyer agent compensation are negotiated separately. You get full clarity on all costs before you sign a listing agreement.",
  },
  {
    question: "What marketing does Jamie provide for listings?",
    answer:
      "Every listing receives professional architectural photography, cinematic video tours, targeted digital advertising campaigns, premium MLS placement, and strategic broker outreach. Jamie also coordinates staging, repairs, and renovations end-to-end — including for out-of-town sellers — and offers private marketing channels for luxury properties.",
  },
];

const sellerPillars = [
  {
    number: "01",
    title: "Pricing Strategy",
    description:
      "Powered by Koqi intelligence, we analyze comparable sales, market velocity, and buyer demand to position your home at the price that generates the strongest response.",
  },
  {
    number: "02",
    title: "Listing Preparation",
    description:
      "We guide you on staging, repairs, and presentation. Every detail is considered to ensure your home shows at its absolute best from day one.",
  },
  {
    number: "03",
    title: "Elevated Marketing",
    description:
      "Professional photography, cinematic video, targeted digital campaigns, and premium listing placement. Your home is presented the way it deserves to be seen.",
  },
  {
    number: "04",
    title: "Expert Negotiation",
    description:
      "Multiple offers, contingencies, inspection requests. We navigate every term with precision to protect your equity and your timeline.",
  },
];

const timeline = [
  {
    phase: "Weeks 1 & 2",
    title: "Strategy & Preparation",
    description:
      "Market analysis, pricing strategy, property assessment. We develop a tailored launch plan and coordinate any pre-listing improvements.",
  },
  {
    phase: "Weeks 2 & 3",
    title: "Production & Marketing",
    description:
      "Professional photography, staging consultation, listing copy, and marketing asset creation. Your home is prepared for maximum impact.",
  },
  {
    phase: "Weeks 3 & 4",
    title: "Launch & Showings",
    description:
      "Strategic listing launch, open houses, private showings, and targeted buyer outreach. We create urgency and generate offers.",
  },
  {
    phase: "Week 4+",
    title: "Negotiation & Close",
    description:
      "Offer review, negotiation strategy, escrow management, and closing coordination. We handle every detail through to the finish.",
  },
];

const sellFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sellerFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function SellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sellFaqJsonLd) }}
      />
      <SiteHeader />
      <main id="main-content">
        {/* Hero with full-bleed property image */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <Image
            src="/images/hero/hero-slide-1.jpg"
            alt="California luxury property exterior"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-16 md:pb-24 w-full">
            <div className="max-w-5xl">
              <Reveal>
                <p className="rf-eyebrow text-white/70 mb-6">Seller Representation</p>
              </Reveal>
              <h1 className="rf-display text-white max-w-4xl">
                <LineReveal delay={0.1}>Price with confidence.</LineReveal>
                <LineReveal delay={0.2}>Launch with intention.</LineReveal>
                <LineReveal delay={0.3}>Sell with leverage.</LineReveal>
              </h1>
              <Reveal delay={0.4}>
                <p className="rf-body text-white/70 max-w-2xl mt-8">
                  Your home is more than a listing. It is a financial milestone,
                  a personal chapter, and a strategic opportunity. Jamie treats
                  it that way.
                </p>
              </Reveal>
              <HorizontalReveal from="left" distance={80}>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Link href="/contact" className="rf-btn-primary text-white">
                    Plan Your Sale
                  </Link>
                  <Link href="/properties/sold" className="rf-btn-ghost text-white border-white/30">
                    See Our Results
                  </Link>
                </div>
              </HorizontalReveal>
            </div>
          </div>
        </section>

        <PageSection className="bg-rf-surface" width="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <HorizontalReveal from="left" distance={100}>
              <div>
                <p className="rf-eyebrow mb-4">Pricing Intelligence</p>
                <h2 className="rf-h2 mb-6">
                  Price is not a guess. It is a strategy.
                </h2>
                <p className="rf-body mb-6">
                  As broker-owner of RealiFi Realty, Jamie is equipped with{" "}
                  <a
                    href={SITE.koqiUrl}
                    target="_blank"
                    rel="noopener"
                    className="text-rf-accent hover:text-rf-accent-soft transition-colors duration-300 underline underline-offset-4 decoration-rf-accent/30"
                  >
                    Koqi
                  </a>{" "}
                  pricing intelligence, giving you a clear, informed view of
                  your home&apos;s true market position.
                </p>
                <p className="rf-body-sm">
                  Koqi analyzes comparable sales, market trends, buyer
                  activity, and neighborhood dynamics to recommend a pricing
                  strategy designed to maximize your result, not just match
                  the market.
                </p>
              </div>
            </HorizontalReveal>
            <HorizontalReveal from="right" distance={100}>
              <div className="space-y-6">
                {[
                  {
                    label: "Comparable Analysis",
                    detail: "Live comp data beyond the basic CMA",
                  },
                  {
                    label: "Market Velocity",
                    detail:
                      "Days on market, absorption rates, and demand signals",
                  },
                  {
                    label: "Price Positioning",
                    detail:
                      "Strategic pricing that attracts the right buyers at the right time",
                  },
                  {
                    label: "Outcome Modeling",
                    detail:
                      "Informed projections for your specific property",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-l-2 border-rf-accent/40 pl-5 py-1"
                  >
                    <p className="text-rf-heading text-sm font-medium tracking-wide uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="rf-body-sm">{item.detail}</p>
                  </div>
                ))}
              </div>
            </HorizontalReveal>
          </div>
        </PageSection>

        {/* Cinematic image break */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image
            src="/images/properties/1750-camino-palmero.jpg"
            alt="Camino Palmero luxury property"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <PageSection className="bg-rf-page" width="xl">
          <Reveal>
            <p className="rf-eyebrow mb-4">Our Approach</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="rf-h2 max-w-2xl mb-16">
              Every listing is a campaign. Every detail matters.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {sellerPillars.map((pillar, i) => (
              <TiltCard
                key={pillar.number}
                from={i % 2 === 0 ? "left" : "right"}
                tilt={6}
              >
                <div className="group">
                  <span className="text-rf-accent font-serif text-3xl font-light">
                    {pillar.number}
                  </span>
                  <div className="rf-divider-accent mt-4 mb-5" />
                  <h3 className="rf-h3 mb-3">{pillar.title}</h3>
                  <p className="rf-body-sm">{pillar.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </PageSection>

        {/* Accent image break */}
        <div className="relative h-[35vh] md:h-[45vh] overflow-hidden">
          <Image
            src="/images/properties/10933-wellworth.jpg"
            alt="Wellworth luxury property"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <PageSection className="bg-rf-surface">
          <Reveal>
            <p className="rf-eyebrow mb-4">The Timeline</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="rf-h2 max-w-2xl mb-16">
              From strategy session to sold sign.
            </h2>
          </Reveal>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <HorizontalReveal
                key={item.phase}
                from={i % 2 === 0 ? "left" : "right"}
                distance={100}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-10 border-t border-rf-border">
                  <div className="md:col-span-2">
                    <span className="rf-eyebrow">{item.phase}</span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="rf-h3">{item.title}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="rf-body">{item.description}</p>
                  </div>
                </div>
              </HorizontalReveal>
            ))}
          </div>
        </PageSection>

        <PageSection className="bg-rf-page" width="md">
          <WipeReveal direction="up">
            <div className="text-center">
              <div className="rf-divider-accent mx-auto mb-8" />
              <h2 className="rf-h2 mb-6">
                Jamie&apos;s sellers do not just close. They close well.
              </h2>
              <p className="rf-body max-w-xl mx-auto">
                Strategic pricing, elevated marketing, and skilled negotiation
                consistently deliver results that exceed expectations. View our
                recent closings to see the proof.
              </p>
              <div className="mt-8">
                <Link href="/properties/sold" className="rf-btn-text">
                  View Sold Properties
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </WipeReveal>
        </PageSection>

        <PageSection className="bg-rf-surface">
          <Reveal>
            <p className="rf-eyebrow mb-4">Common Questions</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="rf-h2 max-w-2xl mb-12">
              What California home sellers ask us most.
            </h2>
          </Reveal>
          <div className="max-w-3xl space-y-4">
            {sellerFaqs.map((faq, i) => (
              <HorizontalReveal
                key={i}
                from={i % 2 === 0 ? "left" : "right"}
                distance={60}
              >
                <details className="group border border-rf-border p-6">
                  <summary className="cursor-pointer list-none flex items-center justify-between">
                    <h3 className="font-serif text-lg text-rf-heading pr-4">
                      {faq.question}
                    </h3>
                    <span className="text-rf-muted transition-transform group-open:rotate-45 flex-shrink-0 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="rf-body-sm mt-4 text-rf-text/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </HorizontalReveal>
            ))}
          </div>
        </PageSection>

        <CTASection
          eyebrow="Ready to Sell?"
          heading="Plan your sale with confidence."
          body="Schedule a private consultation. Jamie will walk through your property, the market, and the strategy that makes sense for your goals."
          primaryCta="Plan Your Sale"
          primaryHref="/contact"
          secondaryCta="Call Jamie"
          secondaryHref={SITE.phoneHref}
        />
      </main>
      <SiteFooter />
    </>
  );
}
