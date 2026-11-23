"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const nightSkyRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    const nightSky = nightSkyRef.current;
    const sun = sunRef.current;
    const moon = moonRef.current;
    if (!section) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      if (sticky) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: sticky,
          anticipatePin: 1,
        });
      }

      if (track && nightSky && sun && moon) {
        gsap.to(track, {
          x: () => Math.max(0, track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(nightSky, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        gsap.to(moon, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        gsap.to(sun, {
          x: 260,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="bg-cream px-6 pb-24 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="A Day While You&apos;re Away"
            title="Six hours, sun to moon"
            blurb="A gentle forage timeline from morning breakfast to deep, safe rest."
          />
        </div>
      </div>

      <section ref={sectionRef} className="relative h-[340vh] bg-cream max-w-full">
        <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
          <div ref={skyRef} className="absolute inset-0 bg-gradient-to-b from-amber-200 via-amber-100 to-sky-200" />
          <div ref={nightSkyRef} className="absolute inset-0 bg-night opacity-0" />
          <div
            ref={sunRef}
            className="absolute right-[10%] top-[14%] h-24 w-24 rounded-full bg-yellow-400 shadow-[0_0_90px_24px_rgba(250,204,21,0.55)]"
          />
          <div
            ref={moonRef}
            className="absolute right-[10%] top-[14%] h-20 w-20 rounded-full bg-cream opacity-0 shadow-[0_0_70px_20px_rgba(251,246,236,0.4)]"
          />

          <div ref={trackRef} className="flex h-full will-change-transform">
            {SLIDES.map((slide) => (
              <article
                key={slide.time}
                className="relative flex h-full w-[88vw] shrink-0 items-center sm:w-[78vw] lg:w-[70rem]"
              >
                <div className="mx-auto max-w-2xl px-6">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">
                    {slide.time}
                  </p>
                  <h3 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-ink-2">
                    {slide.text}
                  </p>
                  {slide.time === "6:00 PM" ? (
                    <p className="mt-6 rounded-2xl border border-parchment bg-white p-5 text-sm leading-relaxed text-ink-2">
                      Honest rest note: dogs don&apos;t need 100% of the day
                      entertained. Sleep and naps are part of the plan -
                      ForageGrid simply fills the hours that would otherwise be
                      lonely boredom.
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}