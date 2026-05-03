import { UseCreateStore } from "@/lib/types";

import { create } from "zustand";

const useCreateStore = create<UseCreateStore>((set) => ({
  errors: {},
  data: {
    title: "",
    description: "",
    cover: "",
    category: "",
    keywords: "",
    chapters: [],
    price: "",
  },
  setError: (arg) => {
    set({ errors: arg });
  },
  setData: (arg) => {
    set({ data: { ...arg } });
  },
}));
export default useCreateStore;
