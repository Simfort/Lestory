"use client";

import StoryItem from "./StoryItem";
import useLang from "@/lib/hooks/useLang";
import { Search } from "lucide-react";
import { IStory, IUser } from "@/lib/types";
import { useOptionProfileFilter } from "@/store/useOptionProfileFilter";
import { getStoriesAll, getStories } from "@/lib/utils";

const textPlaceholder = {
  en: "Write name of story",
  ru: "Напиши название книги",
};

export default function ProfileStories({ profile }: { profile: IUser }) {
  const [lang] = useLang();
  const { options } = useOptionProfileFilter();
  let stories: IStory[] = [];
  console.log(options);
  switch (options.list) {
    case 0:
      stories = getStoriesAll(profile.likes, profile.views);
      break;
    case 1:
      stories = getStories(profile.views);
      break;
    case 2:
      stories = getStories(profile.likes);
      break;
  }
  switch (options.sortBy) {
    case 0:
      stories.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      break;
    case 1:
      stories.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case 3:
      break;
  }
  return (
    <>
      <label className="relative flex w-full  items-center">
        <input
          type="text"
          placeholder={textPlaceholder[lang]}
          className={` px-4 py-2 pl-10 bg-white border border-blue-200 w-full rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
        />
        <Search size={20} className="absolute left-2" />
      </label>

      <div className="flex flex-wrap  justify-center gap-5 bg-background rounded-md p-5 ">
        {stories.map((story) => (
          <StoryItem story={story} key={story.id} userId={profile.id} />
        ))}
      </div>
    </>
  );
}
