"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "@/components/icons";

interface HeroVideoModalProps {
  open: boolean;
  onClose: () => void;
}

export function HeroVideoModal({ open, onClose }: HeroVideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[600] flex items-center justify-center bg-night/90 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-cream shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-lg"
            >
              <XIcon size={18} />
            </button>
            <video
              className="aspect-video w-full bg-black"
              src="/media/foragegrid-demo.mp4"
              poster="/media/hero-console.png"
              controls
              autoPlay
              playsInline
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}