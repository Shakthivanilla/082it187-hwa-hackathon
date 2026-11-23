"use client";

import { useRef, useState, type MouseEvent as ReactMouseEvent, type ComponentType } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { PawIcon, MoonIcon, BoneIcon, RefreshCcwIcon } from "@/components/icons";

interface BentoCardProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  text: string;
  accent: string;
}

function BentoCard({ icon: Icon, title, text, accent }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.3 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.3 });
  const [glareOpacity, setGlareOpacity] = useState(0);

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 12);
    rotateX.set((0.5 - py) * 10);
    const distance = Math.min(1, Math.hypot(px - 0.5, py - 0.5) * 2);
    setGlareOpacity(distance * distance);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setGlareOpacity(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative overflow-hidden rounded-3xl border border-parchment bg-white p-7 shadow-sm md:p-8"
    >
      <div
        className="absolute inset-0 rounded-3xl"
        style={{ opacity: glareOpacity, background: "radial-gradient(circle at 50% 50%, rgba(250, 204, 21, 0.28), transparent 65%)" }}
      />
      <div className="relative">
        <div className="grid h-14 w-14 place-items-center rounded-2xl" style={{ backgroundColor: accent }}>
          <Icon size={26} className="text-amber-950" />
        </div>
        <h3 className="mt-5 text-xl font-black text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{text}</p>
      </div>
    </motion.div>
  );
}

export function BentoGrid() {
  const cards = [
    { icon: PawIcon, title: "Stops Boredom", text: "Six scent chambers plus daily puzzle rules turn idle hours into real nose-work.", accent: "#facc15" },
    { icon: MoonIcon, title: "Eases Separation Stress", text: "Focused sniffing releases dopamine, so the dog settles instead of fixating on the door.", accent: "#60a5fa" },
    { icon: BoneIcon, title: "No More Overfeeding", text: "Your dog's regular kibble only, portion-tuned from weight and age.", accent: "#d97706" },
    { icon: RefreshCcwIcon, title: "Shorter Morning Clean-Up", text: "Pop-out chambers rinse fast, so the morning stays calm instead of scrubb-heavy.", accent: "#a16207" },
  ];

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">Why It Works</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-5xl">Four ways the console helps</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">Small wins, big feelings, measurable calm.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}