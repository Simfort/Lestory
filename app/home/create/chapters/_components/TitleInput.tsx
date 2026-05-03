"use client";

import useLang from "@/lib/hooks/useLang";
import useCreateStore from "@/store/useCreateStore";
import { motion } from "framer-motion";
import { useState } from "react";

const titleBook = {
  en: "Title",
  ru: "Название",
};
const placeholder = {
  en: "Title your book",
  ru: "Название вашей книги",
};
const placeholderDesc = {
  en: "Description your book",
  ru: "Описание вашей книги",
};
const titleDesc = {
  en: "Description",
  ru: "Описание",
};

export default function TitleInput() {
  const [lang] = useLang();

  const { setData, data } = useCreateStore();
  const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, description: e.target.value });
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, title: e.target.value });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-2 h-100 justify-center mb-5"
      transition={{ duration: 0.5 }}>
      <h3>{titleBook[lang]}</h3>
      <input
        onChange={handleChangeTitle}
        type="text"
        value={data.title}
        className={` px-4 py-2 bg-white border border-blue-200 w-full rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
        placeholder={placeholder[lang]}
      />{" "}
      <h3>{titleDesc[lang]}</h3>
      <textarea
        onChange={handleChangeDesc}
        value={data.description}
        className={` px-4 py-2 bg-white border border-blue-200 w-full rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 md:w-100`}
        placeholder={placeholderDesc[lang]}
      />
    </motion.div>
  );
}
