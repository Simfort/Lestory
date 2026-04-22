import Image from "next/image";
import { motion } from "framer-motion";

export default function BurgerMenu({
  setOpenMenu,
  openMenu,
}: {
  setOpenMenu: (arg: boolean) => void;
  openMenu: boolean;
}) {
  return (
    <button
      onClick={(e) => {
        console.log(e.bubbles);
        setOpenMenu(!openMenu);
      }}
      aria-label="Open Modal Window"
      className="inline-flex relative select-none   flex-col z-1000">
      {" "}
      <motion.div
        layout
        className="inline-block  absolute top-0 left-0 size-10"
        initial={openMenu ? { rotateZ: 45 } : { rotateZ: 0 }}
        animate={openMenu ? { rotateZ: 0, top: 0 } : { rotateZ: 45 }}>
        <Image
          src={"/green-onion.svg"}
          alt="green onion "
          width={40}
          height={40}
          loading="eager"
        />
      </motion.div>
      <motion.div
        layout
        initial={openMenu ? { rotateZ: -45 } : { rotateZ: 0 }}
        animate={openMenu ? { rotateZ: 0 } : { rotateZ: -45 }}
        className="inline-block absolute -top-4 left-0 size-10">
        <Image
          src={"/mitarashi.svg"}
          alt="mitarashi"
          loading="eager"
          width={40}
          height={40}
        />
      </motion.div>
    </button>
  );
}
