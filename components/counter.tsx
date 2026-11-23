"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function Counter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1.8,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Only initialize GSAP ScrollTrigger on desktop viewports to avoid mobile crashes
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      const target = value;
      const obj = { v: 0 };
      const tween = gsap.to(obj, {
        v: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = target.toLocaleString("en-IN", {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
          }) + suffix;
        },
      });
      return () => {
        tween.scrollTrigger?.kill?.();
      };
    }
  }, [value, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}