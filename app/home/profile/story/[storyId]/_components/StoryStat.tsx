"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { TStory } from "@/lib/types";
import type { Story, User } from "@/prisma/generated/prisma/client";
import { Eye, Heart, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StoryStat({ story }: { story: TStory }) {
  const lang = useLang();
  const category =
    LANGUAGE_TEXTS.createPage.storyCreator.form.categories[
      story.category as "horror" | "adventure" | "fanfic" | "fantasy"
    ];

  return (
    <div className="p-5 flex bg-gray-50 shadow rounded-xl flex-col items-center gap-2">
      <div className="flex items-center gap-5">
        <h2>{story.title}</h2>
        <div className="flex gap-2 text-blue-500 font-bold items-center">
          {story.views.length}
          <Eye />
        </div>
        <div className="flex gap-2 text-red-500 font-bold items-center">
          {story.likes.length}
          <Heart />
        </div>
      </div>
      <div className="w-100 h-150 max-sm:w-80 max-sm:h-140">
        <Image
          src={story.cover}
          width={200}
          className="h-full w-full"
          height={200}
          alt="Story Cover"
        />
      </div>
      <p className=" capitalize w-max  font-bold rounded-full text-blue-900 px-2 py-1 text-sm bg-linear-to-r from-blue-300/50 via-blue-200/50 to-blue-300/50">
        {category ? category[lang] : story.category}
      </p>
      <h3>Описание</h3>
      <div className="flex flex-col rounded-xl gap-2 items-center shadow w-full p-2 bg-white">
        {" "}
        <p>{story.description}</p>
      </div>

      <div className="flex items-center justify-start w-full">
        <h4>{LANGUAGE_TEXTS.storyProfilePage.storyStat.author[lang]}:</h4>
        <div className="flex items-center shadow px-5 py-2 rounded-xl  border border-blue-200 gap-2">
          {story.author.image ? (
            <Image
              src={story.author.image}
              width={30}
              height={30}
              alt="story image auth"
            />
          ) : (
            <User2 size={40} />
          )}
          <Link href={"home/user/id"} className="font-bold">
            {story.author.username}
          </Link>
        </div>{" "}
      </div>
      <hr className="w-full mt-2 mb-2 text-blue-300" />
    </div>
  );
}
