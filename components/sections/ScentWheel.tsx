"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PawIcon } from "@/components/icons";

const DAILY_ITEMS = [
  { day: "Monday", img: "/media/scent-mon-grass.png", scent: "Fresh Meadow Grass", rule: "Nose-work only: one chamber at a time." },
  { day: "Tuesday", img: "/media/scent-tue-pine.png", scent: "Pine Forest", rule: "Slide-and-sniff two chambers." },
  { day: "Wednesday", img: "/media/scent-wed-herb.png", scent: "Wild Herb", rule: "Rotate the wheel to unlock." },
  { day: "Thursday", img: "/media/scent-thu-apple.png", scent: "Fresh Apple", rule: "Sequential chambers, timed release." },
  { day: "Friday", img: "/media/scent-fri-peanut.png", scent: "Peanut Butter", rule: "Paw-toggle all six zones." },
  { day: "Saturday", img: "/media/scent-sat-chicken.png", scent: "Roast Chicken", rule: "Memory-match zones." },
  { day: "Sunday", img: "/media/scent-sun-blueberry.png", scent: "Blueberry", rule: "Free-for-all kibble scatter." },
];

const INITIAL_INDEX = 2; // Start at Wednesday

export function ScentWheel() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const totalDays = DAILY_ITEMS.length;

  const prevIndex = activeIndex === 0 ? totalDays - 1 : activeIndex - 1;
  const nextIndex = activeIndex === totalDays - 1 ? 0 : activeIndex + 1;

  const inr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  const fmt = (value: number) => inr.format(value);

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">Interactive</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-5xl">The 7-Day Scent Wheel</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-2">
            One wheel, seven scents, a week of fresh foraging.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-xl gap-2">
          {DAILY_ITEMS.map((item, index) => (
            <motion.div
              key={item.day}
              className="relative flex flex-col items-center gap-4 rounded-2xl border border-parchment bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative h-[200px] w-[300px] overflow-hidden rounded-2xl">
                <img
                  src={item.img}
                  alt={item.day}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: `scale(${activeIndex === index ? 1 : 0.85})` }}
                />
                <div className="absolute inset-0 rounded-2xl background-gradient from-black/30 to-transparent" />
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-ink">{item.day}</p>
                <p className="mt-1 text-sm font-bold text-blue-700">{item.scent}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setActiveIndex(prevIndex)}
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-black text-ink transition-colors"
            aria-label="Previous day"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex(nextIndex)}
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-black text-ink transition-colors"
            aria-label="Next day"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}