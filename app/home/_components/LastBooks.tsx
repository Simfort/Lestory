"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { TStory } from "@/lib/types";
import { StoryView } from "@/prisma/generated/prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LastBooks() {
  const [books, setBooks] = useState<(StoryView & { story: TStory })[] | null>(
    null,
  );
  // Ref для контейнера с горизонтальной прокруткой
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const lang = useLang();
  const router = useRouter();

  const getBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/story/lastedReaded");
      const data: (StoryView & { story: TStory })[] = await res.json();
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

  // Обработчик для кнопки «влево»: прокрутка влево на 300 пикселей
  const handleLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -100, // прокрутка влево на 300 px
        behavior: "smooth", // плавная анимация
      });
    }
  };

  // Обработчик для кнопки «вправо»: прокрутка вправо на 300 пикселей
  const handleRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 100, // прокрутка вправо на 300 px
        behavior: "smooth", // плавная анимация
      });
    }
  };

  return (
    <section className="mt-2 p-2 w-full relative flex flex-col justify-center">
      {/* <button
        onClick={handleLeft}
        className="absolute top-auto bg-background shadow p-2 -left-2 rounded-full">
        <ArrowLeft size={30} />
      </button>{" "}
      <button
        onClick={handleRight}
        className="absolute top-auto bg-background shadow p-2 -right-2 rounded-full">
        <ArrowRight size={30} />
      </button> */}
      <h3>{LANGUAGE_TEXTS.homePage.lastBooks[lang]}</h3>
      {/* Контейнер с горизонтальной прокруткой */}
      <div
        ref={scrollContainerRef}
        data-scroll
        className="flex overflow-x-scroll rounded-lg w-full gap-5 p-2 shadow">
        {" "}
        {books?.map((view, i) => (
          <button
            onClick={() => router.push("/home/story/" + view.storyId)}
            className="text-start shrink-0 active:opacity-50 transition-opacity"
            key={view.story.id}>
            <Image
              src={view.story.cover}
              alt={`${view.story.title} cover`}
              width={100}
              className="w-28.75 rounded-sm h-40.25"
              height={200}
            />
            <h4 className="font-bold mt-2 hover:text-amber-600 transition-colors">
              {view.story.title}
            </h4>
            <div className="flex justify-between">
              <div className="text-foreground/50 capitalize">
                {view.story.category}
              </div>
              <div className="bg-gray-200/50 inline-block px-2 text-foreground/50 rounded-xl">
                {view.story.type}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
