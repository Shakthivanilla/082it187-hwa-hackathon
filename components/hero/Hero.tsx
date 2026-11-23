"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { HeroCanvas } from "./HeroCanvas";
import { HeroVideoModal } from "./HeroVideoModal";
import { Magnetic } from "@/components/magnetic";
import {
  PawIcon,
  PlayIcon,
  ChevronRightIcon,
  TruckIcon,
  ShieldCheckIcon,
  RefreshCcwIcon,
  ReceiptIcon,
} from "@/components/icons";

const TRUST_BADGES = [
  { icon: TruckIcon, label: "Free shipping across India" },
  { icon: ShieldCheckIcon, label: "30-day happiness guarantee" },
  { icon: RefreshCcwIcon, label: "1-year warranty" },
  { icon: ReceiptIcon, label: "18% GST incl. | prices in INR" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [filmOpen, setFilmOpen] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const blob = blobRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        ".hero-copy",
        { y: 110, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.12, ease: "none" },
      );
      if (blob) {
        tl.fromTo(
          ".hero-blob",
          { yPercent: -7 },
          { yPercent: 0, duration: 0.25, ease: "none" },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProblem = () => {
    document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-night text-cream"
    >
      <div ref={blobRef} className="hero-blob absolute inset-0">
        <HeroCanvas />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-28 pb-20 sm:px-8">
        <div className="hero-copy max-w-3xl">
          <p className="hero-kicker inline-flex items-center rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-yellow-400">
            New | Cordless | Chew-Proof | Smart
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[1.04] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            The 6-Zone Forage Console that Turns Lonely Hours into Sniffing,
            Solving &amp; Calm
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70 md:text-xl">
            A 6-zone smart floor console with a 6-chamber scent wheel and daily
            WiFi game updates that dispense your dog&apos;s regular kibble -
            stopping boredom before it starts, keeping separation stress low,
            and skipping the long morning clean-up.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.4} className="inline-block">
              <a
                href="#configure"
                className="group inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-4 text-[15px] font-black text-amber-950 shadow-lg shadow-yellow-400/30 transition-transform hover:scale-[1.03]"
              >
                Configure Yours
                <ChevronRightIcon
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
            <Magnetic strength={0.4} className="inline-block">
              <button
                type="button"
                onClick={() => setFilmOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 bg-cream/5 px-7 py-4 text-[15px] font-bold text-cream backdrop-blur transition-colors hover:border-cream/60"
              >
                <PlayIcon size={16} className="text-yellow-400" />
                Watch the Film
              </button>
            </Magnetic>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <li
                  key={badge.label}
                  className="flex items-center gap-2.5 text-[13px] font-semibold text-cream/70"
                >
                  <Icon size={18} className="text-yellow-400" />
                  {badge.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToProblem}
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <span className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-cream/50">
          <PawIcon size={22} className="animate-paw text-yellow-400" />
          Scroll
        </span>
      </button>

      <HeroVideoModal open={filmOpen} onClose={() => setFilmOpen(false)} />
    </section>
  );
}