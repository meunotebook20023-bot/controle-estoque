import { create } from "zustand";
import { persist } from "zustand/middleware";

const initial = {
  products: [],
  movements: [], // {type: 'in'|'out', productId, qty, date, note}
};

export const useInventoryStore = create(
  persist(
    (set, get) => ({
      ...initial,
      addProduct: (p) => set({ products: [...get().products, p] }),
      updateProduct: (id, patch) => set({ products: get().products.map(p => p.id === id ? {...p, ...patch} : p) }),
      removeProduct: (id) => set({ products: get().products.filter(p => p.id !== id) }),
      addMovement: (m) => set({ movements: [...get().movements, m] }),
      resetAll: () => set(initial),
    }),
    { name: "inventory-store" }
  )
);
