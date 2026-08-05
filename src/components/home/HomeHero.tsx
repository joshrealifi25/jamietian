"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  cubicBezier,
  type MotionValue,
  type EasingFunction,
} from "framer-motion";
import { AGENT } from "@/config/agent";

const EASE_FAME: EasingFunction = cubicBezier(0.83, 0, 0.17, 1);
const SCROLL_SPACER = 2200;

const HERO_IMAGES = [
  { src: "/images/hero/hero-slide-1.jpg", alt: "Modern California estate at dusk" },
  { src: "/images/hero/hero-slide-2.jpg", alt: "Luxury interior with warm lighting" },
  { src: "/images/hero/hero-slide-3.jpg", alt: "California poolside living" },
];

const FAME_EASE = [0.83, 0, 0.17, 1] as const;

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    function update() {
      const rect = el!.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / el!.offsetHeight));
      progress.set(p);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [ref, progress]);

  return progress;
}

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

function ClipSlide({
  src,
  alt,
  progress,
  startClip,
  endClip,
}: {
  src: string;
  alt: string;
  progress: MotionValue<number>;
  startClip: number;
  endClip: number;
}) {
  const clipPath = useTransform(
    progress,
    [startClip, endClip],
    [
      "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );
  const scale = useTransform(progress, [startClip, endClip], [0.35, 1], {
    ease: EASE_FAME,
  });
  const imgOpacity = useTransform(
    progress,
    [startClip, startClip + 0.02, endClip],
    [0, 1, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 z-[1] overflow-hidden"
      style={{ clipPath, opacity: imgOpacity }}
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
    </motion.div>
  );
}

function ScrollIndicator({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
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
  );
}

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useScrollProgress(sectionRef);

  const bgScale = useTransform(scrollYProgress, [0, 0.15], [1.15, 1], {
    ease: EASE_FAME,
  });
  const bgOpacity = useTransform(scrollYProgress, [0.12, 0.22], [1, 0.2]);

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2],
    [0.45, 0.45, 0.7]
  );

  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);
  const contentY = useTransform(
    scrollYProgress,
    [0.15, 0.25],
    ["0%", "-10%"],
    { ease: EASE_FAME }
  );

  const leftPanelX = useTransform(
    scrollYProgress,
    [0.75, 0.95],
    ["-100%", "0%"],
    { ease: EASE_FAME }
  );
  const rightPanelX = useTransform(
    scrollYProgress,
    [0.75, 0.95],
    ["100%", "0%"],
    { ease: EASE_FAME }
  );
  const panelOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${SCROLL_SPACER}px)` }}
    >
      <div className="sticky top-0 z-[2] h-screen w-full overflow-hidden">
        {/* Background image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: bgScale, opacity: bgOpacity }}
        >
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Luxury California residence"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 z-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Clip-path image slides */}
        {HERO_IMAGES.map((img, i) => (
          <ClipSlide
            key={img.src}
            src={img.src}
            alt={img.alt}
            progress={scrollYProgress}
            startClip={0.2 + i * 0.18}
            endClip={0.38 + i * 0.18}
          />
        ))}

        {/* Split-screen accent panels */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-rf-accent z-[3]"
          style={{ x: leftPanelX, opacity: panelOpacity }}
        />
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 bg-rf-accent z-[3]"
          style={{ x: rightPanelX, opacity: panelOpacity }}
        />

        {/* Decorative elements */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[5]">
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden>
            <circle
              cx="4"
              cy="4"
              r="3.5"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-white/40"
            />
          </svg>
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex h-full w-full flex-col justify-center items-center text-center px-6"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <EntranceLine delay={0.3}>
            <p className="rf-eyebrow mb-8 text-white/70">{AGENT.heroMarkets}</p>
          </EntranceLine>

          <h1 className="rf-display max-w-5xl mb-8">
            <EntranceLine delay={0.5}>
              Calm strategy for
            </EntranceLine>
            <EntranceLine delay={0.65}>
              your highest-stakes
            </EntranceLine>
            <EntranceLine delay={0.8}>
              decisions
            </EntranceLine>
          </h1>

          <EntranceLine delay={1.0}>
            <p className="rf-body-sm max-w-xl mb-10 text-white/60">
              {AGENT.name} &mdash; {AGENT.title}. $200M+ in closed sales,
              14 years in Los Angeles&apos;s most competitive markets, and
              representation trusted for discretion, clarity, and results.
            </p>
          </EntranceLine>

          <EntranceLine delay={1.2}>
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
        </motion.div>

        <ScrollIndicator progress={scrollYProgress} />
      </div>
    </section>
  );
}
