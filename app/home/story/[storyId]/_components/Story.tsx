import StoryContent from "@/app/home/profile/story/[storyId]/_components/StoryContent";

import { TStory } from "@/lib/types";

import StoryStat from "./StoryStat";

export default function Story({ story }: { story: TStory }) {
  return (
    <div className=" relative w-full pb-10 ">
      <div
        className="bg-background shadow flex flex-wrap
      justify-center items-center relative pb-5 z-2 gap-2 rounded-xl ">
        <StoryStat story={story} />
        <StoryContent story={story} />
      </div>
    </div>
  );
}
