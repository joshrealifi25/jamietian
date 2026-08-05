"use client";

import { motion } from "framer-motion";

interface MarqueeStripProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
  itemClassName?: string;
}

export function MarqueeStrip({
  items,
  speed = 30,
  separator = "  •  ",
  className,
  itemClassName,
}: MarqueeStripProps) {
  const text = items.join(separator) + separator;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div
        className="inline-flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <span className={itemClassName}>{text}</span>
        <span className={itemClassName}>{text}</span>
      </motion.div>
    </div>
  );
}
