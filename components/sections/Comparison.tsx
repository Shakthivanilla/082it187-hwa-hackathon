"use client";

import { motion } from "framer-motion";

function AnimatedCheck() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <motion.path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

const ROWS = [
  { need: "Boredom", grid: true, toy: false },
  { need: "Separation Stress", grid: true, toy: false },
  { need: "Portion Control", grid: true, toy: false },
  { need: "Clean-Up", grid: true, toy: false },
  { need: "Daily Novelty", grid: true, toy: false },
];

export function Comparison() {
  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">Comparison</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-5xl">Why not just a toy?</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            A toy is a toy until the hours get long. Here is the honest breakdown.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-parchment bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-cream">
                <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-ink-2">Need</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-ink-2">ForageGrid</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-ink-2">Typical Toy</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.need} className="border-t border-parchment">
                  <td className="px-6 py-5 text-base font-bold text-ink">{row.need}</td>
                  <td className="px-6 py-5">
                    {row.grid ? <AnimatedCheck /> : <span className="text-ink-2">-</span>}
                  </td>
                  <td className="px-6 py-5 text-ink-2">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}