"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PawIcon } from "@/components/icons";

const SEVEN_DAY_SCENT_DATA = [
  { id: "mon", day: "Monday", img: "/media/scent-mon-grass.png" },
  { id: "tue", day: "Tuesday", img: "/media/scent-tue-pine.png" },
  { id: "wed", day: "Wednesday", img: "/media/scent-wed-herb.png" },
  { id: "thu", day: "Thursday", img: "/media/scent-thu-apple.png" },
  { id: "fri", day: "Friday", img: "/media/scent-fri-peanut.png" },
  { id: "sat", day: "Saturday", img: "/media/scent-sat-chicken.png" },
  { id: "sun", day: "Sunday", img: "/media/scent-sun-blueberry.png" },
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
          <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-5xl">A Week of Fresh Foraging</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-2">Seven different natural scents for your dog to explore.</p>
        </div>

        {/* Horizontal Scroller */}
        <div className="mx-auto overflow-x-auto pb-6 pt-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-500">
          <div className="flex flex-nowrap gap-4" style={{ scrollBehavior: "auto" }}>
            {SEVEN_DAY_SCENT_DATA.map((day, i) => (
              <motion.div
                key={day.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveIndex(i)}
                className="flex-shrink-0 w-24 h-32 rounded-2xl overflow-hidden object-cover border-2 border-amber-200 group-hover:shadow-xl transition-shadow cursor-pointer"
              >
                <img
                  src={day.img}
                  alt={day.day}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <p className="text-xs font-black text-ink text-center mt-1">{day.day}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Day Spotlight Below Scroller */}
        <div className="mt-8 max-w-2xl mx-auto rounded-2xl bg-white/80 p-6 backdrop-blur">
          <div className="flex items-start gap-4">
            {/* Active Day Image */}
            <img
              src={currentDay.img}
              alt={currentDay.day}
              className="w-24 h-32 rounded-2xl object-contain flex-shrink-0"
            />
            {/* Active Day Details */}
            <div className="flex-1">
              <p className="text-lg font-black text-ink uppercase tracking-[0.2em]">{currentDay.day}</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-amber-600">{currentDay.day} scent</p>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3].map((paw) => (
              <PawIcon key={paw} size={14} className="text-amber-500" />
            ))}
          </div>
        </div>

        {/* Navigation + Pills */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setActiveIndex(prevIndex)}
            className="rounded-full bg-white/20 px-3 py-1.5 text-sm font-black text-ink transition-colors hover:bg-white/30"
            aria-label="Previous day"
            disabled={activeIndex === 0}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex(nextIndex)}
            className="rounded-full bg-white/20 px-3 py-1.5 text-sm font-black text-ink transition-colors hover:bg-white/30"
            aria-label="Next day"
          >
            Next
          </button>
          <div className="flex gap-1">
            {SEVEN_DAY_SCENT_DATA.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => setActiveIndex(SEVEN_DAY_SCENT_DATA.indexOf(day))}
                className={`rounded-full p-1.5 text-xs font-black transition-colors ${
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