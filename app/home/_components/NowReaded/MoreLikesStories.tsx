"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { TStory } from "@/lib/types";
import { Heart } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MoreLikesStories() {
  const [books, setBooks] = useState<TStory[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [lang] = useLang();
  const router = useRouter();
  const getBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/story/now/top-likes");
      const data = await res.json();
      console.log(data);
      setBooks(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      setBooks(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);
  if (!books) return <div>sada</div>;
  return (
    <section className="mt-2 w-full">
      <h4 className="text-foreground/50 pl-2 pb-2">
        {LANGUAGE_TEXTS.homePage.nowReaded.topLikes[lang]}
      </h4>
      <div className="  flex w-full flex-col  gap-5 ">
        {books.map((story) => (
          <button
            onClick={() => router.push("/home/story/" + story.id)}
            className="text-start flex  pl-2  gap-5  max-sm:w-screen active:opactity-50 transition-opacity  "
            key={story.id}>
            <Image
              src={story.cover}
              alt={`${story.title} cover`}
              width={114}
              height={151}
              className="w-28.5 h-37.75"
            />
            <div>
              <h4 className="font-bold mt-2 hover:text-amber-600 transition-colors">
                {story.title}
              </h4>
              <div className="flex justify-between">
                <div className="text-foreground/50 capitalize">
                  {story.category}
                </div>
                <div className="bg-gray-200/50 inline-block px-2 text-foreground/50 rounded-xl">
                  {story.type}
                </div>
              </div>{" "}
              <div className="text-red-500 gap-2 flex items-center">
                {story.likes.length}
                <Heart />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
