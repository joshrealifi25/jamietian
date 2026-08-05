"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FAME_EASE = [0.83, 0, 0.17, 1] as const;

interface LineRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function LineReveal({
  children,
  delay = 0,
  duration = 1.2,
  className,
}: LineRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <span ref={ref} className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "100%" }}
        animate={inView ? { y: "0%" } : { y: "100%" }}
        transition={{ duration, delay, ease: FAME_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface MultiLineRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  baseDelay?: number;
  stagger?: number;
}

export function MultiLineReveal({
  text,
  as: Tag = "h2",
  className,
  lineClassName,
  baseDelay = 0,
  stagger = 0.08,
}: MultiLineRevealProps) {
  const words = text.split("\n").filter(Boolean);
  return (
    <Tag className={className}>
      {words.map((line, i) => (
        <LineReveal key={i} delay={baseDelay + i * stagger} className={lineClassName}>
          {line}
        </LineReveal>
      ))}
    </Tag>
  );
}
