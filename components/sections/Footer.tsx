"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PawIcon } from "@/components/icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [pawClicks, setPawClicks] = useState(0);
  const [walking, setWalking] = useState(false);

  const handlePawClick = () => {
    const next = pawClicks + 1;
    setPawClicks(next);
    if (next >= 5) {
      setWalking(true);
      setPawClicks(0);
      window.setTimeout(() => setWalking(false), 2600);
    }
  };

  return (
    <footer className="relative bg-night text-cream">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <button
            type="button"
            onClick={handlePawClick}
            aria-label="ForageGrid paw"
            className="relative grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/5"
          >
            {walking ? (
              <motion.div
                key={walking ? "walk" : "idle"}
                initial={{ x: -160, opacity: 0 }}
                animate={{ x: 160, opacity: 1 }}
                exit={{ x: -160, opacity: 0 }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              >
                <PawIcon size={44} className="text-yellow-400" />
              </motion.div>
            ) : (
              <PawIcon size={44} className="text-yellow-400" />
            )}
          </button>

          <div className="flex flex-col items-center gap-3">
            <img src="/media/foragegrid-logo.png" alt="ForageGrid logo" className="h-14 w-auto" />
            <span className="text-2xl font-black tracking-tight text-cream">ForageGrid</span>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-cream/60">
            Smart forage console for happier dogs.
          </p>

          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.trim()) return;
              setSubscribed(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-yellow-400 px-6 text-sm font-black text-amber-950"
            >
              {subscribed ? "Subscribed" : "Join"}
            </button>
          </form>
          {subscribed ? <p className="text-xs font-bold text-yellow-400">You&apos;re on the list. (demo)</p> : null}

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-cream/60">
            <a href="#home" className="hover:text-cream">Home</a>
            <a href="#how-it-works" className="hover:text-cream">How it works</a>
            <a href="#day-away" className="hover:text-cream">A Day While You&apos;re Away</a>
            <a href="#safety" className="hover:text-cream">Safety</a>
            <a href="#faq" className="hover:text-cream">FAQ</a>
            <a href="#configure" className="hover:text-cream">Build Yours</a>
          </nav>

          <p className="text-xs text-cream/50">
            Made with yellow, blue, grey and browns - the colors your pets can see and enjoy.
          </p>
          <p className="text-xs font-bold text-cream/70">ForageGrid. Demo storefront.</p>
        </div>
      </div>
    </footer>
  );
}