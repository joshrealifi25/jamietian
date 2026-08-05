import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageSection } from "@/components/layout/PageSection";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { HorizontalReveal } from "@/components/motion/HorizontalReveal";
import { WipeReveal } from "@/components/motion/WipeReveal";
import { CTASection } from "@/components/shared/MaterialTextureSection";
import { testimonials } from "@/data/testimonials";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Buy a Home in Los Angeles | Buyer Representation by Jamie Tian",
  description:
    "Buy your next home in Los Angeles with Jamie Tian. Fourteen years of market expertise, decisive negotiation, and calm guidance in Beverly Hills, Sherman Oaks, the Westside, and across LA.",
  keywords: [
    "buy home Los Angeles",
    "Beverly Hills homes for sale",
    "Los Angeles buyer agent",
    "Jamie Tian buyer representation",
    "buy house in LA",
    "first time home buyer Los Angeles",
  ],
  openGraph: {
    title: "Buy a Home in Los Angeles | Jamie Tian",
    description:
      "Market expertise, decisive negotiation, and trusted representation from search to close.",
  },
  alternates: {
    canonical: `${SITE.url}/buy`,
  },
};

const buyerFaqs = [
  {
    question: "How does Jamie help buyers in Los Angeles?",
    answer:
      "Jamie provides buyer representation grounded in fourteen years of Los Angeles market experience, backed by Koqi pricing intelligence that analyzes comparable sales, market velocity, and neighborhood trends. She routinely knows about homes coming to market before they appear online, and she helps you understand a property's true value before you make an offer.",
  },
  {
    question: "How much does it cost to work with Jamie as a buyer?",
    answer:
      "Buyer agent compensation is typically covered by the seller or negotiated as part of the purchase offer. Under California's 2024 commission rules, buyers sign a representation agreement with their agent upfront. Jamie discusses compensation transparently before beginning your home search.",
  },
  {
    question: "What areas does Jamie serve?",
    answer:
      "Jamie serves greater Los Angeles with deep expertise in Beverly Hills, Sherman Oaks, Studio City, Westwood, Brentwood, Santa Monica, West Hollywood, Manhattan Beach, and surrounding communities — plus Long Beach and Seal Beach along the coast.",
  },
  {
    question: "What is Koqi and how does it help homebuyers?",
    answer:
      "Koqi is an AI-powered pricing intelligence platform used by Jamie's brokerage, RealiFi Realty. It analyzes comparable sales data, market velocity, buyer demand, and neighborhood-specific trends to give buyers a data-driven understanding of a property's fair market value before writing an offer.",
  },
];

const buyerBenefits = [
  {
    number: "01",
    title: "Know the Real Value",
    description:
      "Our Koqi powered pricing intelligence gives you confidence before you write a single offer. No guessing, no overpaying.",
  },
  {
    number: "02",
    title: "Skilled Negotiation",
    description:
      "We represent your interests with precision. From initial offer to final walkthrough, every term is negotiated to protect you.",
  },
  {
    number: "03",
    title: "Complete Guidance",
    description:
      "Inspections, appraisals, contingencies, closing logistics. We manage the complexity so you can focus on finding home.",
  },
  {
    number: "04",
    title: "Local Market Expertise",
    description:
      "Deep knowledge of California neighborhoods, school districts, and local markets means you get insight only a local expert can provide.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We learn your priorities, timeline, and budget. You get a clear picture of what the market looks like for you.",
  },
  {
    step: "02",
    title: "Smart Search",
    description:
      "Curated listings matched to your criteria, informed by live market data and pricing intelligence.",
  },
  {
    step: "03",
    title: "Offer Strategy",
    description:
      "We craft competitive offers grounded in data. You know what a property is worth before you commit.",
  },
  {
    step: "04",
    title: "Close with Confidence",
    description:
      "From escrow to keys, we coordinate every detail. You move in knowing every step was handled with care.",
  },
];

const buyerTestimonial = testimonials.find((t) =>
  t.context?.toLowerCase().includes("buyer")
);

const buyFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: buyerFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function BuyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buyFaqJsonLd) }}
      />
      <SiteHeader />
      <main id="main-content">
        {/* Hero with full-bleed property image */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <Image
            src="/images/hero/hero-slide-2.jpg"
            alt="California luxury home interior"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-16 md:pb-24 w-full">
            <div className="max-w-5xl">
              <Reveal>
                <p className="rf-eyebrow text-white/70 mb-6">Buyer Representation</p>
              </Reveal>
              <h1 className="rf-display text-white max-w-4xl">
                <LineReveal delay={0.1}>
                  Know what it&apos;s worth
                </LineReveal>
                <LineReveal delay={0.18}>
                  before you write the offer.
                </LineReveal>
              </h1>
              <Reveal delay={0.2}>
                <p className="rf-body text-white/70 max-w-2xl mt-8">
                  Buying a home is one of the most significant decisions you
                  will make. Jamie brings pricing clarity, local expertise,
                  and relentless advocacy to every step of the process.
                </p>
              </Reveal>
              <HorizontalReveal from="left" distance={100}>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Link href="/contact" className="rf-btn-primary text-white">
                    Start Buying Smarter
                  </Link>
                  <Link href="/properties/sold" className="rf-btn-ghost text-white border-white/30">
                    View Sold Properties
                  </Link>
                </div>
              </HorizontalReveal>
            </div>
          </div>
        </section>

        <PageSection className="bg-rf-surface" width="xl">
          <Reveal>
            <p className="rf-eyebrow mb-4">Why Jamie</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="rf-h2 max-w-2xl mb-16">
              Every advantage a buyer deserves, none of the uncertainty.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {buyerBenefits.map((benefit, i) => (
              <TiltCard
                key={benefit.number}
                from={i % 2 === 0 ? "left" : "right"}
              >
                <div className="group">
                  <span className="text-rf-accent font-serif text-3xl font-light">
                    {benefit.number}
                  </span>
                  <div className="rf-divider-accent mt-4 mb-5" />
                  <h3 className="rf-h3 mb-3">{benefit.title}</h3>
                  <p className="rf-body-sm">{benefit.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </PageSection>

        {/* Cinematic image break */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image
            src="/images/properties/1830-westholme.jpg"
            alt="Westholme luxury property"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <PageSection className="bg-rf-page">
          <Reveal>
            <p className="rf-eyebrow mb-4">The Process</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="rf-h2 max-w-2xl mb-16">
              From first conversation to front door.
            </h2>
          </Reveal>
          <div className="space-y-0">
            {processSteps.map((item, i) => (
              <HorizontalReveal
                key={item.step}
                from={i % 2 === 0 ? "left" : "right"}
                distance={100}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-10 border-t border-rf-border first:border-t-0">
                  <div className="md:col-span-1">
                    <span className="text-rf-accent font-serif text-2xl font-light">
                      {item.step}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="rf-h3">{item.title}</h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="rf-body">{item.description}</p>
                  </div>
                </div>
              </HorizontalReveal>
            ))}
          </div>
        </PageSection>

        {/* Accent image between process and testimonial */}
        <div className="relative h-[35vh] md:h-[45vh] overflow-hidden">
          <Image
            src="/images/properties/2170-sunset-plaza.jpg"
            alt="Sunset Plaza luxury property"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {buyerTestimonial && (
          <PageSection className="bg-rf-surface" width="sm">
            <div className="text-center">
              <Reveal>
                <p className="rf-eyebrow mb-8">Client Experience</p>
              </Reveal>
              <HorizontalReveal from="right" distance={140}>
                <blockquote>
                  <p className="rf-display-sm italic font-light">
                    &ldquo;{buyerTestimonial.quote}&rdquo;
                  </p>
                </blockquote>
              </HorizontalReveal>
              <Reveal delay={0.2}>
                <div className="mt-8">
                  <p className="text-rf-heading font-serif text-lg">
                    {buyerTestimonial.author}
                  </p>
                  {buyerTestimonial.context && (
                    <p className="rf-body-sm mt-1">
                      {buyerTestimonial.context}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {Array.from({ length: buyerTestimonial.rating }).map(
                      (_, idx) => (
                        <span key={idx} className="text-rf-accent text-sm">
                          &#9733;
                        </span>
                      )
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </PageSection>
        )}

        <PageSection className="bg-rf-page" width="sm">
          <div className="text-center">
            <WipeReveal direction="up">
              <div className="rf-divider-accent mx-auto mb-8" />
              <h2 className="rf-h2 mb-6">Informed by intelligence.</h2>
              <p className="rf-body max-w-xl mx-auto">
                Jamie&apos;s guidance is backed by pricing insights powered by{" "}
                <a
                  href={SITE.koqiUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-rf-accent hover:text-rf-accent-soft transition-colors duration-300 underline underline-offset-4 decoration-rf-accent/30"
                >
                  Koqi
                </a>
                , helping you understand true market value before you make a
                move.
              </p>
            </WipeReveal>
          </div>
        </PageSection>

        <PageSection className="bg-rf-surface">
          <Reveal>
            <p className="rf-eyebrow mb-4">Common Questions</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="rf-h2 max-w-2xl mb-12">
              What California homebuyers ask us most.
            </h2>
          </Reveal>
          <div className="max-w-3xl space-y-4">
            {buyerFaqs.map((faq, i) => (
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
          eyebrow="Ready to Buy?"
          heading="Start buying smarter."
          body="Schedule a relaxed conversation with Jamie. She will help you understand the market and find the right home."
          primaryCta="Start Buying Smarter"
          primaryHref="/contact"
          secondaryCta="Call Jamie"
          secondaryHref={SITE.phoneHref}
        />
      </main>
      <SiteFooter />
    </>
  );
}
