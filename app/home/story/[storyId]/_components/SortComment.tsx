"use client";

import useLang from "@/lib/hooks/useLang";
import { useEffect, useRef, useState } from "react";

const filters = {
  new: {
    en: "new date",
    ru: "новой дате",
  },
  old: {
    en: "old date",
    ru: "старой дате",
  },
  popular: {
    en: "popular",
    ru: "популярности",
  },
};

export default function SortComment({
  filter,
  setFilter,
  refetch,
}: {
  filter: "old" | "new" | "popular";
  setFilter: (arg: typeof filter) => void;
  refetch: () => Promise<unknown>;
}) {
  const [modalFlag, setModalFlag] = useState(false);
  const [lang] = useLang();
  const sortRef = useRef<HTMLDivElement | null>(null);
  const modalFilters = Object.entries(filters).filter(
    (sortBy) => sortBy[0] != filter,
  );
  const handleClick = (type: string) => {
    setFilter(type as typeof filter);
    setModalFlag(false);
    refetch();
  };
  useEffect(() => {
    const handleDocumentClick = (e: PointerEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setModalFlag(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);
  return (
    <div className="relative" ref={sortRef}>
      <button
        onClick={() => setModalFlag(!modalFlag)}
        className={`shadow bg-white w-32 p-2 
        ${modalFlag ? "" : "rounded-b-lg"}`}>
        {filters[filter][lang]}
      </button>
      {modalFlag && (
        <div className="flex flex-col bg-white  rounded-b-lg items-center w-full gap-2 absolute">
          {modalFilters.map((sortBy, i) => {
            return (
              <button
                className="hover:opacity-50 transition-all p-2  active:opacity-40"
                onClick={() => handleClick(sortBy[0])}
                key={i}>
                {sortBy[1][lang]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
