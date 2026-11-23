"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/section-heading";

const SLIDES = [
  {
    time: "9:00 AM",
    title: "You leave",
    subtitle: "Console wakes up and releases the first scent",
    detail: "Noting the first 30 minutes are when dogs feel most anxious.",
    illustration: "/media/foragegrid-app.png",
  },
  {
    time: "9:05 AM",
    title: "Sniff & Solve",
    subtitle: "Nose-work game, Zone 1 opens",
    detail: "",
    illustration: "/media/foragegrid-app.png",
  },
  {
    time: "10:30 AM",
    title: "Nap time",
    subtitle: "Satisfied dog naps; console stays quiet",
    detail: "Dogs rest most of the day. The console is built for active moments.",
    illustration: "/media/foragegrid-app.png",
  },
  {
    time: "1:00 PM",
    title: "Midday game",
    subtitle: "New Zone unlocks with a fresh scent",
    detail: "",
    illustration: "/media/foragegrid-app.png",
  },
  {
    time: "4:00 PM",
    title: "Final Puzzle",
    subtitle: "Hardest challenge of the day",
    detail: "",
    illustration: "/media/foragegrid-app.png",
  },
  {
    time: "6:00 PM",
    title: "You are home",
    subtitle: "Happy, tired dog; zones go into the dishwasher",
    detail: "",
    illustration: "/media/foragegrid-app.png",
  },
];

export function DayAway() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    setScrollPosition(target.scrollLeft);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Background gradient animation: sunrise to sunset color shift (safe on all viewports)
    const bgGradient = section.querySelector(".bg-gradient");
    if (bgGradient) {
      ;(bgGradient as HTMLElement).style.backgroundPosition = "";
      gsap.to(bgGradient as HTMLElement, {
        backgroundPosition: "0% 50%",
        ease: "none",
      });
    }

    // Horizontal scroll with momentum on desktop, swipe on mobile
    // Only initialize ScrollTrigger on desktop viewports to avoid mobile crashes
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      const ctx = gsap.context(() => {
        ;(window as any).ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self: any) => {
            const maxScroll = section.scrollWidth - section.clientWidth;
            const progress = Math.min(Math.max(self.progress, 0), 1);
            setScrollPosition(maxScroll * progress);
          },
        });
      }, section);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      className="relative bg-cream min-h-[600px]"
      ref={sectionRef}
      style={{ overflowX: "auto" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-16">
        <div className="relative">
          {/* Sun-to-Moon Background Gradient Track */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-200 via-amber-100 to-slate-200 min-h-[400px] rounded-3xl opacity-80 blur-md"
            style={{ backgroundPosition: `${scrollPosition}% 50%` }}
          />

          {/* Horizontal Scroll Track */}
          <div
            ref={trackRef}
            className="relative flex-row flex-nowrap gap-6 overflow-x-auto pb-6 pt-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-500"
            onScroll={handleScroll}
            style={{ scrollBehavior: "smooth" }}
          >
            {SLIDES.map((slide, index) => (
              <article
                key={slide.time}
                className="flex-shrink-0 relative w-64 md:w-56 flex flex-col items-center py-8 border-l-4 border-amber-300 group:hover:shadow-xl transition-shadow"
                style={{
                  scrollSnapType: "x mandatory",
                  scrollSnapAlign: "start",
                }}
              >
                {/* Illustration / Visual */}
                <div className="mt-2 w-full h-24 md:h-32 rounded-2xl bg-white/50 group-hover:bg-white/80 transition-colors flex items-center justify-center mb-4">
                  <img
                    src={slide.illustration}
                    alt={slide.title}
                    className="h-16 w-16 object-contain"
                  />
                </div>

                {/* Time Label */}
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600 mb-1">
                  {slide.time}
                </p>

                {/* Title */}
                <h3 className="text-lg font-black text-ink text-center line-clamp-1">
                  {slide.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-amber-500 text-center line-clamp-1 mt-1">
                  {slide.subtitle}
                </p>

                {/* Detail / Honest Note */}
                <p className="mt-2 text-xs text-amber-400 line-clamp-2">
                  {slide.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Honest Note About Dogs Resting */}
        <div className="mt-8 max-w-2xl mx-auto rounded-2xl bg-white/80 p-6 backdrop-blur">
          <p className="font-black text-amber-600 tracking-[0.1em]">
            Dogs rest most of the day. The console is built for active moments --
            a fresh scent at dawn, a quick nose-work game midday, and a final
            puzzle before you return. Even a short sniff session can burn real
            energy and calm a busy brain.
          </p>
        </div>
      </div>
    </section>
  );
}