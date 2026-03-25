"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { UseModal } from "@/lib/types";
import { X } from "lucide-react";

export default function ModalWindow({ data, setModal }: UseModal) {
  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        setModal(null);
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [data]);

  // Стили для разных типов в аниме‑стиле
  const getAnimeStyles = () => {
    const baseStyles = {
      bg: "bg-white",
      border: "border-2",
      progress: "bg-gradient-to-r",
      text: "text-gray-800",
      shadow: "shadow-lg",
    };

    switch (data?.type) {
      case "error":
        return {
          ...baseStyles,
          bg: "bg-pink-50",
          border: "border-pink-300 border-dashed",
          progress: "bg-gradient-to-r from-pink-400 to-red-500",
          text: "text-pink-700",
          accent: "text-pink-500",
          emoji: "😖",
        };
      case "success":
        return {
          ...baseStyles,
          bg: "bg-cyan-50",
          border: "border-cyan-300 border-dashed",
          progress: "bg-gradient-to-r from-cyan-400 to-blue-500",
          text: "text-cyan-700",
          accent: "text-cyan-500",
          emoji: "✨",
        };
      default:
        return {
          ...baseStyles,
          bg: "bg-yellow-50",
          border: "border-yellow-300 border-dashed",
          progress: "bg-gradient-to-r from-yellow-400 to-orange-500",
          text: "text-yellow-700",
          accent: "text-yellow-500",
          emoji: "💡",
        };
    }
  };

  const styles = getAnimeStyles();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-1002 flex items-start justify-center h-20 pt-12 px-4">
      <motion.div
        initial={{ scale: 0.8, y: -30, rotate: -2 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.8, y: -30, rotate: 2 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        className={`max-w-md w-full shadow-2xl rounded-2xl overflow-hidden ${styles.bg} ${styles.border} ${styles.shadow} relative`}>
        {/* Декоративный уголок в стиле манги */}
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-white border-2 border-dashed rounded-full z-10" />
        <div className="absolute -bottom-2 -left-3 w-10 h-10 bg-white border-2 border-dashed rounded-full z-10" />

        {/* Заголовок с эмодзи и милыми элементами */}
        <div
          className={`flex items-center justify-between p-4 ${styles.border} border-b`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{styles.emoji}</span>
            <h3 className={`font-bold text-lg ${styles.text} leading-tight`}>
              {data!.title}
            </h3>
          </div>
          <button
            onClick={() => setModal(null)}
            className="p-1 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors border border-gray-200">
            <X className={`w-4 h-4 ${styles.accent}`} />
          </button>
        </div>

        {/* Содержимое с аниме‑шрифтом */}
        <div className="p-4">
          <p className={`text-sm leading-relaxed ${styles.text} font-medium`}>
            {data!.description}
          </p>
        </div>

        {/* Прогресс‑бар с градиентом и эффектом свечения */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className={`${styles.progress} h-1.5 relative overflow-hidden`}>
          {/* Эффект мерцания */}
          <motion.div
            className="absolute inset-0 bg-white/30"
            animate={{ x: [-20, 20], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
