"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PawIcon } from "@/components/icons";

const DAILY_ITEMS = [
  {
    day: "Monday",
    img: "/media/scent-mon-grass.png",
    scent: "Fresh Meadow Grass",
    puzzleRule: "Track the grass scent trail",
    difficulty: "Easy",
    sound: "Grass rustling",
  },
  {
    day: "Tuesday",
    img: "/media/scent-tue-pine.png",
    scent: "Pine Forest",
    puzzleRule: "Find the hidden pine cone",
    difficulty: "Medium",
    sound: "Wind through pine",
  },
  {
    day: "Wednesday",
    img: "/media/scent-wed-herb.png",
    scent: "Wild Herb",
    puzzleRule: "Identify the wild herb by smell",
    difficulty: "Medium",
    sound: "Herb garden breeze",
  },
  {
    day: "Thursday",
    img: "/media/scent-thu-apple.png",
    scent: "Fresh Apple",
    puzzleRule: "Guess the fruit scent",
    difficulty: "Easy",
    sound: "Apple falling",
  },
  {
    day: "Friday",
    img: "/media/scent-fri-peanut.png",
    scent: "Peanut Butter",
    puzzleRule: "Peanut butter lick test",
    difficulty: "Hard",
    sound: "Jar opening",
  },
  {
    day: "Saturday",
    img: "/media/scent-sat-chicken.png",
    scent: "Roast Chicken",
    puzzleRule: "Chicken scent trail",
    difficulty: "Hard",
    sound: "Cooking sizzle",
  },
  {
    day: "Sunday",
    img: "/media/scent-sun-blueberry.png",
    scent: "Blueberry",
    puzzleRule: "Blueberry bounty",
    difficulty: "Easy",
    sound: "Berry splash",
  },
];

export function ScentWheel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevIndex = activeIndex === 0 ? 6 : activeIndex - 1;
  const nextIndex = activeIndex === 6 ? 0 : activeIndex + 1;

  const currentItem = DAILY_ITEMS[activeIndex];

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

        <div className="mt-16 max-w-4xl mx-auto">
          <motion.div
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveIndex(activeIndex)}
          >
            <img
              src={currentItem.img}
              alt={currentItem.day}
              className="w-full h-full object-cover transition-transform duration-500"
            />
            <div
              className="absolute inset-0 rounded-2xl background-gradient from-black/30 to-transparent"
            />
            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 text-center">
              <p className="text-lg font-black text-ink">{currentItem.day}</p>
              <p className="mt-1 text-xl font-bold text-blue-700">{currentItem.scent}</p>
              <p className="mt-1 text-sm text-amber-600">{currentItem.puzzleRule}</p>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3].map((paw) => (
                  <PawIcon key={paw} size={14} className="text-amber-500" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setActiveIndex(prevIndex)}
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-black text-ink transition-colors"
            aria-label="Previous day"
            disabled={activeIndex === 0}
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