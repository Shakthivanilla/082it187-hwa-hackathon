"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PawIcon } from "@/components/icons";

const DAILY_ITEMS = [
  { day: "Monday", img: "/media/scent-mon-grass.png", scent: "Fresh Meadow Grass" },
  { day: "Tuesday", img: "/media/scent-tue-pine.png", scent: "Pine Forest" },
  { day: "Wednesday", img: "/media/scent-wed-herb.png", scent: "Wild Herb" },
  { day: "Thursday", img: "/media/scent-thu-apple.png", scent: "Fresh Apple" },
  { day: "Friday", img: "/media/scent-fri-peanut.png", scent: "Peanut Butter" },
  { day: "Saturday", img: "/media/scent-sat-chicken.png", scent: "Roast Chicken" },
  { day: "Sunday", img: "/media/scent-sun-blueberry.png", scent: "Blueberry" },
];

export function ScentWheel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevIndex = activeIndex === 0 ? 6 : activeIndex - 1;
  const nextIndex = activeIndex === 6 ? 0 : activeIndex + 1;

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

        <div className="mx-auto mt-16 flex gap-2">
          {DAILY_ITEMS.map((item, index) => (
            <motion.div
              key={item.day}
              className="relative flex-0 shrink-0 w-20 h-32 overflow-hidden rounded-2xl border border-parchment bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={item.img}
                alt={item.day}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                style={{ transform: `translateX(${
                  (index - activeIndex) * 100
                }%) rotate(${activeIndex === index ? 0 : -10}deg)` }}
              />
              <div className="absolute inset-0 rounded-2xl background-gradient from-black/30 to-transparent" />
              <div className="absolute left-1/2 bottom-2 -translate-x-1/2 text-center">
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