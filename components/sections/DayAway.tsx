"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/section-heading";

const SLIDES = [
  {
    time: "9:00 AM",
    title: "Breakfast & sniffari",
    text: "Kibble, fresh water, and a gentle scent session to start the day right.",
  },
  {
    time: "11:00 AM",
    title: "Scent wheel game",
    text: "The six-chamber scent wheel releases a new natural scent to keep the nose busy.",
  },
  {
    time: "1:00 PM",
    title: "Kibble puzzle",
    text: "The console dispenses kibble across the floor zones as a nose-work puzzle.",
  },
  {
    time: "3:00 PM",
    title: "Deep sniff session",
    text: "Long, slow sniffs burn real energy and calm a busy brain.",
  },
  {
    time: "5:00 PM",
    title: "Calm wind-down",
    text: "Easy scent play and gentle movement before dinner and lights out.",
  },
  {
    time: "6:00 PM",
    title: "Moon & rest",
    text: "Dinner, potty, and the dog settles into a deep, safe sleep.",
  },
];

export function DayAway() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    if (sticky) {
      gsap.to(sticky, {
        y: -section.offsetHeight,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <>
      <div className="bg-cream px-6 pb-24 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="A Day While You're Away"
            title="Six hours, sun to moon"
            blurb="A gentle forage timeline from morning breakfast to deep, safe rest."
          />
        </div>
      </div>

      <section ref={sectionRef} className="relative bg-cream">
        <div ref={stickyRef} className="sticky top-0 h-[500px] overflow-hidden bg-gradient-to-b from-amber-200 via-amber-100 to-sky-200">
          <div className="h-full w-full flex">
            {SLIDES.map((slide) => (
              <article
                key={slide.time}
                className="relative flex h-full w-full shrink-0 items-center justify-center"
              >
                <div className="mx-auto max-w-2xl px-6 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">
                    {slide.time}
                  </p>
                  <h3 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-ink-2">
                    {slide.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}