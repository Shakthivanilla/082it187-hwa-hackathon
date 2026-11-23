"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PawIcon, SunIcon, KibbleIcon, BoneIcon } from "@/components/icons";

const CAPTIONS = [
  {
    step: "01",
    icon: PawIcon,
    title: "Load",
    text: "Chambers fill with your dog's regular kibble - no swaps, no treats, no overfeeding.",
  },
  {
    step: "02",
    icon: SunIcon,
    title: "Sniff",
    text: "The six-chamber scent wheel releases a fresh natural scent to wake the nose.",
  },
  {
    step: "03",
    icon: KibbleIcon,
    title: "Forage",
    text: "The console dispenses kibble across the floor zones as a nose-work puzzle.",
  },
  {
    step: "04",
    icon: BoneIcon,
    title: "Play",
    text: "Daily WiFi game updates push the next challenge while the dog solves.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin,
          anticipatePin: 1,
        },
      }).fromTo(
        ".how-visual img",
        { scale: 0.92, opacity: 0.35 },
        { scale: 1, opacity: 1, ease: "none" },
      ).fromTo(
        ".how-caption",
        { y: 46, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, ease: "none", duration: 0.6 },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[340vh] bg-cream max-w-full">
      <div ref={pinRef} className="how-sticky sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-12 px-6 md:px-8 lg:flex-row lg:justify-between">
          <div className="how-visual w-full max-w-xl">
            <img
              src="/media/exploded-view.png"
              alt="ForageGrid exploded view showing the six kibble chambers"
              className="w-full"
            />
          </div>
          <div className="how-captions flex w-full max-w-xl flex-col gap-6">
            {CAPTIONS.map((caption) => {
              const Icon = caption.icon;
              return (
                <div
                  key={caption.step}
                  className="how-caption flex items-start gap-5 rounded-2xl border border-parchment bg-white p-6 shadow-sm"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-yellow-400 text-amber-950">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
                      {caption.step}
                    </p>
                    <h3 className="mt-1 text-xl font-black text-ink">
                      {caption.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      {caption.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}