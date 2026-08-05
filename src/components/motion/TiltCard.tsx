"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
  from?: "left" | "right";
}

export function TiltCard({
  children,
  className,
  tilt = 3,
  from = "left",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const dir = from === "left" ? 1 : -1;
  const rotate = useTransform(scrollYProgress, [0, 1], [dir * tilt, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [dir * -30, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  // Fade in early — inventory should never sit invisible mid-scroll
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0.15, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotate,
        x,
        opacity,
        scale,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
