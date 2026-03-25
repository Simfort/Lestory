"use client";

import type { Story as StoryI, User } from "@/prisma/generated/prisma/client";
import { useStory } from "@/store/useStory";
import { useEffect } from "react";
import StoryStat from "./StoryStat";
import StoryContent from "./StoryContent";
import Image from "next/image";

export default function Story({
  story,
}: {
  story: StoryI & { author: Omit<User, "username" | "image"> };
}) {
  const { setStory } = useStory();
  useEffect(() => {
    console.log(story);
    if (story !== null) {
      setStory(story);
    }
  }, [story]);
  return (
    <div className="mt-20 relative w-full ">
      {" "}
      <div className="bg-background shadow relative z-2 rounded-xl mt-20">
        <StoryStat story={story} />
        <hr className="w-full mt-2 mb-2 text-blue-300" />
        <StoryContent story={story} />
      </div>
    </div>
  );
}
