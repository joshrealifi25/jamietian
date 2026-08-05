"use client";

import { MotionConfig } from "framer-motion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Site-wide motion policy: honor the user's OS-level reduced-motion
  // preference for every framer-motion animation.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
