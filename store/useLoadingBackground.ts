import { UseLoadingBackground } from "@/lib/types";
import { create } from "zustand";

const useLoadingBackground = create<UseLoadingBackground>((set) => ({
  data: {
    view: false,
    cb: null,
    title: "",
  },

  setData: (arg) => {
    set({ data: arg });
  },
}));
export default useLoadingBackground;
