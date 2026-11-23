import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface ForageGridState {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (id: string, patch: Partial<CartItem>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useForageGrid = create<ForageGridState>()(
  persist(
    (set) => ({
      cart: [],
      addItem: (item) =>
        set((state) => ({ cart: [...state.cart, item] })),
      updateItem: (id, patch) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "foragegrid-cart" },
  ),
);

export const useCartCount = () =>
  useForageGrid((state) => state.cart.length);