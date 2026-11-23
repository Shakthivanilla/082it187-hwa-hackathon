"use client";

import { ChevronRightIcon, XIcon, PawIcon } from "@/components/icons";
import { scrollToAnchor } from "@/components/lenis-provider";

export function CtaButton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href="#home"
        onClick={(event) => {
          event.preventDefault();
          scrollToAnchor("#home");
        }}
        className="group inline-flex items-center gap-2 rounded-full bg-amber-950 px-8 font-black text-yellow-400 shadow-lg transition-transform hover:scale-[1.03] md:px-10"
        aria-label="Back to home"
      >
        <PawIcon size={18} className="text-yellow-400" />
        Back to Home
      </a>
      <span className="text-xs text-yellow-400/60">or</span>
      <a
        href="#configure"
        onClick={(event) => {
          event.preventDefault();
          scrollToAnchor("#configure");
        }}
        className="group inline-flex items-center gap-2 rounded-full bg-amber-950 px-8 font-black text-yellow-400 shadow-lg transition-transform hover:scale-[1.03] md:px-10"
        aria-label="Configure yours"
      >
        <ChevronRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
        Configure Yours
      </a>
    </div>
  );
}
