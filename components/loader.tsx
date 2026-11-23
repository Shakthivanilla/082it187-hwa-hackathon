"use client";

import { useEffect, useState } from "react";
import { PawIcon } from "@/components/icons";

export function Loader() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">("show");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("hide"), 900);
    const t2 = window.setTimeout(() => setPhase("gone"), 1500);
    let clearGone: number | undefined;
    try {
      const seen = window.localStorage.getItem("foragegrid-loader-seen") === "1";
      if (!seen) window.localStorage.setItem("foragegrid-loader-seen", "1");
      if (seen) {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        clearGone = window.setTimeout(() => setPhase("gone"), 0);
      }
    } catch {
      // storage unavailable
    }
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      if (clearGone !== undefined) window.clearTimeout(clearGone);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[500] grid place-items-center transition-opacity duration-300 ${
        phase === "hide" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#fbf6ec" }}
    >
      <div className="flex flex-col items-center gap-5">
        <PawIcon size={56} className="animate-paw text-yellow-500" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-ink-2">
          Happy While You&apos;re Away
        </p>
      </div>
    </div>
  );
}