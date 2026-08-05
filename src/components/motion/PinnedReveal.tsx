"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface PinnedRevealSlide {
  image: string;
  alt: string;
  label: string;
  heading: string;
  body: string;
}

interface PinnedRevealProps {
  slides: PinnedRevealSlide[];
  className?: string;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function SlideImage({
  slide,
  progress,
  start,
  end,
  isLast,
}: {
  slide: PinnedRevealSlide;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  isLast: boolean;
}) {
  const clipPath = useTransform(
    progress,
    [clamp01(start), clamp01(end)],
    [
      "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );
  const scale = useTransform(progress, [clamp01(start), clamp01(end)], [1.4, 1]);
  const opacity = useTransform(
    progress,
    isLast
      ? [clamp01(start), clamp01(start + 0.02), clamp01(end)]
      : [clamp01(start), clamp01(start + 0.02), clamp01(end - 0.02), clamp01(end + 0.15)],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const rotate = useTransform(progress, [clamp01(start), clamp01(end)], [-3, 0]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ clipPath, opacity }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale, rotate }}
      >
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </motion.div>
    </motion.div>
  );
}

function SlideText({
  slide,
  progress,
  start,
  end,
  isLast,
}: {
  slide: PinnedRevealSlide;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  isLast: boolean;
}) {
  const y = useTransform(progress, [clamp01(start), clamp01(end)], [60, 0]);
  const opacity = useTransform(
    progress,
    isLast
      ? [clamp01(start), clamp01(start + 0.08), clamp01(end)]
      : [clamp01(start), clamp01(start + 0.08), clamp01(end - 0.02), clamp01(end + 0.12)],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  return (
    <motion.div className="absolute inset-x-0 bottom-0 pb-6 md:pb-0 md:bottom-auto md:top-[62%] px-6 md:px-8 lg:px-12" style={{ opacity }}>
      <motion.p className="rf-eyebrow text-white/60 mb-2 md:mb-3" style={{ y }}>
        {slide.label}
      </motion.p>
      <motion.h3
        className="font-sans font-800 text-xl sm:text-2xl md:text-4xl uppercase tracking-tight text-white mb-2 md:mb-3 whitespace-pre-line"
        style={{ y }}
      >
        {slide.heading}
      </motion.h3>
      <motion.p className="rf-body-sm text-white/50 max-w-sm" style={{ y }}>
        {slide.body}
      </motion.p>
    </motion.div>
  );
}

export function PinnedReveal({ slides, className }: PinnedRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const segmentSize = 1 / slides.length;

  return (
    <section
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{ height: `${(slides.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden grid grid-cols-1 grid-rows-[3fr_2fr] md:grid-cols-[1fr_1fr] md:grid-rows-[1fr]">
        {/* Left: images cycle with clip-path + rotation */}
        <div className="relative bg-black overflow-hidden">
          {slides.map((slide, i) => (
            <SlideImage
              key={slide.image}
              slide={slide}
              progress={scrollYProgress}
              start={i * segmentSize}
              end={(i + 0.7) * segmentSize}
              isLast={i === slides.length - 1}
            />
          ))}
        </div>

        {/* Right: text content cycles */}
        <div className="relative bg-black flex flex-col justify-end">
          {slides.map((slide, i) => (
            <SlideText
              key={slide.heading}
              slide={slide}
              progress={scrollYProgress}
              start={i * segmentSize}
              end={(i + 0.7) * segmentSize}
              isLast={i === slides.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
