import { UseSelectedProfile } from "@/lib/types";
import { create } from "zustand";

export const useSelectedProfile = create<UseSelectedProfile>((set) => ({
  selected: 0,
  setSelected: (arg: number) => {
    set({ selected: arg });
  },
}));
