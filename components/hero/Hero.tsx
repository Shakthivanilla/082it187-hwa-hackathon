"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { HeroCanvas } from "./HeroCanvas";
import { HeroVideoModal } from "./HeroVideoModal";
import { Magnetic } from "@/components/magnetic";
import { PawIcon, PlayIcon, ChevronRightIcon } from "@/components/icons";

const PAW_ANIMATION_DELAY = 1500;

// Check if user has visited before
const HAS_VISITED = typeof window !== "undefined" && localStorage.getItem("foragegrid_visited") === "1";

export function Hero() {
  // Mark as visited on first render (or after delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("foragegrid_visited", "1");
    }, PAW_ANIMATION_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const [videoPaused, setVideoPaused] = useState(!HAS_VISITED);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePause = () => setVideoPaused(!videoPaused);
  const handleSkip = () => setModalOpen(false);

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-night text-cream"
    >
      {/* Paw loading animation only on first visit */}
      {HAS_VISITED ? null : (
        <div
          className="fixed inset-0 flex items-center justify-center z-[500]"
          style={{ backgroundColor: "#0e1014" }}
        >
          <div className="text-center">
            <PawIcon size={80} className="mb-4 text-yellow-400 animate-paw-bounce" />
            <p className="text-2xl font-black text-cream">ForageGrid</p>
            <p className="text-sm text-cream/60">Loading your personalized experience...</p>
          </div>
        </div>
      )}

      {/* Video background */}
      <div className="relative h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover h-full w-full"
          src="/media/foragegrid-demo.mp4"
        />
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ backgroundColor: "rgba(14, 16, 20, 0.5)" }}
        >
          <img
            src="/media/foragegrid-hero.png"
            alt="ForageGrid hero image - dog at home"
            className="max-w-80 mx-auto rounded-xl border border-white/20 bg-white/5"
          />
        </div>

        {/* Play/pause toggle */}
        <button
          onClick={handlePause}
          className="absolute top-6 right-6 rounded-full bg-white/90 backdrop-blur px-5 py-2 text-sm font-black text-amber-950 transition-colors hover:scale-[1.05]"
          aria-label={videoPaused ? "Play video" : "Pause video"}
        >
          <PlayIcon size={20} className="mr-2" />
          {videoPaused ? "Play" : "Pause"}
        </button>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-6 py-3 text-sm font-black text-cream transition-colors"
          aria-label="Skip video intro"
        >
          Skip
        </button>
      </div>

      {/* Hero content overlay */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-28 pb-20 sm:px-8">
        <div className="hero-copy max-w-3xl">
          <p className="hero-kicker inline-flex items-center rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-yellow-400">
            New | Cordless | Chew-Proof | Smart
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[1.04] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            The 6-Zone Forage Console that Turns Lonely Hours into Sniffing,
            Solving & Calm
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70 md:text-xl">
            A 6-zone smart floor console with a 6-chamber scent wheel and daily
            WiFi game updates that dispense your dog&apos;s regular kibble -
            stopping boredom before it starts, keeping separation stress low,
            and skipping the long morning clean-up.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.4} className="inline-block">
              <a
                href="#configure"
                className="group inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-4 text-[15px] font-black text-amber-950 shadow-lg shadow-yellow-400/30 transition-transform hover:scale-[1.03]"
              >
                Configure Yours
                <ChevronRightIcon
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <span className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-cream/50">
          <PawIcon size={22} className="animate-paw text-yellow-400" />
          Scroll
        </span>
      </button>
    </section>
  );
}