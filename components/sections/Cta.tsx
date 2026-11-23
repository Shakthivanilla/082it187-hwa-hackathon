"use client";

import { motion } from "framer-motion";
import { CtaButton } from "./CtaButton";

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-yellow-400 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-amber-950 md:text-5xl">
              Give them something to look forward to.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-amber-950/80">
              Mealtime becomes the best part of the day again. Configure the console, pick the
              plan, and let the foraging begin.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="overflow-hidden rounded-3xl border border-amber-950/20 bg-white/70 shadow-lg"
          >
            <motion.img
              src="/media/foragegrid-app.png"
              alt="ForageGrid app"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="h-[340px] w-full object-cover"
            />
          </motion.div>
        </div>
        <div className="mt-12 text-center">
          <CtaButton />
        </div>
      </div>
    </section>
  );
}