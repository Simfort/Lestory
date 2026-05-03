import useDebouncedValue from "@/lib/hooks/useDebouncedValue";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { Story, User } from "@/prisma/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { LoaderCircle, SearchIcon, X } from "lucide-react";
import { useState } from "react";
import StorySearchItem from "./StorySearchItem";
import Image from "next/image";
import AuthorItem from "./AuthorItem";
import { TStory } from "@/lib/types";

export default function Search({
  setSearchOpen,
}: {
  setSearchOpen: (arg: boolean) => void;
}) {
  const [lang] = useLang();
  const [search, setSearch] = useState("");
  const debouncedValue = useDebouncedValue(search, 300);
  const [searchThing, setSearchThing] = useState("books");
  const { data, error, isLoading } = useQuery<
    (TStory | (User & { stories: Story[] }))[]
  >({
    queryKey: ["searchStories", debouncedValue, searchThing],
    queryFn: async () => {
      const res = await fetch(
        searchThing === "books"
          ? `/api/story?title=${debouncedValue}&many=true`
          : `/api/user?username=${debouncedValue}&many=true`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (res.ok) {
        return data;
      }
      console.log(data);
      return null;
    },

    enabled: !!debouncedValue.trim(),
  });

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.4 }}
      className="p-2 bg-background overflow-y-auto lg:grid lg:grid-cols-9 fixed top-0 z-1001 h-screen w-full  mt-2 ">
      <div className=" col-start-3 col-span-5">
        <div className="flex py-2 items-center">
          <button type="button" onClick={() => setSearchOpen(false)}>
            <X />
          </button>
          <h4 className=" w-full">
            {LANGUAGE_TEXTS.homePage.search.search[lang]}
          </h4>
        </div>{" "}
        <div className="flex w-full px-5  justify-around py-2">
          <button
            onClick={() => setSearchThing("books")}
            className="relative"
            type="button">
            {LANGUAGE_TEXTS.homePage.search.books[lang]}
            {searchThing === "books" && (
              <motion.hr
                className="absolute w-full text-accent-text  "
                layoutId="da"
              />
            )}
          </button>
          <button
            onClick={() => setSearchThing("authors")}
            className="relative"
            type="button">
            {LANGUAGE_TEXTS.homePage.search.authors[lang]}
            {searchThing === "authors" && (
              <motion.hr
                className="absolute w-full text-accent-text "
                layoutId="da"
              />
            )}
          </button>
        </div>
        <div className="flex flex-col items-center">
          {" "}
          <div className="flex w-full gap-2 items-center">
            <SearchIcon />
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder={LANGUAGE_TEXTS.homePage.search.search[lang]}
              type="text"
              className={` px-4 py-2  bg-white border border-blue-200 w-full rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
            />
          </div>
        </div>
        <hr className="mt-2 text-blue-200" />
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <LoaderCircle className="animate-spin " />
          </div>
        ) : data ? (
          data.length > 0 ? (
            searchThing === "books" ? (
              <div className="flex flex-col gap-2  mt-2">
                <h3>
                  {LANGUAGE_TEXTS.homePage.search.books[lang]} ({data.length})
                </h3>
                {data.map((story) => (
                  <StorySearchItem key={story.id} story={story as TStory} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <h3>
                  {LANGUAGE_TEXTS.homePage.search.authors[lang]} ({data.length})
                </h3>
                {data.map((author) => (
                  <AuthorItem
                    key={author.id}
                    author={author as User & { stories: Story[] }}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="mt-10  rounded-full bg-linear-to-b from-gray-50/40 via-gray-200/20 to-gray-50/20  p-5">
              {" "}
              <h2 className="text-center text-foreground/50">
                {LANGUAGE_TEXTS.homePage.search.notFound[lang]}
              </h2>
            </div>
          )
        ) : (
          <p className="text-foreground/50 text-center">
            {searchThing === "books"
              ? LANGUAGE_TEXTS.homePage.search.startBooksSearch[lang]
              : LANGUAGE_TEXTS.homePage.search.startAuthorsSearch[lang]}
          </p>
        )}
      </div>
    </motion.div>
  );
}
