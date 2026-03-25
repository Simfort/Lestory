import { UseModal } from "@/lib/types";
import { create } from "zustand";

export const useModal = create<UseModal>((set) => ({
  data: null,
  setModal(arg) {
    set({ data: arg });
  },
}));
