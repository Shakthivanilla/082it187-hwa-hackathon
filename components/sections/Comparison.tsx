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

const PRODUCTS = {
  ForageGrid: {
    price: "₹2,999",
    features: ["6-zone console", "6-chamber scent wheel", "Daily WiFi games"],
  },
  "Stuffed Chew Toy": {
    price: "₹899",
    features: ["Stuffing", "Squeaker", "Basic chew"],
  },
  "Puzzle Toy": {
    price: "₹1,299",
    features: ["Treat compartments", "Difficulty levels"],
  },
  "Automatic Feeder": {
    price: "₹3,499",
    features: ["Scheduled meals", "Portion control", "App control"],
  },
  "Camera Treat Tosser": {
    price: "₹4,999",
    features: ["Remote tossing", "Video streaming", "Motion detection"],
  },
};

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
              {[
                "Boredom",
                "Separation Stress",
                "Portion Control",
                "Clean-Up",
                "Daily Novelty",
              ].map((need) => {
                const forageFeatures = PRODUCTS.ForageGrid.features.join(", ");
                return (
                  <tr key={need} className="border-t border-parchment">
                    <td className="px-6 py-5 text-base font-bold text-ink">{need}</td>
                    <td className="px-6 py-5">
                      <AnimatedCheck />
                      <span className="text-ink ml-2">{forageFeatures}</span>
                    </td>
                    <td className="px-6 py-5 text-ink-2">{PRODUCTS["Stuffed Chew Toy"].features[0]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Product price table below */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-5">
          {[
            { name: "ForageGrid", price: PRODUCTS.ForageGrid.price, isForageGrid: true },
            { name: "Stuffed Chew Toy", price: PRODUCTS["Stuffed Chew Toy"].price },
            { name: "Puzzle Toy", price: PRODUCTS["Puzzle Toy"].price },
            { name: "Auto. Feeder", price: PRODUCTS["Automatic Feeder"].price },
            { name: "Camera Toser", price: PRODUCTS["Camera Treat Tosser"].price },
          ].map((product) => (
            <div
              key={product.name}
              className="rounded-2xl border border-parchment bg-white p-4 shadow-sm text-center"
              style={{ borderColor: product.isForageGrid ? "#facc15" : "transparent" }}
            >
              <p className="font-black text-ink">{product.name}</p>
              <p className="mt-2 text-2xl font-bold text-amber-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}