import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Store = {
  background: string | null;
  setBackground: (background: string) => void;
};

const initialState: Store = {
  background: null,
  setBackground: () => {}
};

export const useStore = create<Store>()(
  devtools((set) => ({
    ...initialState,
    setBackground: (background) => set({ background })
  }))
);
