"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForageGrid } from "@/lib/store";
import { useRouter } from "next/navigation";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const fmt = (value: number) => inr.format(value);

const PIN_LOCATIONS: Record<string, string> = {
  "560001": "Bengaluru, Karnataka",
  "600001": "Mumbai, Maharashtra",
  "110001": "Delhi, Delhi",
  "700001": "Ahmedabad, Gujarat",
  "400001": "Mumbai, Maharashtra",
};

const STEPS = ["Contact", "Address", "Review", "Pay"];

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useForageGrid((state) => state.cart);
  const [step, setStep] = useState(0);
  const [contact, setContact] = useState({ name: "", mobile: "" });
  const [address, setAddress] = useState({
    name: "",
    line: "",
    city: "",
    state: "",
    pin: "",
    gstin: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState("upi");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const validateContact = () => {
    const next: Record<string, string> = {};
    if (!contact.name.trim()) next.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(contact.mobile)) next.mobile = "Enter a valid 10 digit mobile";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateAddress = () => {
    const next: Record<string, string> = {};
    if (!address.name.trim()) next.name = "Name is required";
    if (!address.line.trim()) next.line = "Address is required";
    if (!/^\d{6}$/.test(address.pin)) next.pin = "Enter a valid 6 digit PIN";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (step === 0 && !validateContact()) return;
    if (step === 1 && !validateAddress()) return;
    setErrors({});
    setStep((value) => Math.min(3, value + 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((value) => Math.max(0, value - 1));
  };

  const handlePay = () => {
    router.push("/confirmation");
  };

  return (
    <main className="min-h-screen bg-cream px-6 py-24 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-ink md:text-4xl">
            Checkout
          </h1>
          <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-black text-amber-950">
            Test mode - no real change
          </span>
        </div>

        <div className="mt-8 flex items-center gap-2">
          {STEPS.map((label, index) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black ${
                  index <= step ? "bg-yellow-400 text-amber-950" : "bg-parchment text-ink-2"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`hidden text-xs font-black uppercase tracking-[0.18em] sm:block ${
                  index <= step ? "text-ink" : "text-ink-2"
                }`}
              >
                {label}
              </span>
              {index < STEPS.length - 1 ? (
                <span className="mx-2 h-0.5 flex-1 bg-parchment" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-3xl border border-parchment bg-white p-7 shadow-sm"
              >
                <h2 className="text-xl font-black text-ink">Contact</h2>
                <label className="mt-6 block text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                  Full name
                </label>
                <input
                  value={contact.name}
                  onChange={(event) => setContact({ ...contact, name: event.target.value })}
                  className="mt-2 h-14 w-full rounded-xl border border-parchment bg-cream px-6 text-sm font-bold text-ink"
                />
                {errors.name ? <p className="mt-2 text-xs font-bold text-red-700">{errors.name}</p> : null}

                <label className="mt-6 block text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                  Mobile ( +91 )
                </label>
                <input
                  value={contact.mobile}
                  onChange={(event) => setContact({ ...contact, mobile: event.target.value })}
                  className="mt-2 h-14 w-full rounded-xl border border-parchment bg-cream px-6 text-sm font-bold text-ink"
                />
                {errors.mobile ? <p className="mt-2 text-xs font-bold text-red-700">{errors.mobile}</p> : null}

                <div className="mt-8">
                  <h2 className="text-xl font-black text-ink">Payment method</h2>
                  <p className="mt-2 text-sm font-bold text-ink-2">
                    Select a payment method to proceed
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["upi", "UPI"],
                      ["gpay", "GPay"],
                      ["phonepe", "PhonePe"],
                      ["paytm", "Paytm"],
                      ["card", "Card"],
                      ["netbanking", "NetBanking"],
                      ["emi", "No-cost EMI"],
                      ["cod", "Cash on Delivery"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setPayment(value)}
                        className="rounded-2xl border p-3 text-left text-sm font-black transition-colors"
                        style={{
                          borderColor: payment === value ? "#facc15" : "#e7dcc8",
                          backgroundColor: payment === value ? "#fffbeb" : "#fffdf6",
                        }}
                      >
                        <span className="font-bold text-ink">{label}</span>
                        {payment === value ? (
                          <span className="text-xs text-amber-900">Selected</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}

            {step === 1 ? (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-3xl border border-parchment bg-white p-7 shadow-sm"
              >
                <h2 className="text-xl font-black text-ink">Address</h2>
                <label className="mt-6 block text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                  Full name
                </label>
                <input
                  value={address.name}
                  onChange={(event) => setAddress({ ...address, name: event.target.value })}
                  className="mt-2 h-14 w-full rounded-xl border border-parchment bg-cream px-6 text-sm font-bold text-ink"
                />
                {errors.name ? <p className="mt-2 text-xs font-bold text-red-700">{errors.name}</p> : null}

                <label className="mt-6 block text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                  Street address
                </label>
                <input
                  value={address.line}
                  onChange={(event) => setAddress({ ...address, line: event.target.value })}
                  className="mt-2 h-14 w-full rounded-xl border border-parchment bg-cream px-6 text-sm font-bold text-ink"
                />
                {errors.line ? <p className="mt-2 text-xs font-bold text-red-700">{errors.line}</p> : null}

                <label className="mt-6 block text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                  City
                </label>
                <input
                  value={address.city}
                  onChange={(event) => setAddress({ ...address, city: event.target.value })}
                  className="mt-2 h-14 w-full rounded-xl border border-parchment bg-cream px-6 text-sm font-bold text-ink"
                />
                {errors.city ? <p className="mt-2 text-xs font-bold text-red-700">{errors.city}</p> : null}

                <label className="mt-6 block text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                  PIN ( 6 digits )
                </label>
                <input
                  value={address.pin}
                  onChange={(event) => setAddress({ ...address, pin: event.target.value })}
                  className="mt-2 h-14 w-full rounded-xl border border-parchment bg-cream px-6 text-sm font-bold text-ink"
                />
                {errors.pin ? <p className="mt-2 text-xs font-bold text-red-700">{errors.pin}</p> : null}

                <label className="mt-6 block text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                  GSTIN (optional)
                </label>
                <input
                  value={address.gstin}
                  onChange={(event) => setAddress({ ...address, gstin: event.target.value })}
                  className="mt-2 h-14 w-full rounded-xl border border-parchment bg-cream px-6 text-sm font-bold text-ink"
                />

                <div className="mt-8">
                  <button type="button" onClick={goBack} className="rounded-full border border-parchment bg-white min-h-14 px-8 py-3 text-sm font-black text-ink">
                    Back
                  </button>
                  <button type="button" onClick={goNext} className="rounded-full bg-yellow-400 min-h-14 px-8 py-3 text-sm font-black text-amber-950 mt-4">
                    Next
                  </button>
                </div>
              </motion.div>
            ) : null}

            {step === 2 ? (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-3xl border border-parchment bg-white p-7 shadow-sm"
              >
                <h2 className="text-xl font-black text-ink">Review & Pay</h2>
                <div className="mt-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                    Cart items
                  </p>
                  {cart.length === 0 ? (
                    <p className="mt-2 text-sm font-bold text-red-700">Your cart is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 border-b border-parchment pb-3 mb-3"
                      >
                        <img
                          src="/media/foragegrid-app.png"
                          alt={item.name}
                          className="h-10 w-10 rounded-2xl border border-parchment bg-white object-contain"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-black text-ink">{item.name}</p>
                          <p className="text-sm font-bold text-blue-700">{fmt(item.price)} each</p>
                        </div>
                        <p className="text-sm font-black text-ink">{fmt(item.price)}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                    Sub total
                  </span>
                  <span className="text-2xl font-black text-ink">{fmt(total)}</span>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                    GST inclusive total
                  </p>
                  <span className="text-2xl font-black text-ink">{fmt(total)}</span>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    ["upi", "UPI"],
                    ["gpay", "GPay"],
                    ["phonepe", "PhonePe"],
                    ["paytm", "Paytm"],
                    ["card", "Card"],
                    ["netbanking", "NetBanking"],
                    ["emi", "No-cost EMI"],
                    ["cod", "Cash on Delivery"],
                  ].map(([value, label]) => (
                    <div
                      key={value}
                      className="rounded-2xl border p-3 text-left text-sm font-black"
                      style={{
                        borderColor: payment === value ? "#facc15" : "#e7dcc8",
                        backgroundColor: payment === value ? "#fffbeb" : "#fffdf6",
                      }}
                    >
                      <span className="font-bold text-ink">{label}</span>
                      {payment === value ? (
                        <span className="text-xs text-amber-900">Selected</span>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button type="button" onClick={goBack} className="rounded-full border border-parchment bg-white min-h-14 px-8 py-3 text-sm font-black text-ink">
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePay}
                    className="rounded-full bg-yellow-400 min-h-14 px-8 py-3 text-sm font-black text-amber-950"
                  >
                    Pay {fmt(total)}
                  </button>
                </div>
              </motion.div>
            ) : null}

            {step === 3 ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-3xl border border-parchment bg-white p-7 shadow-sm"
              >
                <h2 className="text-xl font-black text-ink">Processing</h2>
                <p className="mt-4 text-sm font-semibold text-ink-2">
                  Contacting the payment gateway. Please wait.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}