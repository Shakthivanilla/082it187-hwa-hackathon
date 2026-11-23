"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PawIcon } from "@/components/icons";

const SEVEN_DAY_SCENT_DATA = [
  {
    id: "mon",
    day: "Monday",
    img: "/media/scent-mon-grass.png",
    scent: "Fresh Meadow Grass",
    sound: "Gentle rustle",
    puzzleRule: "One chamber at a time",
    difficulty: "Easy (1 paw)",
  },
  {
    id: "tue",
    day: "Tuesday",
    img: "/media/scent-tue-pine.png",
    scent: "Pine Forest",
    sound: "Light breeze",
    puzzleRule: "Slide-and-sniff two chambers",
    difficulty: "Easy (1 paw)",
  },
  {
    id: "wed",
    day: "Wednesday",
    img: "/media/scent-wed-herb.png",
    scent: "Wild Herb",
    sound: "Chirping birds",
    puzzleRule: "Rotate wheel to unlock",
    difficulty: "Medium (2 paws)",
  },
  {
    id: "thu",
    day: "Thursday",
    img: "/media/scent-thu-apple.png",
    scent: "Fresh Apple",
    sound: "Water trickle",
    puzzleRule: "Sequential timed release",
    difficulty: "Medium (2 paws)",
  },
  {
    id: "fri",
    day: "Friday",
    img: "/media/scent-fri-peanut.png",
    scent: "Peanut Butter",
    sound: "Crinkle wrap",
    puzzleRule: "Paw-toggle all six zones",
    difficulty: "Hard (3 paws)",
  },
  {
    id: "sat",
    day: "Saturday",
    img: "/media/scent-sat-chicken.png",
    scent: "Roast Chicken",
    sound: "Sizzle",
    puzzleRule: "Memory match zones",
    difficulty: "Hard (3 paws)",
  },
  {
    id: "sun",
    day: "Sunday",
    img: "/media/scent-sun-blueberry.png",
    scent: "Blueberry",
    sound: "Soft chime",
    puzzleRule: "Free-for-all kibble scatter",
    difficulty: "Easy (1 paw)",
  },
];

export function SevenDayScent() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevIndex = activeIndex === 0 ? 6 : activeIndex - 1;
  const nextIndex = activeIndex === 6 ? 0 : activeIndex + 1;

  const currentDay = SEVEN_DAY_SCENT_DATA[activeIndex];

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto text-center mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">7-Day Scent Rotation</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-5xl">A Week of Scents for Your Dog</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-2">Rotate through seven natural scents, one per day, to keep your dog's nose engaged and mind sharp.</p>
        </div>

        {/* Single Active Day Two-Column Spotlight */}
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT: Week Dial Image Frame with Day-Specific Fallback */}
          <motion.div
            key="active-day"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative flex-shrink-0 w-full md:w-1/2"
          >
            <img
              src="/media/scent-week-dial.png"
              alt={`7-Day Scent Rotation - ${currentDay.day}`}
              className="w-full aspect-[4/3] rounded-2xl overflow-hidden object-cover"
            />
            {/* Day-specific scent image overlay with fade when not default */}
            {currentDay.img !== "/media/scent-week-dial.png" && (
              <img
                src={currentDay.img}
                alt={currentDay.scent}
                className="absolute inset-0 rounded-2xl overflow-hidden object-cover opacity-20 transition-opacity duration-500"
                style={{ pointerEvents: "none" }}
              />
            )}
          </motion.div>

          {/* RIGHT: Active Day Details Pane */}
          <motion.div
            key="details-pane"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full md:w-1/2 space-y-4"
          >
            <div>
              <p className="text-lg font-black text-ink uppercase tracking-[0.2em]">{currentDay.day}</p>
              <p className="mt-2 text-2xl font-bold text-blue-700">{currentDay.scent}</p>
            </div>

            {/* Sound Cue */}
            <p className="mt-3 text-sm text-amber-600">{currentDay.sound}</p>

            {/* Puzzle Rule - normal wrapping text */}
            <p className="mt-3 text-sm text-amber-600 font-black uppercase tracking-[0.1em] leading-relaxed">{currentDay.puzzleRule}</p>

            {/* Difficulty Rating 1-3 paws with normal text flow */}
            <div className="mt-3 flex gap-1">
              {[1, 2, 3].map((paw) => (
                <PawIcon
                  key={paw}
                  size={18}
                  className="text-amber-500 fill-current transition-colors"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Navigation + 7 Day Selector Below Active Card */}
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => setActiveIndex(prevIndex)}
            className="flex-1 rounded-full bg-white/20 px-4 py-2 text-sm font-black text-ink transition-colors hover:bg-white/30"
            aria-label="Previous day"
            disabled={activeIndex === 0}
          >
            Previous
          </button>
<button
            type="button"
            onClick={() => setActiveIndex(nextIndex)}
            className="flex-1 rounded-full bg-white/20 px-4 py-2 text-sm font-black text-ink transition-colors hover:bg-white/30"
            aria-label="Next day"
          >
            Next
          </button>
          <div className="flex gap-2">
            {SEVEN_DAY_SCENT_DATA.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => setActiveIndex(SEVEN_DAY_SCENT_DATA.indexOf(day))}
                className={`rounded-full px-3 py-1.5 text-xs font-black transition-colors ${
                  activeIndex === SEVEN_DAY_SCENT_DATA.indexOf(day)
                    ? "bg-yellow-400 text-amber-950 border-yellow-400 shadow-yellow-400/30"
                    : "bg-transparent text-ink border-parchment"
                }`}
                aria-label={day.day}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}