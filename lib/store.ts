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
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useForageGrid = create<ForageGridState>()(
  persist(
    (set) => ({
      cart: [],
      addItem: (item) =>
        set((state) => ({ cart: [...state.cart, item] })),
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