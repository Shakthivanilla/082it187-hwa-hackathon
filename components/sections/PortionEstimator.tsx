"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ACTIVITIES = ["Sedentary", "Moderate", "High"];

const kgFactor = (age: string) =>
  age === "puppy" ? 0.065 : age === "senior" ? 0.025 : 0.025;

export function PortionEstimator() {
  const [weight, setWeight] = useState(15);
  const [age, setAge] = useState("adult");
  const [activity, setActivity] = useState("Moderate");

  const multiplier = activity === "Sedentary" ? 1 : activity === "Moderate" ? 1.15 : 1.3;
  const dailyGrams = Math.round(weight * kgFactor(age) * multiplier);
  const cups = Math.round((dailyGrams / 250) * 10) / 10;
  const feedsPerDay = Math.max(1, Math.round(dailyGrams / 250));
  const bowlFill = Math.min(100, Math.round((dailyGrams / 600) * 100));

  const difficulty =
    age === "puppy" || age === "senior"
      ? "Easy"
      : weight > 40 || activity === "High"
        ? "Hard"
        : weight > 25
          ? "Medium"
          : "Easy";

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">Portion Estimator</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-5xl">Feed the body, not the boredom</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">Demo estimates only - always confirm with your vet.</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 rounded-3xl border border-parchment bg-white p-7 shadow-sm md:p-10 lg:grid-cols-2">
          <div>
            <label className="text-xs font-black uppercase tracking-[0.2em] text-ink-2" htmlFor="weight-slider">
              Dog weight - kg
            </label>
            <input
              id="weight-slider"
              type="range"
              min={2}
              max={60}
              step={1}
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value))}
              className="mt-4 w-full accent-yellow-500"
            />
            <div className="mt-2 flex justify-between text-xs font-bold text-ink-2">
              <span>2 kg</span>
              <span>60 kg</span>
            </div>

            <label className="mt-8 block text-xs font-black uppercase tracking-[0.2em] text-ink-2" htmlFor="age-select">
              Age
            </label>
            <select
              id="age-select"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              className="mt-3 w-full rounded-xl border border-parchment bg-cream p-3 font-bold text-ink"
            >
              <option value="puppy">Puppy</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>

            <label className="mt-6 block text-xs font-black uppercase tracking-[0.2em] text-ink-2" htmlFor="activity-select">
              Activity
            </label>
            <select
              id="activity-select"
              value={activity}
              onChange={(event) => setActivity(event.target.value)}
              className="mt-3 w-full rounded-xl border border-parchment bg-cream p-3 font-bold text-ink"
            >
              {ACTIVITIES.map((activityOption) => (
                <option key={activityOption} value={activityOption}>
                  {activityOption}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative h-56 w-56">
              <div className="absolute inset-0 rounded-full border-8 border-parchment" />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-yellow-400"
                initial={{ height: 0, opacity: 0.85 }}
                animate={{ height: `${bowlFill}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl bg-cream p-4">
                <p className="text-2xl font-black text-ink">{dailyGrams}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-ink-2">Daily grams</p>
              </div>
              <div className="rounded-2xl bg-cream p-4">
                <p className="text-2xl font-black text-ink">{cups}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-ink-2">Cups</p>
              </div>
              <div className="rounded-2xl bg-cream p-4">
                <p className="text-2xl font-black text-ink">{feedsPerDay}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-ink-2">Feeds / day</p>
              </div>
            </div>
            <p className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-black text-amber-950">Difficulty: {difficulty}</p>
          </div>
        </div>
      </div>
    </section>
  );
}