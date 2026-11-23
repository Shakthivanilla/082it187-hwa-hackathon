"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { BoneIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useForageGrid } from "@/lib/store";

const CONSOLE_PRICE = 2999;
const MONTHLY_REFRESH = 699;
const YEARLY_REFRESH = 549;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const fmt = (value: number) => inr.format(value);

const BREED_COLORS: Record<string, string> = {
  "Scent Hounds": "#facc15",
  "Working Brains": "#60a5fa",
  "Earth Dogs": "#a16207",
  "Power Chewers": "#b45309",
};

const AGES = [
  { id: "puppy", label: "Puppy", img: "/media/puppy.png" },
  { id: "lifestyle", label: "Lifestyle", img: "/media/lifestyle-golden.png" },
  { id: "senior", label: "Senior", img: "/media/senior.png" },
];

const BREEDS = ["Scent Hounds", "Working Brains", "Earth Dogs", "Power Chewers"];
const PLANS = ["One-time Console", "Monthly Refresh Pack", "Yearly Refresh Pack"];

export function BuildYourForageGrid() {
  const router = useRouter();
  const [age, setAge] = useState("puppy");
  const [breed, setBreed] = useState("Scent Hounds");
  const [plan, setPlan] = useState("One-time Console");
  const addItem = useForageGrid((state) => state.addItem);
  const [flyKey, setFlyKey] = useState(0);

  const refresh = plan === "One-time Console" ? 0 : plan === "Monthly Refresh Pack" ? MONTHLY_REFRESH : YEARLY_REFRESH;
  const total = CONSOLE_PRICE + refresh;
  const monthlyTotal = CONSOLE_PRICE + MONTHLY_REFRESH;
  const yearlyTotal = CONSOLE_PRICE + YEARLY_REFRESH;
  const breedColor = BREED_COLORS[breed] ?? "#facc15";

  const handleAddToCart = () => {
    addItem({ id: "foragegrid-console", name: `ForageGrid - ${breed}`, price: CONSOLE_PRICE, qty: 1 });
    router.push("/checkout");
  };

  return (
    <section id="configure" className="relative bg-cream py-24 scroll-mt-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">Build Yours</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-5xl">Build Your ForageGrid</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            Pick your dog, breed style and refresh plan. The console updates live.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl items-start gap-12 px-6 md:px-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-parchment bg-white p-7 shadow-sm md:p-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {AGES.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setAge(option.id)}
                className="group flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-colors"
                style={{
                  borderColor: age === option.id ? "#facc15" : "#e7dcc8",
                  backgroundColor: age === option.id ? "#fffbeb" : "#fffdf6",
                }}
              >
                <img src={option.img} alt={option.label} className="h-20 w-20 object-contain" />
                <span className="text-sm font-black text-ink">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-2">Breed Style</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {BREEDS.map((breedOption) => (
                <button
                  key={breedOption}
                  type="button"
                  onClick={() => setBreed(breedOption)}
                  className="rounded-full border px-5 py-2.5 text-sm font-bold transition-colors"
                  style={{
                    borderColor: breed === breedOption ? "#facc15" : "#e7dcc8",
                    backgroundColor: breed === breedOption ? "#facc15" : "#fffdf6",
                    color: breed === breedOption ? "#451a03" : "#4b4e57",
                  }}
                >
                  {breedOption}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-2">Plan</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PLANS.map((planOption) => {
                const isActive = plan === planOption;
                return (
                  <button
                    key={planOption}
                    type="button"
                    onClick={() => setPlan(planOption)}
                    className="rounded-2xl border p-4 text-left transition-colors"
                    style={{
                      borderColor: isActive ? "#facc15" : "#e7dcc8",
                      backgroundColor: isActive ? "#fffbeb" : "#fffdf6",
                    }}
                  >
                    <span className="block text-sm font-black text-ink">{planOption}</span>
                    <span className="mt-1 block text-xs font-bold text-blue-700">
                      {planOption === "One-time Console"
                        ? fmt(CONSOLE_PRICE)
                        : planOption === "Monthly Refresh Pack"
                          ? `${fmt(monthlyTotal)}/mo`
                          : `${fmt(yearlyTotal)}/yr`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-cream p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-ink-2">Live Total</span>
              <span className="text-4xl font-black text-ink">{fmt(total)}</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-ink-2">
              {plan === "One-time Console"
                ? `${fmt(CONSOLE_PRICE)} one-time`
                : plan === "Monthly Refresh Pack"
                  ? `${fmt(monthlyTotal)} per month`
                  : `${fmt(yearlyTotal)} per year`}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {plan === "Yearly Refresh Pack" ? (
                <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-black text-amber-950">
                  Best value * Save INR 1,000
                </span>
              ) : null}
              {plan === "Yearly Refresh Pack" ? (
                <span className="rounded-full border border-parchment bg-white px-4 py-2 text-xs font-bold text-ink-2">
                  No-cost EMI from INR 667/month
                </span>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-7 py-4 text-[15px] font-black text-amber-950"
            >
              Add to Cart
            </button>
            <motion.div
              key={flyKey}
              className="pointer-events-none absolute -top-2 right-6 text-yellow-500"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: [0, 60, 110], y: [0, -70, -120], opacity: [1, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <BoneIcon size={30} />
            </motion.div>          </div>

          <p className="mt-6 text-center text-xs font-semibold text-ink-2">
            Free delivery across India · Prices include 18% GST (GST inclusive).
          </p>
        </div>

        <div className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-3xl border border-parchment bg-white shadow-sm">
            <div className="aspect-[4/3]">
              <HeroCanvas color={breedColor} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}