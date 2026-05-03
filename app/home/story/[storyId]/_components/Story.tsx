"use client";
import { CATEGORIES } from "@/lib/categories";
import useLang from "@/lib/hooks/useLang";

import { Book, Eye, Heart, HeartPulse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import OtherStories from "./OtherStories";
import Comments from "./Comments";
import { useStory } from "@/store/useStory";
import { IStory } from "@/lib/types";

const titleChap = {
  en: "Chapters",
  ru: "Глав",
};
const titleRead = {
  en: "Read",
  ru: "Читать",
};
const titleDesc = {
  en: "Description",
  ru: "Описание",
};

export default function Story({ story }: { story: IStory }) {
  const [lang] = useLang();
  const [isLiked, setIsLiked] = useState(false);
  const [isCkeckLiked, setIsCkeckLiked] = useState(false);

  const handleLike = async () => {
    const storyId = window.location.pathname.split("/").pop();

    try {
      const res = await fetch("/api/story/like?storyId=" + storyId, {
        method: "POST",
      });
      if (res.ok) {
        console.log("success");
        const data = await res.json();
        if (data.like) {
          setIsLiked(true);
        }
      }
    } catch (error) {
      setIsLiked(false);
      console.error(error);
    }
  };
  useEffect(() => {
    const handleIsLiked = async () => {
      const storyId = window.location.pathname.split("/").pop();

      try {
        const res = await fetch("/api/story/like?storyId=" + storyId, {
          method: "GET",
        });
        if (res.ok) {
          console.log("success");
          const data = await res.json();
          if (data.liked) {
            setIsCkeckLiked(true);
          }
        }
      } catch (error) {
        setIsCkeckLiked(false);
        console.error(error);
      }
    };
    handleIsLiked();
  }, []);

  return (
    <div className="flex  flex-col lg:grid grid-cols-9  ">
      <section className=" col-start-3 col-span-5  flex items-center gap-20 relative max-sm:flex-wrap max-sm:gap-5 justify-center p-5 ">
        {" "}
        <Image
          src={story.cover}
          alt="Story-cover"
          className="bg-white w-full h-50 absolute z-0 blur-2xl"
          width={150}
          height={200}
        />
        <Image
          src={story.cover}
          alt="Story-cover"
          className="bg-white relative z-1"
          width={150}
          height={200}
        />
        <div className="flex flex-col gap-5 relative  z-1">
          <h2>{story.title}</h2>
          <div className="flex gap-2">
            <p
              className={`rounded-xl text-center w-max px-3 text-black/80 text-sm ${CATEGORIES.find((val) => val[lang] === story.category)?.bg}`}>
              {story.category}
            </p>{" "}
            <p className={`   text-black/80 text-sm `}>{story.type}</p>
          </div>
          <div className="flex items-center gap-5">
            {" "}
            <button
              onClick={handleLike}
              className={`text-center gap-2 flex items-center transition-all duration-300 ${
                isLiked || isCkeckLiked
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-400 active:text-red-500"
              }`}>
              {isLiked ? story.likes.length + 1 : story.likes.length}
              <Heart
                className={`transition-all duration-200 ${
                  isLiked || isCkeckLiked ? "fill-red-500  " : "fill-none "
                }`}
              />
            </button>
            <div className="text-blue-500 gap-2 flex items-center">
              {story.views.length}
              <Eye />
            </div>
          </div>
          <Link
            href={`/home/story/${story.id}/preview`}
            className="active:opacity-50 hover:opacity-50 transition-opacity bg-accent-text rounded-md p-2 w-50">
            <p className="text-background font-bold text-center">
              {titleRead[lang]}
            </p>
          </Link>{" "}
          <p className="font-medium flex gap-2 text-black/30">
            <Book />
            {titleChap[lang]}:{story.chapters.length}
          </p>
        </div>
      </section>
      <section className="  col-start-3 col-span-5  py-10  flex-col items-center flex relative  z-1 rounded-t-3xl bg-background shadow">
        <div className="  w-full px-10   max-sm:px-5">
          <Link href={"/home/user/" + story.author.id}>
            {story.author.username}
          </Link>
          <h2>{titleDesc[lang]}</h2>
          <p>{story.description}</p>{" "}
          <div className="flex mt-10 ">
            {story.keywords
              .split("#")
              .slice(1)
              .map((word) => (
                <div
                  className="bg-blue-200/20 text-blue-500 p-2 rounded-xl"
                  key={word}>
                  {word}
                </div>
              ))}
          </div>
        </div>
      </section>
      <OtherStories category={story.category} />
      <Comments storyId={story.id} />
    </div>
  );
}
