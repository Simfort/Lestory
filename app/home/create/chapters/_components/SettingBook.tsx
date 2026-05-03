"use client";
import useLang from "@/lib/hooks/useLang";
import { motion } from "framer-motion";

import Price from "./Price";

const title = {
  en: "Settings",
  ru: "Настройки",
};

export default function SettingBook() {
  const [lang] = useLang();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-100 w-70.25 md:w-100  justify-center gap-5 mb-5"
      transition={{ duration: 0.5 }}>
      <h3>{title[lang]}</h3>

      <Price />
    </motion.div>
  );
}
