"use client";

import { motion } from "framer-motion";

const POINTS = [
  { title: "Chew-Proof & Cordless", text: "No exposed cords for curious chewers. The battery-powered console sits safely on the floor." },
  { title: "Dishwasher-Safe Chambers", text: "Pop-out chambers rinse clean while every surface stays food-safe and secured." },
  { title: "All-Day Battery + USB-C", text: "Recharges via USB-C and runs multiple days on a single charge." },
  { title: "Food-Safe, BPA-Free", text: "Every surface your dog touches is food-safe and non-toxic." },
];

const BADGES = ["Chew-Proof", "Dishwasher-Safe", "USB-C Battery", "Food-Safe"];

export function Safety() {
  return (
    <section id="safety" className="relative bg-cream py-24 scroll-mt-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="overflow-hidden rounded-3xl border border-parchment bg-white shadow-sm"
          >
            <motion.img
              src="/media/foragegrid-cleaning.png"
              alt="ForageGrid cleaning and safety"
              animate={{ scale: [1, 1.07], x: [0, 26] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="h-[420px] w-full object-cover"
            />
          </motion.div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">Safety & Clean-Up</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-5xl">Safe by design, clean by default</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">
              The console is built to be trusted around paws, snouts and enthusiastic play.
            </p>

            <ul className="mt-8 space-y-5">
              {POINTS.map((point, index) => (
                <motion.li
                  key={point.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.08 * index, ease: "easeOut" }}
                  className="flex gap-4"
                >
                  <span className="mt-1 h-6 w-6 shrink-0 rounded-full bg-yellow-400" />
                  <div>
                    <h3 className="text-lg font-black text-ink">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{point.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {BADGES.map((badge, index) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.08 * (index + 2), ease: "easeOut" }}
                  className="rounded-full border border-parchment bg-white px-4 py-2 text-xs font-bold text-ink-2 shadow-sm"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}