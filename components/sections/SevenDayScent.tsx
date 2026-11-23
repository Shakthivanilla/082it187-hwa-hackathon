"use client";

import { PawIcon } from "@/components/icons";

const SEVEN_DAY_SCENT_DATA = [
  { id: "mon", day: "Monday", img: "/media/scent-mon-grass.png", scent: "Fresh Meadow Grass" },
  { id: "tue", day: "Tuesday", img: "/media/scent-tue-pine.png", scent: "Pine Forest" },
  { id: "wed", day: "Wednesday", img: "/media/scent-wed-herb.png", scent: "Wild Herb" },
  { id: "thu", day: "Thursday", img: "/media/scent-thu-apple.png", scent: "Fresh Apple" },
  { id: "fri", day: "Friday", img: "/media/scent-fri-peanut.png", scent: "Peanut Butter" },
  { id: "sat", day: "Saturday", img: "/media/scent-sat-chicken.png", scent: "Roast Chicken" },
  { id: "sun", day: "Sunday", img: "/media/scent-sun-blueberry.png", scent: "Blueberry" },
];

export function SevenDayScent() {
  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto text-center mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">7-Day Scent Rotation</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-ink md:text-5xl">A Week of Fresh Foraging</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-2">Seven different natural scents for your dog to explore.</p>
        </div>

        <div className="mx-auto flex flex-col md:flex-row gap-4 justify-center">
          {SEVEN_DAY_SCENT_DATA.map((day) => (
            <div
              key={day.id}
              className="relative flex-flex flex-col items-center gap-2"
            >
              <img
                src={day.img}
                alt={day.scent}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-200"
              />
              <p className="text-xs font-black text-ink text-center">{day.day}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}