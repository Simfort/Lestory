"use client";
import { motion } from "framer-motion";
import Category from "./Category";
import Keywords from "./Keywords";
import useLang from "@/lib/hooks/useLang";

const titleCa = { en: "Category", ru: "Жанр" };
const titleKey = { en: "Keywords", ru: "Ключевые слова" };

export default function CaK() {
  const [lang] = useLang();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-100  justify-center gap-2 mb-5"
      transition={{ duration: 0.5 }}>
      <h3>{titleCa[lang]}</h3>
      <Category /> <h3>{titleKey[lang]}</h3>
      <Keywords />
    </motion.div>
  );
}
