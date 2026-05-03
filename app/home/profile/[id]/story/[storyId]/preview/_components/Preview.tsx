"use client";

import {
  Chapter,
  Story,
  StoryLike,
  StoryView,
} from "@/prisma/generated/prisma/client";
import { ArrowDown, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PreviewItem from "./PreviewItem";
import useLang from "@/lib/hooks/useLang";
import useMediaWindow from "@/lib/hooks/useMediaWindow";

const textChapter = {
  en: "Chapters",
  ru: "Главы",
};

export default function Preview({
  story,
}: {
  story: Story & {
    views: StoryView[];
    likes: StoryLike[];
    chapters: Chapter[];
  };
}) {
  const isPhone = useMediaWindow("(width < 640px)");

  const [modalFlag, setModalFlag] = useState(false);

  const [currentChapter, setCurrentChapter] = useState(0);
  const [lang] = useLang();
  return (
    <div className="bg-gray-800  text-white relative min-h-screen">
      {(isPhone ? modalFlag : true) && (
        <aside className="flex-col max-sm:py-10 z-1000 p-2 gap-2 bg-black/90 h-full fixed flex w-70 max-lg:w-50 max-sm:w-full">
          <div className="flex flex-col gap-5">
            {story?.chapters.map((chapter, i) => (
              <button
                onClick={() => setCurrentChapter(i)}
                key={i}
                className={`${currentChapter === i ? "opacity-100 bg-blue-950" : "opacity-50"} flex items-center transition-all border rounded-xl border-blue-800 px-5 py-2 text-start text-sm justify-between hover:opacity-100 active:opacity-100 `}>
                <h4 className="font-bold">{chapter.title}</h4>
                <p className="text-blue-100/50"> {chapter.images.length}</p>
              </button>
            ))}
          </div>
        </aside>
      )}
      {isPhone && (
        <button
          className=" text-white active:text-blue-900 shadow bg-black/50 hover:text-blue-500 transition-colors  text-sm px-10 py-2 fixed top-0 z-1000 rounded-b-xl text-center  w-full font-bold"
          onClick={() => setModalFlag(!modalFlag)}>
          {textChapter[lang]}
        </button>
      )}
      <div className="flex items-center p-2 flex-col">
        <h2 className="bg-black/50 rounded-lg flex items-center max-sm:mt-10  gap-2 p-5 shadow">
          <Link href={"/home/profile/story/" + story.id}>
            <ArrowLeft className="text-blue-500" />
          </Link>
          {story?.chapters[currentChapter].title}
        </h2>
        {story?.chapters[currentChapter].images.map((url, i) => (
          <PreviewItem image={url} key={i} />
        ))}
      </div>
    </div>
  );
}
