"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { PawIcon } from "@/components/icons";

const DAYS = [
  { id: "mon", name: "Monday", scent: "Fresh Meadow Grass", img: "/media/scent-mon-grass.png", difficulty: 1, rule: "Nose-work only: one chamber at a time." },
  { id: "tue", name: "Tuesday", scent: "Pine Forest", img: "/media/scent-tue-pine.png", difficulty: 1, rule: "Slide-and-sniff two chambers." },
  { id: "wed", name: "Wednesday", scent: "Wild Herb", img: "/media/scent-wed-herb.png", difficulty: 2, rule: "Rotate the wheel to unlock." },
  { id: "thu", name: "Thursday", scent: "Fresh Apple", img: "/media/scent-thu-apple.png", difficulty: 2, rule: "Sequential chambers, timed release." },
  { id: "fri", name: "Friday", scent: "Peanut Butter", img: "/media/scent-fri-peanut.png", difficulty: 3, rule: "Paw-toggle all six zones." },
  { id: "sat", name: "Saturday", scent: "Roast Chicken", img: "/media/scent-sat-chicken.png", difficulty: 3, rule: "Memory-match zones." },
  { id: "sun", name: "Sunday", scent: "Blueberry", img: "/media/scent-sun-blueberry.png", difficulty: 1, rule: "Free-for-all kibble scatter." },
];

const STEP = 360 / DAYS.length;
const RADIUS = 175;

function SoundWaveIcon({ size = 20, className, ...props }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M11 5.5a5.5 5.5 0 0 1 0 13H8" />
      <path d="M15.5 5.5a9 9 0 0 1 0 13" />
      <path d="M19 5.5a13.5 13.5 0 0 1 0 13" />
    </svg>
  );
}

export function ScentWheel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const draggingRef = useRef(false);
  const lastAngleRef = useRef(0);
  const movedRef = useRef(0);

  const rotateMV = useMotionValue(0);
  const rotate = useSpring(rotateMV, { stiffness: 150, damping: 16, mass: 0.4 });

  const angleFromEvent = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  };

  const selectDay = (index: number, angle: number) => {
    setSelected(index);
    const base = index * STEP;
    let target = angle - base;
    while (target < 0) target += 360;
    while (target > 360) target -= 360;
    rotateMV.set(target);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    movedRef.current = 0;
    lastAngleRef.current = angleFromEvent(event.clientX, event.clientY);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const angle = angleFromEvent(event.clientX, event.clientY);
    let delta = angle - lastAngleRef.current;
    while (delta > 180) delta -= 360;
    while (delta < -180) delta += 360;
    lastAngleRef.current = angle;
    movedRef.current += Math.abs(delta);
    rotateMV.set(rotateMV.get() + delta * 0.45);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const angle = angleFromEvent(event.clientX, event.clientY);
    if (movedRef.current < 6) {
      let best = 0;
      let bestDiff = Infinity;
      DAYS.forEach((day, index) => {
        const diff = Math.abs(((angle - index * STEP) + 540) % 360 - 180);
        if (diff < bestDiff) {
          bestDiff = diff;
          best = index;
        }
      });
      selectDay(best, angle);
    }
  };

  const selectedDay = DAYS[selected];
  const difficulty = selectedDay.difficulty;

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-700">Interactive</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-5xl">The 7-Day Scent Wheel</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            One wheel, seven scents, a week of fresh foraging. Drag the wheel or tap a scent.
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl px-6 md:px-8">
        <div className="relative mx-auto h-[440px] w-[440px] max-w-full">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ rotate }}
          >
            {DAYS.map((day, index) => {
              const angle = index * STEP;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * RADIUS;
              const y = Math.sin(rad) * RADIUS;
              const isActive = index === selected;
              return (
                <div
                  key={day.id}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translate(${x}px, ${y}px) rotate(${-angle}deg)`,
                  }}
                >
                  <div
                    className="grid h-[86px] w-[150px] place-items-center rounded-full border-2 px-2 text-center shadow-lg"
                    style={{
                      borderColor: isActive ? "#facc15" : "#e7dcc8",
                      backgroundColor: isActive ? "#fffbeb" : "#fffdf6",
                    }}
                  >
                    <span className="text-[11px] font-black uppercase tracking-wide text-ink-2">{day.name.slice(0, 3)}</span>
                    <span className="text-[10px] font-bold leading-tight text-ink-2">{day.scent}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <div
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
          >
            <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-dashed border-yellow-400/60 bg-yellow-400/10 shadow-inner" />
            <div className="absolute left-1/2 top-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 shadow-lg" />
          </div>

          <motion.div
            className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, rgba(250, 204, 21, 0.35), rgba(251, 191, 36, 0.12) 55%, transparent 70%)" }}
          />
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-3xl px-6 md:px-8">
        <motion.div
          key={selectedDay.id}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-parchment bg-white p-8 shadow-sm"
        >
          <div className="flex flex-wrap items-center gap-6">
            <img src={selectedDay.img} alt={selectedDay.scent} className="h-24 w-24 rounded-2xl object-contain" />
            <div className="flex-1 min-w-[220px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">{selectedDay.name}</p>
              <h3 className="mt-1 text-2xl font-black text-ink">{selectedDay.scent}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{selectedDay.rule}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-ink-2">Difficulty</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((level) => (
                  <PawIcon key={level} size={22} className={level <= difficulty ? "text-yellow-500" : "text-parchment"} />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSoundOn((value) => !value)}
              aria-label="Toggle scent sound"
              className="grid h-12 w-12 place-items-center rounded-full bg-cream"
            >
              <SoundWaveIcon size={20} className={soundOn ? "text-yellow-500" : "text-ink-2"} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}