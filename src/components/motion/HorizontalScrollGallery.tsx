"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollGalleryProps {
  children: React.ReactNode;
  className?: string;
  /** How many extra viewport widths of horizontal scroll content */
  scrollWidth?: number;
}

export function HorizontalScrollGallery({
  children,
  className,
  scrollWidth = 2,
}: HorizontalScrollGalleryProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(scrollWidth - 1) * 100}%`]
  );

  return (
    <section
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{ height: `${scrollWidth * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x, width: `${scrollWidth * 100}%` }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
