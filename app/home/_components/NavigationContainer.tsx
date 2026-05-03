"use client";
import useMediaWindow from "@/lib/hooks/useMediaWindow";
import FooterPhoneHome from "./FooterPhoneHome";
import Header from "./Header";
import { AnimatePresence } from "framer-motion";
import Search from "./Search";
import { useSearchOpen } from "@/store/useSearchOpen";
import { SearchIcon } from "lucide-react";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import Footer from "./Footer";

export default function NavigationContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPhone = useMediaWindow("(width < 640px)");
  const { searchOpen, setSearchOpen } = useSearchOpen();
  const [lang] = useLang();
  return (
    <>
      {" "}
      <AnimatePresence mode="wait" initial={false}>
        {searchOpen && (
          <Search key="search-modal" setSearchOpen={setSearchOpen} />
        )}
      </AnimatePresence>
      {isPhone ? (
        <>
          <header className=" w-full flex sticky top-0 z-1000 sm:hidden items-center px-2 justify-center py-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="bg-accent-text w-full hover:opacity-50 active:opacity-40 transition-opacity p-2  gap-2 flex items-center justify-center rounded-md text-background">
              <SearchIcon /> {LANGUAGE_TEXTS.homePage.search.fastSearch[lang]}
            </button>
          </header>
          {children}
          <FooterPhoneHome />
        </>
      ) : (
        <>
          <Header /> {children}
        </>
      )}
    </>
  );
}
