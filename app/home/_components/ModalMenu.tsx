"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { motion } from "framer-motion";
import {
  Book,
  EyeClosed,
  Home,
  LoaderPinwheel,
  Plus,
  Settings,
  Shell,
  User2,
  Wand,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

export default function ModalMenu({
  setOpenMenu,
}: {
  setOpenMenu: (arg: boolean) => void;
}) {
  const { data: session, status } = useSession();
  const lang = useLang();

  return createPortal(
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      aria-hidden="false"
      aria-modal
      role="dialog"
      transition={{ duration: 0.5 }}
      aria-label="Меню для пользователя"
      className="bg-accent-text p-5 h-screen w-full z-999 fixed top-0 left-0">
      {" "}
      {/* User Button Icon */}
      <div className="flex justify-end">
        <Link
          onClick={() => setOpenMenu(false)}
          href={"/home/profile?id=" + (session?.user as { id: string }).id}
          className="active:opacity-40 transition-opacity hover:opacity-50"
          aria-label="Открыть данные об аккаунте
        ">
          {status === "loading" ? (
            <LoaderPinwheel size={50} className="animate-spin" />
          ) : session?.user?.image ? (
            <Image
              src={session.user.image}
              width={50}
              height={50}
              alt="Your User Logo"
            />
          ) : (
            <User2 size={50} />
          )}
        </Link>
      </div>
      <div className="flex flex-col gap-2 items-center">
        {/* Creating Stories */}
        <Link
          onClick={() => setOpenMenu(false)}
          href={"/home"}
          aria-label="Link to home"
          className="bg-blue-500  rounded-full p-2 active:opacity-40 transition-opacity hover:opacity-50">
          <Home className="text-background" />
        </Link>
        <Link
          onClick={() => setOpenMenu(false)}
          href={"/home/create"}
          aria-label="Link to page creator stories"
          className="bg-background rounded-full p-2 active:opacity-40 transition-opacity hover:opacity-50">
          <Plus />
        </Link>
        {/* Categories stories */}
        <div className="flex flex-col gap-2 w-full items-start">
          <h2 className="font-black text-2xl">
            {LANGUAGE_TEXTS.homePage.asideMenu.historyCategory.h2[lang]}
          </h2>
          <button className="text-xl text-background gap-2 w-full font-bold  shadow-xl active:shadow-none active:opacity-40 transition-opacity hover:opacity-50 rounded-xl flex p-2 items-center bg-orange-500">
            {" "}
            <EyeClosed className="text-black" />
            {
              LANGUAGE_TEXTS.homePage.asideMenu.historyCategory.horror[lang]
            }{" "}
          </button>{" "}
          <button className="text-xl text-background gap-2 w-full font-bold shadow-xl active:shadow-none active:opacity-40 transition-opacity hover:opacity-50  rounded-xl flex p-2 items-center bg-purple-500">
            <Shell />
            {LANGUAGE_TEXTS.homePage.asideMenu.historyCategory.fanfics[lang]}
          </button>{" "}
          <button className="text-xl text-background gap-2 w-full font-bold shadow-xl active:shadow-none active:opacity-40 transition-opacity hover:opacity-50 rounded-xl flex p-2 items-center bg-pink-500">
            <Wand />
            {LANGUAGE_TEXTS.homePage.asideMenu.historyCategory.fantasy[lang]}
          </button>{" "}
          <button className="text-xl text-background gap-2 w-full font-bold shadow-xl active:shadow-none active:opacity-40 transition-opacity hover:opacity-50 rounded-xl flex p-2 items-center bg-amber-700">
            {" "}
            <Book />
            {LANGUAGE_TEXTS.homePage.asideMenu.historyCategory.books[lang]}
          </button>
        </div>
      </div>
      {/* Settings button */}
      <div className="mt-[120%] flex items-end ">
        <button>
          <Settings
            size={40}
            className="bg-background shadow-2xl rounded-full p-2"
          />
        </button>
      </div>
    </motion.aside>,
    document.body,
  );
}
