"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface WipeRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

const clipMap = {
  up: {
    start: "inset(100% 0% 0% 0%)",
    end: "inset(0% 0% 0% 0%)",
  },
  down: {
    start: "inset(0% 0% 100% 0%)",
    end: "inset(0% 0% 0% 0%)",
  },
  left: {
    start: "inset(0% 0% 0% 100%)",
    end: "inset(0% 0% 0% 0%)",
  },
  right: {
    start: "inset(0% 100% 0% 0%)",
    end: "inset(0% 0% 0% 0%)",
  },
};

export function WipeReveal({
  children,
  className,
  direction = "up",
}: WipeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "0.5 end"],
  });

  const clips = clipMap[direction];
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [clips.start, clips.end]
  );

  return (
    <motion.div ref={ref} className={className} style={{ clipPath }}>
      {children}
    </motion.div>
  );
}
