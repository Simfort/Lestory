"use client";

import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [lang] = useLang();
  const [method, setMethod] = useState<number | null>(null);
  return (
    <div className="flex items-center justify-center  h-screen  gap-10 flex-col">
      <h2> {LANGUAGE_TEXTS.createPage.method.title[lang]}</h2>
      <Link
        href={"/home/create/chapters"}
        onClick={() => setMethod(0)}
        className={`border-2 text-start rounded-xl px-5  h-30   flex items-center gap-5  w-80 ${method === 0 ? "bg-blue-500/10" : "bg-blue-50/50"} border-accent-text/50`}>
        <div
          className={`size-4 border-accent-text ${method === 0 ? "bg-accent-text/50" : " bg-white"} border rounded-full shrink-0`}></div>
        <div>
          <h4 className="text-foreground">
            {LANGUAGE_TEXTS.createPage.method.chapters[lang]}
          </h4>
          <p className="text-foreground/80">
            {LANGUAGE_TEXTS.createPage.method.chaptersText[lang]}
          </p>
        </div>
      </Link>{" "}
      <Link
        href={"/home/create/chapters"}
        onClick={() => setMethod(1)}
        className={`border-2 text-start rounded-xl px-5  h-30    flex items-center gap-5  w-80 ${method === 1 ? "bg-blue-500/10" : "bg-blue-50/50"} border-accent-text/50`}>
        <div
          className={`size-4 border-accent-text ${method === 1 ? "bg-accent-text/50" : " bg-white"} border rounded-full shrink-0`}></div>
        <div>
          <h4 className="text-foreground">
            {LANGUAGE_TEXTS.createPage.method.all[lang]}
          </h4>
          <p className="text-foreground/80 ">
            {LANGUAGE_TEXTS.createPage.method.allText[lang]}
          </p>
        </div>
      </Link>
      <div className="px-5  items-center justify-center flex w-full bg-background py-2 border-t border-amber-50 h-50 "></div>{" "}
    </div>
  );
}
