"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface ClipRevealImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ClipRevealImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: ClipRevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;

    function update() {
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      const enter = (vh - rect.top) / (vh * 0.6);
      progress.set(Math.min(1, Math.max(0, enter)));
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

  const clipPath = useTransform(
    progress,
    [0, 1],
    [
      "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );

  const scale = useTransform(progress, [0, 1], [1.3, 1]);
  const opacity = useTransform(progress, [0, 0.05, 0.3], [0, 1, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className="relative w-full h-full" style={{ clipPath, opacity }}>
        <motion.div className="relative w-full h-full" style={{ scale }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            priority={priority}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
