"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import OtherItem from "./OtherItem";
import { Story } from "@/prisma/generated/prisma/client";
import useLang from "@/lib/hooks/useLang";

interface PaginatedStories {
  data: Story[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}
const otherTitle = {
  en: "Others",
  ru: "Похожее",
};

export default function OtherStories({ category }: { category: string }) {
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const [lang] = useLang();
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<PaginatedStories>({
      queryKey: ["othersStories", category],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(
          `/api/story/others?category=${category}&page=${pageParam}`,
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.pagination.hasMore
          ? lastPage.pagination.page + 1
          : undefined;
      },
    });

  // Объединяем все страницы в один массив
  const stories = data?.pages.flatMap((page) => page.data) || [];

  // Настройка Intersection Observer для горизонтальной прокрутки
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px 100px 0px 0px", // 100 px справа от контейнера
        threshold: 0,
      },
    );

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isFetching && !data) {
    return <p>Loading...</p>;
  }

  return (
    <section className="bg-gray-200/20  col-start-3 col-span-5   p-5">
      <h2>{otherTitle[lang]}</h2>
      <div
        className="flex gap-5 overflow-x-auto pb-4"
        style={{
          scrollbarWidth: "thin",
          msOverflowStyle: "none",
        }}>
        {/* Контейнер для горизонтальной прокрутки */}
        <div className="flex gap-5 min-w-max">
          {stories.map((story, index) => {
            // Если это последний элемент — добавляем ref для наблюдения
            const isLastItem = index === stories.length - 1;
            return (
              <OtherItem
                key={story.id}
                index={index}
                story={story}
                itemRef={isLastItem ? lastItemRef : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
