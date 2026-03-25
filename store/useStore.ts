import { UseStore } from "@/lib/types";
import { create } from "zustand";

const useStore = create<UseStore>((set) => ({
  openMenu: false,
  setOpenMenu(arg) {
    set({ openMenu: arg });
  },
}));
export default useStore;
