"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

interface MaterialTextureSectionProps {
  backgroundImage?: string;
  overlayOpacity?: number;
  children: React.ReactNode;
  className?: string;
}

export function MaterialTextureSection({
  backgroundImage,
  overlayOpacity = 0.75,
  children,
  className = "",
}: MaterialTextureSectionProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(10, 10, 10, ${overlayOpacity})` }}
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function TextureDivider({
  backgroundImage,
  height = "h-32 md:h-48",
}: {
  backgroundImage?: string;
  height?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${height}`}>
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-rf-page/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-rf-page via-rf-surface to-rf-page" />
      )}
    </div>
  );
}

export function CTASection({
  eyebrow,
  heading,
  body,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
  backgroundImage,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
  backgroundImage?: string;
}) {
  return (
    <MaterialTextureSection
      backgroundImage={backgroundImage}
      overlayOpacity={0.8}
      className="px-6 md:px-12 lg:px-20 xl:px-32 py-20 md:py-28"
    >
      <div className="max-w-3xl mx-auto text-center">
        {eyebrow && (
          <Reveal>
            <p className="rf-eyebrow mb-6">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <h2 className="rf-display-sm mb-6">{heading}</h2>
        </Reveal>
        {body && (
          <Reveal delay={0.2}>
            <p className="rf-body max-w-xl mx-auto mb-10">{body}</p>
          </Reveal>
        )}
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={primaryHref} className="rf-btn-primary">
              {primaryCta}
            </a>
            {secondaryCta && secondaryHref && (
              <a href={secondaryHref} className="rf-btn-ghost">
                {secondaryCta}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </MaterialTextureSection>
  );
}
