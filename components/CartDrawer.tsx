"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "@/components/icons";
import { useForageGrid } from "@/lib/store";
import type { CartItem } from "@/lib/store";
import { formatEnInDate } from "@/lib/format";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const fmt = (value: number) => inr.format(value);

interface UndoState {
  item: CartItem;
  key: number;
}

export function CartDrawer({
  open,
  onClose,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const cart = useForageGrid((state) => state.cart);
  const updateItem = useForageGrid((state) => state.updateItem);
  const removeItem = useForageGrid((state) => state.removeItem);
  const addItem = useForageGrid((state) => state.addItem);
  const [undo, setUndo] = useState<UndoState | null>(null);
  const [pin, setPin] = useState("");
  const [eta, setEta] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const startX = useRef(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!undo) return;
    const timer = window.setTimeout(() => setUndo(null), 4000);
    return () => window.clearTimeout(timer);
  }, [undo]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkPin = () => {
    const value = pin.trim();
    if (!/^\d{6}$/.test(value)) {
      setEta(null);
      return;
    }
    const etaDate = new Date();
    etaDate.setDate(etaDate.getDate() + 3);
    setEta(`Delivers to ${value} by ${formatEnInDate(etaDate)}`);
  };

  const handleRemove = (id: string, item: CartItem) => {
    removeItem(id);
    setUndo({ item, key: Date.now() });
  };

  const handleUndo = () => {
    if (undo) addItem(undo.item);
    setUndo(null);
  };

  const handlePointerDown = (event: PointerEvent) => {
    startX.current = event.clientX;
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!dragging) return;
    setDragX(Math.min(0, event.clientX - startX.current));
  };

  const handlePointerUp = () => {
    if (dragX < -120) onClose();
    setDragging(false);
    setDragX(0);
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[350] bg-night/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-[360] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            style={{ x: dragX }}
            initial={{ x: "100%" }}
            animate={{ x: dragX === 0 ? 0 : dragX }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              setDragging(false);
              setDragX(0);
            }}
          >
            <div className="flex items-center justify-between border-b border-parchment bg-white p-5">
              <h3 className="text-lg font-black text-ink">Your Cart</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink"
              >
                <XIcon size={18} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
                <img
                  src="/media/empty-cart.png"
                  alt="Sleeping dog in an empty forage cart"
                  className="h-44 w-44 object-contain"
                />
                <p className="max-w-xs text-sm font-semibold text-ink-2">
                  Your cart is empty. Add a ForageGrid to start foraging.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-yellow-400 px-7 py-3 text-sm font-black text-amber-950"
                >
                  Start foraging
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-parchment bg-white p-5"
                    >
                      <img
                        src="/media/foragegrid-app.png"
                        alt="ForageGrid console"
                        className="h-20 w-20 shrink-0 rounded-2xl border border-parchment bg-white object-contain"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-black text-ink">{item.name}</p>
                        <p className="mt-1 text-xs font-bold text-blue-700">{fmt(item.price)} each</p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateItem(item.id, { qty: Math.max(1, item.qty - 1) })}
                            className="grid h-8 w-8 place-items-center rounded-full border border-parchment bg-cream text-sm font-black text-ink"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-sm font-black text-ink">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateItem(item.id, { qty: item.qty + 1 })}
                            className="grid h-8 w-8 place-items-center rounded-full border border-parchment bg-cream text-sm font-black text-ink"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <p className="text-sm font-black text-ink">{fmt(item.price * item.qty)}</p>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id, item)}
                          className="text-xs font-bold text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-parchment bg-white p-5">
                  <div className="flex items-center justify-between rounded-2xl bg-yellow-400/30 p-4">
                    <span className="text-xs font-black uppercase tracking-wide text-ink-2">
                      Free delivery across India
                    </span>
                    <span className="text-sm font-black text-amber-950">On us</span>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="delivery-pin"
                      className="text-xs font-black uppercase tracking-[0.2em] text-ink-2"
                    >
                      Delivery PIN
                    </label>
                    <div className="mt-2 flex gap-2">
                      <input
                        id="delivery-pin"
                        value={pin}
                        onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
                        inputMode="numeric"
                        placeholder="600001"
                        className="h-12 w-full rounded-full border border-parchment bg-cream px-5 text-sm font-bold text-ink"
                      />
                      <button
                        type="button"
                        onClick={checkPin}
                        className="rounded-full bg-ink px-6 text-sm font-black text-cream"
                      >
                        Check
                      </button>
                    </div>
                    {eta ? <p className="mt-2 text-xs font-bold text-green-800">{eta}</p> : null}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-ink-2">
                      GST inclusive sub total
                    </span>
                    <span className="text-2xl font-black text-ink">{fmt(total)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={onCheckout}
                    className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-full bg-yellow-400 px-7 text-[15px] font-black text-amber-950"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>

          <AnimatePresence>
            {undo ? (
              <motion.div
                key={undo.key}
                className="fixed bottom-6 left-1/2 z-[370] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-parchment bg-white p-4 shadow-xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <p className="text-sm font-bold text-ink">Removed {undo.item.name}.</p>
                <button
                  type="button"
                  onClick={handleUndo}
                  className="mt-2 text-sm font-black text-blue-700 underline"
                >
                  Undo
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      ) : null}
    </AnimatePresence>
  );
}
