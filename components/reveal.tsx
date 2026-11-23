"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface WordRevealProps {
  text: string;
  className?: string;
  highlight?: string[];
}

export function WordReveal({ text, className, highlight = [] }: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = text.split(" ");
    el.innerHTML = words
      .map((word) => {
        const clean = word.replace(/[^a-zA-Z0-9\u00C0-\u017Fa-z]/g, "");
        const isHighlight =
          highlight &&
          highlight.some(
            (h) => h.toLowerCase() === clean.toLowerCase(),
          );
        const classes = isHighlight ? " text-yellow-500" : "";
        return `<span class="w"><span class="w-inner${classes}">${word}</span></span>`;
      })
      .join(" ");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll<HTMLElement>(".w-inner"),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.045,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text, highlight]);

  return <span ref={ref} className={className} aria-label={text} />;
}