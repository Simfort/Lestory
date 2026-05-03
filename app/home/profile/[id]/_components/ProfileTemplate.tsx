"use client";

import { Story, User } from "@/prisma/generated/prisma/client";
import StoryItem from "./StoryItem";
import useMediaWindow from "@/lib/hooks/useMediaWindow";
import { useState } from "react";
import useLang from "@/lib/hooks/useLang";

const titleButton = { en: "Filter", ru: "Фильтр" };

export default function ProfileTemplate({
  filterElement,

  children,
}: {
  filterElement: React.ReactNode;
  children: React.ReactNode;
}) {
  const [lang] = useLang();
  const isPhone = useMediaWindow("(width < 640px)");
  const [modalFlag, setModalFlag] = useState(false);
  return (
    <div className="h-full max-sm:flex-wrap flex gap-10 max-sm:gap-2 pb-30 max-md:mt-10">
      {isPhone ? (
        <div>
          {" "}
          <button
            className="bg-accent-text rounded-md px-5 py-1 text-background"
            onClick={() => setModalFlag(!modalFlag)}>
            {titleButton[lang]}
          </button>{" "}
          {modalFlag && (
            <div className=" shadow absolute z-1 w-70 shrink-0 bg-background rounded-md">
              {filterElement}
            </div>
          )}
        </div>
      ) : (
        <div className="h-full w-70 shrink-0 bg-background rounded-md">
          {filterElement}
        </div>
      )}

      <div className="flex flex-col items-center gap-5">{children}</div>
    </div>
  );
}
