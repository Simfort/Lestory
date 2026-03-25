import { UseCreateStore } from "@/lib/types";
import { create } from "zustand";

const useCreateStore = create<UseCreateStore>((set) => ({
  errors: {},
  setError(arg) {
    set({ errors: arg });
  },
  keywords: "",
  category: "",
  setCategory(arg) {
    set({ category: arg });
  },
  setKeywords(arg) {
    set({ keywords: arg });
  },
}));
export default useCreateStore;
