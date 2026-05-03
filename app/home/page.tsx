"use client";

import useLang from "@/lib/hooks/useLang";

import dynamic from "next/dynamic";
import NowReaded from "./_components/NowReaded/NowReaded";

import Image from "next/image";
import LastBookSkeleton from "./_components/Skeletons/LastBookSkeleton";
import Footer from "./_components/Footer";

const LazyLastBooks = dynamic(() => import("./_components/LastBooks"), {
  ssr: false,
  loading: () => <LastBookSkeleton />,
});
const LazyNewBooks = dynamic(() => import("./_components/NewBooks"), {
  ssr: false,
  loading: () => <p>Loading component...</p>,
});

const titleYour = { en: "Your", ru: "Добро" };
const titleWelcome = { en: "Welcome", ru: "Пожаловать" };

export default function Page() {
  const [lang] = useLang();
  return (
    <div className="bg-secondary  lg:pt-20 lg:grid grid-cols-9  flex flex-col overflow-x-hidden max-sm:pb-25  items-center h-screen">
      <div className="col-span-full bg-background flex w-full flex-col items-center relative justify-center">
        <div className="rounded-full border border-accent-text max-sm:size-20 size-50 absolute -left-20 max-sm:-left-10"></div>{" "}
        <div className="rounded-full border border-accent-text max-sm:size-20 size-50 absolute -right-20 max-sm:-right-10"></div>
        <h1>
          {titleYour[lang]}{" "}
          <span className="text-accent-text">{titleWelcome[lang]}</span>{" "}
        </h1>
        <Image
          draggable="false"
          src={"/ballFireMain.gif"}
          alt="Gif image"
          width={200}
          height={200}
        />
      </div>

      <section className="col-start-3 col-span-5 w-full flex-col gap-10 flex max-sm:p-0  px-5 py-2">
        <LazyLastBooks />
        <NowReaded />
        <LazyNewBooks />
      </section>
      <Footer />
    </div>
  );
}
