"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

export const HEADER_OFFSET = 112;

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function scrollToAnchor(hash: string): boolean {
  if (typeof window === "undefined") return false;

  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -HEADER_OFFSET, duration: 1.15 });
  } else {
    const top = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    );
    window.scrollTo({ top, behavior: "smooth" });
  }

  return true;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: false,
    });
    lenisInstance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenisInstance = null;
      lenis.stop();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
