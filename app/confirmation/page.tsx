"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BoneIcon, PawIcon } from "@/components/icons";
import { formatEnInFullDate } from "@/lib/format";

const PARTICLES = [
  { left: "5%", delay: 0, drift: -40, size: 20, color: "#facc15" },
  { left: "12%", delay: 0.2, drift: 30, size: 16, color: "#60a5fa" },
  { left: "20%", delay: 0.4, drift: -25, size: 22, color: "#facc15" },
  { left: "30%", delay: 0.1, drift: 45, size: 14, color: "#d97706" },
  { left: "40%", delay: 0.5, drift: -35, size: 18, color: "#60a5fa" },
  { left: "50%", delay: 0.3, drift: 20, size: 24, color: "#facc15" },
  { left: "60%", delay: 0.6, drift: -50, size: 16, color: "#a16207" },
  { left: "70%", delay: 0.2, drift: 40, size: 20, color: "#facc15" },
  { left: "80%", delay: 0.5, drift: -30, size: 18, color: "#60a5fa" },
  { left: "88%", delay: 0.1, drift: 35, size: 22, color: "#d97706" },
];

const TIMELINE = [
  "Order placed",
  "Payment confirmed",
  "Foraging scheduled",
  "Shipped",
  "Delivered",
];

export default function ConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState("FG-482913");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOrderNumber(`FG-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const [emailStatus, setEmailStatus] = useState<"Sending" | "Sent">("Sending");
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEmailStatus("Sent");
      const delivery = new Date();
      delivery.setDate(delivery.getDate() + 3);
      setDeliveryDate(delivery);
    }, 600);
    const ticker = window.setInterval(() => {
      setActiveStep((value) => Math.min(TIMELINE.length - 1, value + 1));
    }, 1800);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(ticker);
    };
  }, []);


  const inr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  const fmt = (value: number) => inr.format(value);

  return (
    <main className="relative min-h-screen overflow-hidden bg-night px-6 py-24 text-cream md:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {PARTICLES.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute top-0"
            style={{ left: particle.left }}
            initial={{ y: "-12%", opacity: 0, x: 0 }}
            animate={{ y: "112%", opacity: [0, 1, 0], x: [0, particle.drift, 0] }}
            transition={{
              duration: 2.4,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeIn",
            }}
          >
            {index % 2 === 0 ? (
              <BoneIcon size={particle.size} className="text-yellow-400" />
            ) : (
              <PawIcon size={particle.size} className="text-yellow-400" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur md:p-12">
        <h1 className="text-4xl font-black tracking-tight text-cream md:text-5xl">
          Order Confirmed!
        </h1>
        <p className="mt-4 text-lg font-semibold text-cream/70">
          Thank you for trusting ForageGrid. Your dog is about to get very busy.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cream/50">
              Order
            </p>
            <p className="mt-2 text-xl font-black text-cream">{orderNumber}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cream/50">
              INR total
            </p>
            <p className="mt-2 text-xl font-black text-yellow-400">{fmt(7999)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cream/50">
              Delivery
            </p>
            <p className="mt-2 text-xl font-black text-cream">{deliveryDate ? formatEnInFullDate(deliveryDate) : "-"}</p>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cream/50">
            Order timeline
          </p>
          <ol className="mt-5 flex flex-col gap-3 text-left">
            {TIMELINE.map((label, index) => (
              <motion.li
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index <= activeStep ? 1 : 0.45,
                  x: index <= activeStep ? 0 : -20,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <span
                  className="grid h-8 w-8 place-items-center rounded-full text-xs font-black"
                  style={{
                    backgroundColor: index <= activeStep ? "#facc15" : "#232733",
                    color: index <= activeStep ? "#451a03" : "#8b8fa3",
                  }}
                >
                  {index + 1}
                </span>
                <span className="text-sm font-bold text-cream">{label}</span>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cream/50">
            Email status
          </p>
          <p className="mt-2 text-sm font-bold text-cream">
            {emailStatus === "Sending" ? "Sending.." : "Sent"}
          </p>
        </div>

        <p className="mt-8 text-sm font-semibold text-cream/60">
          We will send your order updates over SMS and WhatsApp. No real charge happens in this test.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-yellow-400 px-8 text-[15px] font-black text-amber-950"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}