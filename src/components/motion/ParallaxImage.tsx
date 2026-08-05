"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  scale?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  scale = 1.15,
  className,
  sizes = "100vw",
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;

    function update() {
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - rect.top) / (vh + rect.height);
      progress.set(Math.min(1, Math.max(0, p)));
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
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  const y = useTransform(progress, [0, 1], [`${speed * 100}%`, `-${speed * 100}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className="relative w-full h-full" style={{ y, scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
