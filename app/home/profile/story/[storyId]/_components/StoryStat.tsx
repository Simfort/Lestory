"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import type { Story, User } from "@/prisma/generated/prisma/client";
import { BookHeart, Eye, Heart, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StoryStat({
  story,
}: {
  story: Story & { author: Exclude<User, "username" | "image"> };
}) {
  const lang = useLang();
  const category =
    LANGUAGE_TEXTS.createPage.storyCreator.form.categories[
      story.category as "horror" | "adventure" | "fanfic" | "fantasy"
    ];
  return (
    <div className="p-5 flex flex-col items-center gap-2">
      <div className="flex items-center gap-5">
        <div className="p-2   bg-radial from-pink-50 to-pink-600 rounded-xl">
          <BookHeart size={30} />
        </div>
        <h2>{story.title}</h2>
        <div className="flex gap-2 text-blue-500 font-bold items-center">
          {story.views}
          <Eye />
        </div>
        <div className="flex gap-2 text-red-500 font-bold items-center">
          {story.likes}
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
      <p>{story.description}</p>
      <p className="font-bold">
        {LANGUAGE_TEXTS.storyProfilePage.storyStat.author[lang]}:
        <Link href={"#"}>{story.author_email}</Link>
      </p>
      <div>
        {story.author.image ? (
          <Image
            src={story.author.image}
            width={50}
            height={50}
            alt="story image auth"
          />
        ) : (
          <User2 size={40} />
        )}
        <p>{story.author.username}</p>
      </div>
    </div>
  );
}
