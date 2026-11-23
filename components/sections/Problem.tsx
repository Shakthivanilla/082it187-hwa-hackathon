"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { WordReveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { SectionHeading } from "@/components/section-heading";
import { BoneIcon, ClockIcon, PawIcon } from "@/components/icons";

const STATS = [
  {
    icon: ClockIcon,
    value: 8,
    suffix: "+",
    label: "hours a dog spends alone on a typical workday",
  },
  {
    icon: BoneIcon,
    value: 15,
    suffix: " min",
    label: "how long a stuffed toy usually lasts",
  },
  {
    icon: PawIcon,
    value: 1,
    suffix: "",
    label: "console that turns a lonely day into a game day",
  },
];

export function Problem() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".problem-copy > *",
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={ref}
      className="relative overflow-hidden bg-night py-24 text-cream md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="problem-copy">
          <SectionHeading
            eyebrow="The Problem"
            title={
              <WordReveal
                text="Every day, millions of dogs spend 8 hours staring at the door."
                highlight={["8", "door"]}
              />
            }
            blurb="Boredom is not small. It shapes behaviour, energy and the quiet bond between a dog and the world."
          />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <Icon size={26} className="text-yellow-400" />
                <p className="mt-5 text-5xl font-black text-yellow-400">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-cream/60">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-cream/50">
          Honest estimates, not veterinary advice. Every dog is different -
          ForageGrid tailors the forage to your dog&apos;s weight, age and breed.
        </p>
      </div>
    </section>
  );
}