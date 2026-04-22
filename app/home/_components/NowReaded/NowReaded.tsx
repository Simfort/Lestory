"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { ArrowRight } from "lucide-react";

import dynamic from "next/dynamic";

const LazyNewsStories = dynamic(() => import("./NewsStories"), { ssr: false });
const LazyMoreViewsStories = dynamic(() => import("./MoreViewsStories"), {
  ssr: false,
});
const LazyMoreLikesStories = dynamic(() => import("./MoreLikesStories"), {
  ssr: false,
});

export default function NowReaded() {
  const lang = useLang();
  return (
    <section className="w-full ">
      <h3 className="pl-2 flex gap-2 items-center">
        {LANGUAGE_TEXTS.homePage.nowReaded.title[lang]} <ArrowRight />
      </h3>
      <div data-scroll className="flex  overflow-x-scroll grid-cols-3 ">
        <LazyNewsStories />
        <LazyMoreViewsStories />
        <LazyMoreLikesStories />
      </div>
    </section>
  );
}
