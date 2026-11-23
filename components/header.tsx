"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PawIcon, MenuIcon, XIcon } from "@/components/icons";
import { useCartCount } from "@/lib/store";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "How it works", href: "#how-it-works" },
  { label: "A Day While You&apos;re Away", href: "#day-away" },
  { label: "Safety", href: "#safety" },
  { label: "Build Yours", href: "#configure" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const count = useCartCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      className={`fixed inset-x-0 top-0 z-[350] transition-all duration-500 ${
        scrolled
          ? "border-b border-black/5 bg-white/70 backdrop-blur-xl"
          : "bg-transparent"}
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-start gap-4 px-4 sm:px-6 lg:px-8 flex-col lg:flex-row">
        <a href="#home" className="flex shrink-0 items-center gap-2.5">
          <PawIcon size={30} className="text-yellow-500" />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-black tracking-tight text-ink">
              ForageGrid
            </span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-brown-800">
              Happy While You&apos;re Away
            </span>
          </span>
        </a>

        <nav className="mt-4 flex-1 flex justify-center lg:mt-0 lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold text-ink-2 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="relative grid h-12 w-12 place-items-center rounded-full bg-white/80 text-ink shadow-sm"
          >
            <PawIcon size={18} />
            {count > 0 ? (
              <span className="animate-cart absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-brown-800 px-1.5 text-[10px] font-bold text-cream">{count}</span>
            ) : null}
          </button>
          <a
            href="#configure"
            className="group relative grid h-12 shrink-0 place-items-center gap-2 rounded-full bg-yellow-400 px-5 text-[13px] font-black text-amber-950 shadow-lg shadow-yellow-400/30 transition-transform hover:scale-[1.04]"
          >
            <span>Configure & Buy</span>
            <span className="animate-cart absolute -top-1.5 -right-1 grid min-w-5 place-items-center rounded-full bg-brown-800 px-1.5 text-[10px] font-bold text-cream">
              {count}
            </span>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <div
              className="fixed inset-0 z-[340] bg-black/40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed inset-y-0 left-0 z-[345] flex w-[82vw] max-w-sm flex-col bg-cream p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-black tracking-tight text-ink">
                  ForageGrid
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink"
                >
                  <XIcon size={18} />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-2" aria-label="Mobile">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-semibold text-ink-2 transition-colors hover:bg-parchment hover:text-ink"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}