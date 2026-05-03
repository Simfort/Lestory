"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { ArrowRight } from "lucide-react";

import dynamic from "next/dynamic";
import NewsStoriesSkeleton from "./Skeletons/NewsStoriesSkeleton";

const LazyNewsStories = dynamic(() => import("./NewsStories"), {
  ssr: false,
  loading: () => <NewsStoriesSkeleton type="new" />,
});
const LazyMoreViewsStories = dynamic(() => import("./MoreViewsStories"), {
  ssr: false,
  loading: () => <NewsStoriesSkeleton type="topViews" />,
});
const LazyMoreLikesStories = dynamic(() => import("./MoreLikesStories"), {
  ssr: false,
  loading: () => <NewsStoriesSkeleton type="topLikes" />,
});

export default function NowReaded() {
  const [lang] = useLang();
  return (
    <section className="w-full p-4 select-none  bg-background rounded-xl">
      <h3 className="pl-2 flex gap-2 items-center">
        {LANGUAGE_TEXTS.homePage.nowReaded.title[lang]} <ArrowRight />
      </h3>
      <div
        data-scroll
        className="flex justify-center  overflow-x-scroll p-4  w-full ">
        <LazyNewsStories />
        <LazyMoreViewsStories />
        <LazyMoreLikesStories />
      </div>
    </section>
  );
}
