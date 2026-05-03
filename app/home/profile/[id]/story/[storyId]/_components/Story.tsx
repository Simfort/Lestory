"use client";
import useLang from "@/lib/hooks/useLang";

import {
  Story as IStory,
  StoryLike,
  StoryView,
} from "@/prisma/generated/prisma/client";

import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const titleChap = {
  en: "Chapters",
  ru: "Главы",
};
const titleRead = {
  en: "Read",
  ru: "Читать",
};
const titleDesc = {
  en: "Description",
  ru: "Описание",
};
export default function Story({
  story,
}: {
  story: IStory & { views: StoryView[]; likes: StoryLike[] };
}) {
  const [lang] = useLang();
  return (
    <div className="flex  flex-col  ">
      <section className=" flex items-center gap-20 max-sm:flex-wrap max-sm:gap-5 justify-center p-5 ">
        <Image
          src={story.cover}
          alt="Story-cover"
          className="bg-white"
          width={150}
          height={200}
        />
        <div className="flex flex-col gap-5">
          <h2>{story.title}</h2>
          <div className="flex items-center gap-5">
            {" "}
            <div className="text-red-500 gap-2 flex items-center">
              {story.likes.length}
              <Heart />
            </div>
            <div className="text-blue-500 gap-2 flex items-center">
              {story.views.length}
              <Eye />
            </div>
          </div>
          <Link
            href={`/home/profile/story/${story.id}/preview`}
            className="active:opacity-50 hover:opacity-50 transition-opacity bg-amber-200 rounded-xl p-2 w-50">
            <p className="text-black text-center">{titleRead[lang]}</p>
          </Link>
        </div>
      </section>
      <section className="h-screen justify-center pt-10 flex rounded-t-3xl bg-white shadow">
        <div className=" w-1/2 max-sm:w-full  max-sm:px-5">
          {" "}
          <h2>{titleDesc[lang]}</h2>
          <p>{story.description}</p>
        </div>
      </section>
    </div>
  );
}
