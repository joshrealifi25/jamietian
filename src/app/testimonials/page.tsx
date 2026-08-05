import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageSection } from "@/components/layout/PageSection";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { HorizontalReveal } from "@/components/motion/HorizontalReveal";
import { CTASection } from "@/components/shared/MaterialTextureSection";
import { testimonials } from "@/data/testimonials";
import { AGENT } from "@/config/agent";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `What clients say about working with ${AGENT.name} — real reviews from buyers, sellers, and investors across Los Angeles.`,
  openGraph: {
    title: `Testimonials | ${AGENT.name}`,
    description: `What clients say about working with ${AGENT.name}.`,
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        {/* Dark hero */}
        <section className="bg-black text-white pt-40 md:pt-52 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Reveal>
              <p className="rf-eyebrow text-white/60 mb-6">Testimonials</p>
            </Reveal>
            <h1 className="rf-display text-white max-w-4xl">
              <LineReveal delay={0.1}>What clients say</LineReveal>
              <LineReveal delay={0.2}>about {AGENT.firstName}.</LineReveal>
            </h1>
            <Reveal delay={0.3}>
              <p className="rf-body text-white/60 max-w-2xl mt-8">
                Buyers, sellers, and investors — first homes, remote sales,
                1031 exchanges, and everything between.
              </p>
            </Reveal>
          </div>
        </section>

        <PageSection className="bg-rf-page" width="md">
          <div className="space-y-0">
            {testimonials.map((t, i) => (
              <HorizontalReveal
                key={t.quote.slice(0, 40)}
                from={i % 2 === 0 ? "left" : "right"}
                distance={60}
              >
                <blockquote className="py-10 md:py-14 border-t border-rf-border first:border-t-0">
                  <p className="rf-body-serif text-rf-heading leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <cite className="rf-eyebrow text-rf-heading not-italic">
                      {t.author}
                    </cite>
                    {t.context && (
                      <>
                        <span className="w-6 h-px bg-rf-border" />
                        <span className="rf-eyebrow text-rf-muted">
                          {t.context}
                        </span>
                      </>
                    )}
                  </footer>
                </blockquote>
              </HorizontalReveal>
            ))}
          </div>
        </PageSection>

        <CTASection
          eyebrow="Your Turn"
          heading="Experience it yourself."
          body="Every one of these stories started with a conversation. Tell Jamie what you're planning — buying, selling, or just exploring."
          primaryCta="Contact Jamie"
          primaryHref="/contact"
          secondaryCta="View Recent Sales"
          secondaryHref="/properties/sold"
        />
      </main>
      <SiteFooter />
    </>
  );
}
