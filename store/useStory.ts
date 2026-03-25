import { UseStory } from "@/lib/types";
import { create } from "zustand";

export const useStory = create<UseStory>((set) => ({
  story: null,
  setStory(arg) {
    set({ story: arg });
  },
}));
