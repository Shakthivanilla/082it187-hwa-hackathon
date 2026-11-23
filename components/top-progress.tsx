"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function TopProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[400] h-0.5 origin-left bg-yellow-400"
      style={{ scaleX }}
    />
  );
}