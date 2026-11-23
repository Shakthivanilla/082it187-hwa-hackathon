"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { HeroCanvas } from "./HeroCanvas";
import { HeroVideoModal } from "./HeroVideoModal";
import { Magnetic } from "@/components/magnetic";
import { PawIcon, PlayIcon, ChevronRightIcon, XIcon } from "@/components/icons";

const PAW_ANIMATION_DELAY = 1500;

export function Hero() {
  const [showPaw, setShowPaw] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);

  useEffect(() => {
    // Always show paw animation on first visit, hide after delay
    const timer = setTimeout(() => setShowPaw(false), PAW_ANIMATION_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const handlePause = () => setVideoPaused(!videoPaused);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Trust badges data
  const trustBadges = [
    { title: "Free delivery across India", href: "#" },
    { title: "Cash on Delivery available", href: "#" },
    { title: "30-day happy-dog guarantee", href: "#" },
    { title: "1-year warranty", href: "#" },
  ];

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-night text-cream"
    >
      {/* Paw loading animation */}
      {showPaw ? (
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
      ) : null}

      {/* Console visual - static image instead of video background */}
      <div className="relative h-full w-full">
        <img
          src="/media/hero-console.png"
          alt="ForageGrid 3D console - three tier smart floor console"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Watch the Film Modal */}
      <HeroVideoModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        videoSrc="/media/foragegrid-demo.mp4"
      />

      {/* Play open button overlay */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
        <Magnetic strength={0.3} className="relative">
          <button
            type="button"
            onClick={handleOpenModal}
            className="rounded-full bg-white/20 px-5 py-3 text-sm font-black text-amber-950 transition-colors hover:scale-[1.05]"
            aria-label="Watch the Film"
          >
            <PawIcon size={16} className="text-yellow-400 mb-1" />Watch the Film
          </button>
        </Magnetic>
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
            WiFi game updates that dispense your dog's regular kibble -
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

      {/* Trust Badges */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 z-10">
        {trustBadges.map((badge, index) => (
          <a
            key={index}
            href={badge.href}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-black text-amber-400 transition-colors hover:text-amber-300"
          >
            {badge.title}
          </a>
        ))}
      </div>

      {/* Comparison CTA at bottom */}
      <button
        type="button"
        onClick={() => document.getElementById("comparison")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to comparison"
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        style={{ zIndex: 100 }}
      >
        <span className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-cream/50">
          <PawIcon size={22} className="animate-paw text-yellow-400" />Compare
        </span>
      </button>
    </section>
  );
}