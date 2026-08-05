"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";

interface ScrollScaleProps {
  children: React.ReactNode;
  className?: string;
  from?: number;
  to?: number;
}

export function ScrollScale({
  children,
  className,
  from = 0.85,
  to = 1,
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [from, to]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const style: MotionStyle = { scale, opacity };

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}
