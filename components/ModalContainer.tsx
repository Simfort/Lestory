"use client";

import { AnimatePresence } from "framer-motion";
import ModalWindow from "./ModalWindow";
import { useModal } from "@/store/useModal";

export default function ModalContainer() {
  const { data, setModal } = useModal();
  return (
    <div className="w-full items-center justify-center flex absolute">
      <AnimatePresence mode="wait">
        {" "}
        {data && <ModalWindow data={data} setModal={setModal} />}
      </AnimatePresence>
    </div>
  );
}
