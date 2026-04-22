"use client";
import { SearchIcon } from "lucide-react";
import Search from "./_components/Search";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import dynamic from "next/dynamic";
import NowReaded from "./_components/NowReaded/NowReaded";

const LazyLastBooks = dynamic(() => import("./_components/LastBooks"), {
  ssr: false,
  loading: () => <p>Loading component...</p>,
});
const LazyNewBooks = dynamic(() => import("./_components/NewBooks"), {
  ssr: false,
  loading: () => <p>Loading component...</p>,
});

export default function Page() {
  const [searchOpen, setSearchOpen] = useState(false);
  const lang = useLang();
  return (
    <div className="bg-background flex flex-col overflow-y-scroll pb-20  items-center h-screen">
      <header className="bg-yellow-200 w-full flex items-center px-2 justify-center py-2">
        <button
          onClick={() => setSearchOpen(true)}
          className="bg-yellow-100 w-full hover:opacity-50 active:opacity-40 transition-opacity p-2 text-foreground/60 gap-2 flex items-center justify-center rounded-xl">
          <SearchIcon className="text-black" />{" "}
          {LANGUAGE_TEXTS.homePage.search.fastSearch[lang]}
        </button>
      </header>
      <AnimatePresence mode="wait" initial={false}>
        {searchOpen && (
          <Search key="search-modal" setSearchOpen={setSearchOpen} />
        )}
      </AnimatePresence>
      <LazyLastBooks />
      <NowReaded />
      <LazyNewBooks />
    </div>
  );
}
