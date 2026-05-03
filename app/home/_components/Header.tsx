"use client";
import useLang from "@/lib/hooks/useLang";
import { useSearchOpen } from "@/store/useSearchOpen";
import { Plus, Search, TextAlignJustify } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const textLogin = {
  en: "Sign In",
  ru: "Войти",
};
const textCategory = { en: "Catalog", ru: "Каталог" };
const textSearch = {
  en: "Search",
  ru: "Поиск",
};

export default function Header() {
  const [lang] = useLang();
  const { setSearchOpen } = useSearchOpen();
  const { data: session, status } = useSession();
  return (
    <header className="shadow-md h-15 flex py-3 top-0 z-1000 bg-background w-full fixed items-center justify-around">
      <Link href={"/home"}>
        <Image src={"/logo.png"} width={90} height={90} alt="logo" />
      </Link>
      <div className="h-full  flex items-center gap-2 ">
        <button className="font-bold py-2 px-10 hover:opacity-50 active:opacity-40 transition-opacity rounded-md bg-accent-text text-background">
          {textCategory[lang]}
        </button>
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2.5 flex items-center hover:opacity-50 active:opacity-40 transition-opacity gap-2 ">
          <Search size={18} />
          {textSearch[lang]}
        </button>
      </div>
      <div className="flex gap-2.5 items-center">
        <Link
          href={"/home/create"}
          className=" hover:opacity-50 active:opacity-40 transition-opacity">
          <Plus size={18} className="text-accent-text" />
        </Link>

        {status === "authenticated" ? (
          <Link href={"/home/profile/" + (session.user as { id: string }).id}>
            {session!.user!.image ? (
              <Image
                width={42}
                height={42}
                src={session.user!.image}
                alt="logo user"
              />
            ) : (
              <Image
                width={62}
                height={62}
                src={"/bonny.png"}
                alt="logo user"
              />
            )}
          </Link>
        ) : (
          <button className="text-accent-text">textLogin[lang]</button>
        )}
        <button className="bg-accent-text text-background p-2.5 hover:opacity-50 active:opacity-40 transition-opacity  rounded-md">
          <TextAlignJustify size={18} />
        </button>
      </div>
    </header>
  );
}
