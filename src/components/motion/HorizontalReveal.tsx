"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";

interface HorizontalRevealProps {
  children: React.ReactNode;
  className?: string;
  from?: "left" | "right";
  distance?: number;
  /** 0-1: how far through the viewport scroll range the animation completes */
  span?: number;
}

export function HorizontalReveal({
  children,
  className,
  from = "left",
  distance = 120,
  span = 0.6,
}: HorizontalRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", `${span} end`],
  });

  const dir = from === "left" ? -1 : 1;
  const x = useTransform(scrollYProgress, [0, 1], [dir * distance, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const style: MotionStyle = { x, opacity };

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}
