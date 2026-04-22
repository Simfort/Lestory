"use client";
import type { TStory } from "@/lib/types";

import { Eye, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StorySearchItem({ story }: { story: TStory }) {
  const router = useRouter();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (e.currentTarget.id !== "story-author")
          router.push("/home/story/" + story.id);
      }}
      className="flex gap-2 text-start active:opacity-50 hover:opacity-60 transition-opacity shadow  rounded-xl overflow-hidden">
      <Image width={100} height={200} src={story.cover} alt="story-cover" />
      <div className="flex p-2 flex-col ">
        <div>
          <h4>{story.title}</h4>
          <p className="text-foreground/50 ">{story.description}</p>
          <Link id="story-author" href={"/home/user/" + story.author.id}>
            {story.author.username}
          </Link>
        </div>
        <div className="flex gap-5 mt-10 items-center">
          <div className="flex gap-2 items-center text-red-500">
            <Heart />
            {story.likes.length}
          </div>
          <div className="flex gap-2  items-center text-blue-500">
            <Eye />
            {story.views.length}
          </div>
          <div className="flex gap-2  items-center text-blue-500">
            <MessageCircle />
            {story.views.length}
          </div>
        </div>
      </div>
    </button>
  );
}
