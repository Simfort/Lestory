import { CATEGORIES } from "@/lib/categories";
import useLang from "@/lib/hooks/useLang";
import { Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useCreateStore from "@/store/useCreateStore";

const otherPlaceholder = { en: "Other", ru: "Другое" };
const buttonCategory = { en: "Select category", ru: "Выберите жанр" };

export default function Category() {
  const [flagModal, setFlagModal] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [other, setOther] = useState("");
  const { data, setData } = useCreateStore();
  const [flagOther, setFlagOther] = useState(false);
  const [lang] = useLang();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        flagModal &&
        !containerRef.current.contains(e.target as Node)
      ) {
        console.log(
          containerRef.current,
          flagModal,
          !containerRef.current.contains(e.target as Node),
        );
        setFlagModal(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [flagModal]);
  return (
    <div ref={containerRef} className="relative">
      <button
        aria-label="Кнокпка открывает панель с жанрами"
        onClick={() => setFlagModal(!flagModal)}
        className={` px-4 py-2 bg-white border border-blue-200 w-full rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400`}>
        <p className="capitalize">
          {selected
            ? CATEGORIES[selected][lang]
            : flagOther && other
              ? other
              : buttonCategory[lang]}
        </p>
      </button>
      <AnimatePresence mode="wait">
        {" "}
        {flagModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal
            className="absolute flex flex-col shadow bg-background rounded-xl w-full h-50 overflow-y-scroll">
            {CATEGORIES.map((category, i) => (
              <button
                onClick={() => {
                  setSelected(i);
                  setData({ ...data, category: CATEGORIES[i][lang] });
                }}
                key={i}
                className={`${category.bg} p-2 capitalize shadow`}>
                {category[lang]}
              </button>
            ))}
            <div className="flex px-2 items-center justify-between">
              {" "}
              <input
                type="text"
                value={other}
                onChange={(e) => {
                  setOther(e.target.value);
                }}
                placeholder={otherPlaceholder[lang]}
                className="p-2 w-40  outline-0"
              />
              <button
                disabled={other ? false : true}
                className="text-blue-500 disabled:text-gray-600/20"
                onClick={() => {
                  setSelected(null);
                  setFlagOther(true);
                  setData({ ...data, category: other });
                }}>
                <Check />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
