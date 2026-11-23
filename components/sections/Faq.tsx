"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  { q: "Is ForageGrid safe for chewers?", a: "Yes. The console is chew-proof and cordless with no exposed cords. All chambers are food-safe and secured so dogs cannot reach internals." },
  { q: "How long does the battery last?", a: "The cordless battery runs multiple days on a charge and recharges via USB-C." },
  { q: "Is it dishwasher-safe?", a: "Yes. The kibble chambers pop out and are dishwasher-safe, so clean-up is quick." },
  { q: "Can I use my dog's regular kibble?", a: "Yes. ForageGrid dispenses your dog's regular kibble with portion tuning from weight and age." },
  { q: "Do I need WiFi?", a: "WiFi powers the daily game updates. The core scent and foraging play works offline." },
  { q: "Can my pet order from HappyWhileAway?", a: "Yes, pets can order, but the human pays. Checkout is UPI-first." },
  { q: "What is included in the price?", a: "The price is GST inclusive. Free delivery is included across India." },
  { q: "How does the difficulty wheel work?", a: "Each day maps to a scent and a 1 to 3 paw difficulty rating." },
  { q: "What if the dog destroys a part?", a: "The 30-day happiness guarantee covers manufacturing defects. Power chewers can start with the chew-proof shell." },
  { q: "Do dogs need real rest?", a: "Yes. Naps are healthy. ForageGrid fills the hours that would otherwise be lonely boredom." },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">FAQ</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-5xl">Frequently asked questions</h2>
        </div>
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="grid gap-4">
            {FAQS.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div key={faq.q} className="rounded-2xl border border-parchment bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-black text-ink">{faq.q}</span>
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-amber-950 transition-transform"
                      style={{ backgroundColor: open ? "#facc15" : "#f3ead9", transform: open ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        key={faq.q}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-ink-2">{faq.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}