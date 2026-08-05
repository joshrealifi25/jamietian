"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ScrollParallaxText({
  children,
  className,
  speed = 0.3,
}: ScrollParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}px`, `-${speed * 100}px`]
  );

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
