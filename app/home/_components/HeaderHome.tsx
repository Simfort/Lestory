"use client";

import { AnimatePresence } from "framer-motion";
import BurgerMenu from "./BurgerMenu";
import ModalMenu from "./ModalMenu";
import { useState } from "react";
import useStore from "@/store/useStore";

export default function HeaderHome() {
  const { setOpenMenu, openMenu } = useStore();
  return (
    <header className="px-5 py-2 top-0 left-0 fixed z-1000 ">
      <BurgerMenu setOpenMenu={setOpenMenu} openMenu={openMenu} />{" "}
      <AnimatePresence mode="wait">
        {openMenu && <ModalMenu setOpenMenu={setOpenMenu} />}
      </AnimatePresence>
    </header>
  );
}
