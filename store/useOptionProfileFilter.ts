import { UseOptionProfileFilter } from "@/lib/types";
import { create } from "zustand";

export const useOptionProfileFilter = create<UseOptionProfileFilter>((set) => ({
  options: {
    sortBy: 0,
    list: 0,
    up: false,
  },
  setOption: (arg) => {
    set({ options: arg });
  },
}));
