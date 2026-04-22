"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { TStory } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface OfflineState {
  offline: true;
}

export default function NewBooks() {
  const [books, setBooks] = useState<TStory[] | OfflineState | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const lang = useLang();
  const router = useRouter();

  const getBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/story/new");
      if (!res.ok) throw new Error("Network response was not ok");

      const data: TStory[] = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      // Устанавливаем офлайн‑состояние
      setBooks({ offline: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const handleRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // Безопасная проверка офлайн‑состояния
  if (
    books &&
    typeof books === "object" &&
    "offline" in books &&
    books.offline
  ) {
    return (
      <section className="mt-2 p-2 w-full relative flex flex-col justify-center">
        <h3>{LANGUAGE_TEXTS.homePage.new[lang]}</h3>
        <p>No internet connection. Showing offline content.</p>
      </section>
    );
  }

  if (!books || books.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <section className="mt-2 p-2 w-full relative flex flex-col justify-center">
      <h3>{LANGUAGE_TEXTS.homePage.new[lang]}</h3>
      <div
        ref={scrollContainerRef}
        data-scroll
        className="flex overflow-x-scroll rounded-lg w-full gap-5 p-2 shadow">
        {books.map((story, i) => (
          <button
            onClick={() => router.push("/home/story/" + story.id)}
            className="text-start shrink-0 active:opacity-50 transition-opacity"
            key={story.id}>
            <Image
              src={story.cover}
              alt={`${story.title} cover`}
              width={100}
              className="w-28.75 rounded-sm h-40.25"
              height={200}
            />
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
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
