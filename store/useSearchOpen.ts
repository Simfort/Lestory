import { UseSearchOpen } from "@/lib/types";
import { create } from "zustand";

export const useSearchOpen = create<UseSearchOpen>((set) => ({
  searchOpen: false,
  setSearchOpen: (arg: boolean) => {
    set({ searchOpen: arg });
  },
}));
