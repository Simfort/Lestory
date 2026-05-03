import { UseLanguage } from "@/lib/types";
import { create } from "zustand";

export const useLanguage = create<UseLanguage>((set) => ({
  lang:
    typeof window !== "undefined" ? localStorage.getItem("lang") || "ru" : "ru",
  setLang: (arg: string) => {
    set({ lang: arg });
  },
}));
