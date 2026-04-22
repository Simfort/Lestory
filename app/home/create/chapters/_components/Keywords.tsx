"use client";

import useLang from "@/lib/hooks/useLang";
import { MessageCircleCheck, MessageCircleWarning, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useCreateStore from "@/store/useCreateStore";

const placeholdreKeys = {
  en: "For the record, start with #",
  ru: "Для записи начните с #",
};
const textWarn = {
  en: "You didn't start the words with #",
  ru: "Вы не начали слова с #",
};
const textCheck = {
  en: "You  start the words with #",
  ru: "Вы  начали слова с #",
};

export default function Keywords() {
  const lang = useLang();

  const [rightFlag, setRightFlag] = useState(false);
  const { setData, data } = useCreateStore();
  const setKeywords = (val: string) => {
    setData({ ...data, keywords: val });
  };
  const keywords = data.keywords;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.startsWith("#")) {
      setRightFlag(true);
      setKeywords(e.target.value);
    } else {
      setRightFlag(false);
    }
  };
  const handleDelete = (i: number) => {
    console.log(formatedKeywords.slice(i + 1), formatedKeywords.slice(0, i));
    setKeywords(
      "#" +
        [
          ...formatedKeywords.slice(0, i),
          ...formatedKeywords.slice(i + 1),
        ].join("#"),
    );
  };
  const formatedKeywords = Array.from(new Set(keywords.split("#"))).slice(1);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <textarea
        onChange={handleChange}
        value={keywords}
        placeholder={placeholdreKeys[lang]}
        className="p-3 rounded-xl  w-70.25 shadow outline-0 border border-amber-200 focus:border-amber-400 md:w-100"
      />
      <motion.div
        layout
        className=" gap-4 flex mb-2 flex-wrap  justify-center  w-70.25">
        {formatedKeywords.map((keyword, i) => (
          <motion.div
            layout
            key={keyword}
            className="px-2 shadow items-center flex gap-2 rounded-xl bg-gray-100">
            <span className="text-blue-700"># </span>
            {keyword}
            <button onClick={() => handleDelete(i)} className="text-red-500 ">
              <X size={20} />
            </button>
          </motion.div>
        ))}
      </motion.div>
      {rightFlag ? (
        <div className="bg-green-500/20 p-2 flex  gap-2 rounded-xl w-full">
          <MessageCircleCheck className="text-green-500" />
          <p>{textCheck[lang]}</p>
        </div>
      ) : (
        <div className="bg-red-500/20 p-2 flex  gap-2 rounded-xl w-full">
          <MessageCircleWarning className="text-red-500" />
          <p>{textWarn[lang]}</p>
        </div>
      )}
    </div>
  );
}
