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
    auraColor: "from-amber-500 via-yellow-500 to-amber-200",
  },
  {
    id: "tue",
    day: "Tuesday",
    img: "/media/scent-tue-pine.png",
    scent: "Pine Forest",
    sound: "Light breeze",
    puzzleRule: "Slide-and-sniff two chambers",
    difficulty: "Easy (1 paw)",
    auraColor: "from-green-500 via-emerald-500 to-green-200",
  },
  {
    id: "wed",
    day: "Wednesday",
    img: "/media/scent-wed-herb.png",
    scent: "Wild Herb",
    sound: "Chirping birds",
    puzzleRule: "Rotate wheel to unlock",
    difficulty: "Medium (2 paws)",
    auraColor: "from-orange-500 via-amber-500 to-orange-200",
  },
  {
    id: "thu",
    day: "Thursday",
    img: "/media/scent-thu-apple.png",
    scent: "Fresh Apple",
    sound: "Water trickle",
    puzzleRule: "Sequential timed release",
    difficulty: "Medium (2 paws)",
    auraColor: "from-red-500 via-orange-500 to-red-200",
  },
  {
    id: "fri",
    day: "Friday",
    img: "/media/scent-fri-peanut.png",
    scent: "Peanut Butter",
    sound: "Crinkle wrap",
    puzzleRule: "Paw-toggle all six zones",
    difficulty: "Hard (3 paws)",
    auraColor: "from-purple-500 via-pink-500 to-purple-200",
  },
  {
    id: "sat",
    day: "Saturday",
    img: "/media/scent-sat-chicken.png",
    scent: "Roast Chicken",
    sound: "Sizzle",
    puzzleRule: "Memory match zones",
    difficulty: "Hard (3 paws)",
    auraColor: "from-red-500 via-orange-500 to-amber-200",
  },
  {
    id: "sun",
    day: "Sunday",
    img: "/media/scent-sun-blueberry.png",
    scent: "Blueberry",
    sound: "Soft chime",
    puzzleRule: "Free-for-all kibble scatter",
    difficulty: "Easy (1 paw)",
    auraColor: "from-blue-500 via-light-blue-500 to-sky-200",
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

        {/* Day Pill Navigation */}
        <div className="mx-auto mb-12 flex gap-2">
          {SEVEN_DAY_SCENT_DATA.map((day) => (
            <button
              key={day.id}
              type="button"
              onClick={() => setActiveIndex(SEVEN_DAY_SCENT_DATA.indexOf(day))}
              className={`rounded-full px-4 py-2 text-sm font-black transition-colors ${
                activeIndex === SEVEN_DAY_SCENT_DATA.indexOf(day) ? "bg-yellow-400 text-amber-950 border-yellow-400 shadow-yellow-400/30 scale-[1.02]" : "bg-transparent text-ink border-parchment"
              } ${activeIndex === SEVEN_DAY_SCENT_DATA.indexOf(day) ? "font-bold" : ""}`}
              aria-label={day.day}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Two-column Stage: Active Day (left) + Details (right) */}
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT: Active Day Image with Palette Aura */}
          <motion.div
            key="active-day"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative flex-shrink-0 w-full md:w-1/2 rounded-xl overflow-hidden shadow-2xl"
            style={{
              transform: `scale(${activeIndex === 0 ? 1 : 0.95})`,
            }}
          >
            <img
              src={currentDay.img}
              alt={currentDay.scent}
              className="w-full h-[400px] object-cover"
              style={{
                borderRadius: activeIndex === 0 ? "12px 12px 0 0" : "0",
              }}
            />
            {/* Soft pulsing palette aura - only on active day */}
            <div
              className={`absolute inset-0 rounded-xl opacity-30 transition-opacity duration-200 ${
                activeIndex === 0 ? "from-amber-500 via-yellow-500 to-amber-200" : ""
              }`}
            />
            {/* Difficulty meter on image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <PawIcon size={10} className="text-amber-500" />
                <span>{currentDay.difficulty}</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Day Details Pane */}
          <motion.div
            key="details-pane"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full md:w-1/2 space-y-6 text-center"
          >
            <div>
              <p className="text-lg font-black text-ink uppercase tracking-[0.2em]">{currentDay.day}</p>
              <p className="mt-2 text-3xl font-bold text-blue-700">{currentDay.scent}</p>
            </div>

            {/* Sound Label/Icon */}
            <div className="flex items-center justify-center gap-2">
              <PawIcon size={16} className="text-amber-500" />
              <span className="text-amber-400 text-sm">{currentDay.sound}</span>
            </div>

            {/* Puzzle Rule */}
            <p className="mt-3 text-sm text-amber-600 font-black uppercase tracking-[0.1em]">{currentDay.puzzleRule}</p>

            {/* Difficulty Meter Visual */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {[1, 2, 3].map((paw) => (
                <PawIcon
                  key={paw}
                  size={20}
                  className={`text-amber-500 ${
                    paw <= 3 ? "filled" : "outline"
                  } transition-colors`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setActiveIndex(prevIndex)}
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-black text-ink transition-colors hover:bg-white/30"
            aria-label="Previous day"
            disabled={activeIndex === 0}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex(nextIndex)}
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-black text-ink transition-colors hover:bg-white/30"
            aria-label="Next day"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}