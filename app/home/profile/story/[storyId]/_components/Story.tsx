"use client";

import type {
  Story,
  Story as StoryI,
  User,
} from "@/prisma/generated/prisma/client";

import StoryStat from "./StoryStat";
import StoryContent from "./StoryContent";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { TStory } from "@/lib/types";

export default function Story({ story }: { story: TStory }) {
  const { data: session } = useSession();

  if (!session || !story) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" relative w-full pb-10 ">
      {" "}
      <div className="flex items-center mt-20 justify-center gap-5 mb-5">
        <Link
          className="border-blue-300 hover:opacity-60 active:opacity-40 transition-opacity rounded-xl border p-2"
          href={`/home/profile?id=${(session.user as { id: string }).id}`}>
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-center ">Твое произведение</h2>
      </div>
      <div
        className="bg-background shadow flex flex-wrap
      justify-center items-center relative pb-5 z-2 gap-2 rounded-xl ">
        <StoryStat story={story} />

        <StoryContent story={story} />
      </div>
    </div>
  );
}
