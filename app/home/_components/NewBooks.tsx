"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { TStory } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NewBooks() {
  const [books, setBooks] = useState<TStory[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [lang] = useLang();
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      setIsDragging(true);
      setHasMoved(false); // Сбрасываем флаг движения
      setStartX(e.clientX - scrollContainer.offsetLeft);
      setScrollLeft(scrollContainer.scrollLeft);
      e.preventDefault();
    }
  };

  // Движение во время свайпа
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      e.preventDefault();
      const x = e.clientX - scrollContainer.offsetLeft;
      const walk = startX - x;

      // Если курсор сдвинулся более чем на 5 px — считаем это свайпом
      if (Math.abs(walk) > 5) {
        setHasMoved(true);
      }

      scrollContainer.scrollLeft = scrollLeft + walk;
    }
  };

  // Завершение свайпа
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const handleRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <section className="mt-2 p-4 w-full  bg-background rounded-xl select-none relative flex flex-col justify-center">
      <button
        onClick={handleLeft}
        className="absolute top-1/2 -translate-y-1/2 bg-background shadow p-2 -left-2 rounded-full z-10">
        <ArrowLeft size={30} />
      </button>
      <button
        onClick={handleRight}
        className="absolute top-1/2 -translate-y-1/2 bg-background shadow p-2 -right-2 rounded-full z-10">
        <ArrowRight size={30} />
      </button>

      <h3>{LANGUAGE_TEXTS.homePage.new[lang]}</h3>

      {/* Контейнер с горизонтальной прокруткой */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        ref={scrollContainerRef}
        data-scroll
        className="flex overflow-x-scroll rounded-lg w-full pl-5 gap-5 py-5 scrollbar-hidden"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}>
        {books?.map((story, i) => (
          <button
            onClick={() => {
              // Перенаправляем только если не было свайпа
              if (!hasMoved) {
                router.push("/home/story/" + story.id);
              }
            }}
            className="text-start shrink-0 transition-opacity w-42.25"
            key={story.id}>
            <Image
              draggable="false"
              src={story.cover}
              alt={`${story.title} cover`}
              width={171}
              height={203}
              className="rounded-sm object-cover"
            />
            <h4 className="font-bold mt-2 hover:text-amber-600 transition-colors truncate">
              {story.title}
            </h4>
            <div className="flex justify-between">
              <div className="text-foreground/50 capitalize truncate">
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
