"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";

const fameEase = [0.83, 0, 0.17, 1] as const;

export function ClientProof() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  const handlePrev = useCallback(() => {
    setPaused(true);
    prev();
  }, [prev]);

  const handleNext = useCallback(() => {
    setPaused(true);
    next();
  }, [next]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const current = testimonials[index];

  return (
    <section
      ref={sectionRef}
      className="rf-section bg-black text-white py-20 md:py-32 relative overflow-hidden"
    >
      <motion.span
        className="rf-block-name text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: fameEase }}
        viewport={{ once: true }}
      >
        Testimonials
      </motion.span>

      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-start">
        <div className="min-h-[220px] sm:min-h-[280px] md:min-h-[320px] flex items-center w-full relative">
          {/* Decorative quote mark */}
          <span
            className="block text-rf-accent font-serif text-[120px] md:text-[180px] leading-none select-none absolute -top-8 -left-4 md:-left-8 opacity-20"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              className="w-full"
              initial={{ opacity: 0, x: 60, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -60, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
            >
              <p className="rf-body-serif text-white leading-tight mb-10">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <cite className="rf-eyebrow text-white/80 not-italic">
                  {current.author}
                </cite>
                {current.context && (
                  <>
                    <span className="w-6 h-px bg-white/30" />
                    <span className="rf-eyebrow text-white/40">
                      {current.context}
                    </span>
                  </>
                )}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-6 mt-10">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="rf-eyebrow text-white/40 hover:text-white transition-colors duration-300"
          >
            &larr; Prev
          </button>
          <span className="rf-eyebrow text-white/30">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="rf-eyebrow text-white/40 hover:text-white transition-colors duration-300"
          >
            Next &rarr;
          </button>
        </div>

        <motion.div
          className="h-px bg-rf-accent/30 mt-6"
          key={index}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 7, ease: "linear" }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
