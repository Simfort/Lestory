"use client";

import useLang from "@/lib/hooks/useLang";
import { SendHorizonal } from "lucide-react";
import { useSession } from "next-auth/react";

import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CommentItem from "./CommentItem";
import { IComment } from "@/lib/types";
import SortComment from "./SortComment";

type CommentInfiniteQuery = {
  comments: IComment[];
  pagination: {
    page: number;
    hasMore: boolean;
  };
};
const titleComments = {
  en: "Comments",
  ru: "Комментарии",
};
const commentsPlaceholder = {
  en: "Write  comment",
  ru: "Напишите свой комментарий",
};
const nowComment = {
  en: "Now",
  ru: "Только что",
};
const sortTitle = {
  en: "Sort by",
  ru: "Сортировать по",
};

export default function Comments({ storyId }: { storyId: number }) {
  const [lang] = useLang();
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const lastRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<"old" | "new" | "popular">("new");

  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<CommentInfiniteQuery>({
    queryKey: ["queryComment"],
    queryFn: ({ pageParam }) =>
      fetch(
        `/api/story/comment?page=${pageParam}&storyId=${storyId}&filter=${filter}`,
      ).then((res) => res.json()),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
  });

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
    const last = lastRef.current;
    if (last) {
      observer.observe(last);
    }
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const commentPage = data?.pages.flatMap((page) => page.comments) || [];

  const handleCreateComment = async () => {
    if (session) {
      try {
        const res = await fetch("/api/story/comment", {
          method: "POST",
          body: JSON.stringify({
            content: comment,
            storyId,
            authorId: (session.user as { id: string }).id,
          }),
        });
        const data = await res.json();
        console.log(data);
        await refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <section className="flex items-center p-2 bg-white/50  col-start-3 col-span-5  mt-2 min-h-200 flex-col">
      <h2>{titleComments[lang]}</h2>
      <div className="flex gap-2 w-full items-center">
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          placeholder={commentsPlaceholder[lang]}
          className=" shadow outline-0 hover:border-blue-200 border focus:border-blue-200 transition-all  px-5 py-2 w-full rounded-lg bg-white border-gray-100"
        />

        <button
          onClick={handleCreateComment}
          disabled={!comment}
          className="p-2 flex items-center active:opacity-50 hover:opacity-60 justify-center  shrink-0 size-10 disabled:bg-gray-400 bg-blue-400 text-white rounded-xl">
          <SendHorizonal className="h-full w-full" />
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <p>{sortTitle[lang]}</p>
        <SortComment refetch={refetch} filter={filter} setFilter={setFilter} />
      </div>
      <div className="w-full flex-col flex mt-2 items-center gap-2">
        {commentPage?.map((comment, index) => (
          <CommentItem
            refetch={refetch}
            key={index}
            ref={commentPage.length - 1 === index ? lastRef : null}
            comment={comment}
          />
        ))}
      </div>
    </section>
  );
}
