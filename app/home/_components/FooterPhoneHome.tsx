"use client";

import useLang from "@/lib/hooks/useLang";
import {
  Archive,
  Home,
  Plus,
  TextAlignCenter,
  TextAlignJustify,
  User2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const undertitles = {
  create: {
    en: "Create",
    ru: "Создать",
  },
  catalog: {
    en: "Catalog",
    ru: "Каталог",
  },
  menu: {
    en: "Menu",
    ru: "Меню",
  },
};

export default function FooterPhoneHome() {
  const { data: session } = useSession();
  const [lang] = useLang();

  return (
    <footer className="px-5 bottom-0 left-0 text-accent-text fixed flex w-screen bg-background py-2 border-t border-amber-50 z-1000 justify-center items-center gap-6">
      <div className="flex flex-col gap-1 items-center">
        <Link
          href={"/home/create"}
          className="hover:opacity-50 active:opacity-40 transition-opacity">
          <Plus className="text-accent-text w-6 h-6" />
        </Link>
        <h5 className="text-foreground/40 text-xs">
          {undertitles.create[lang]}
        </h5>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <Link
          href={"/home/catalog"}
          className="hover:opacity-50 active:opacity-40 transition-opacity">
          <Archive className="text-accent-text w-6 h-6" />
        </Link>
        <h5 className="text-foreground/40 text-xs">
          {undertitles.catalog[lang]}
        </h5>
      </div>

      <Link
        href={"/home"}
        className="hover:opacity-50 active:opacity-40 transition-opacity">
        <Image src={"/logo.png"} width={88} height={88} alt="logo letory" />
      </Link>

      <Link
        href={
          session
            ? "/home/profile/" + (session.user as { id: string }).id
            : "/home"
        }
        className="hover:opacity-50 active:opacity-40 transition-opacity">
        {session ? (
          session.user?.image ? (
            <Image
              width={40}
              height={40}
              alt="Your avatar profile"
              src={session.user.image}
              className="rounded-full"
            />
          ) : (
            <Image
              src={"/bonny.png"}
              width={48}
              height={48}
              alt="logo letory"
              className="rounded-full"
            />
          )
        ) : (
          <User2 className="text-accent-text w-6 h-6" />
        )}
      </Link>

      <div className="flex flex-col gap-1 items-center">
        <button className="hover:opacity-50 active:opacity-40 transition-opacity">
          <TextAlignJustify className="w-6 h-6" />
        </button>
        <h5 className="text-foreground/40 text-xs">{undertitles.menu[lang]}</h5>
      </div>
    </footer>
  );
}
