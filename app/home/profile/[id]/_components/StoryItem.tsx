"use client";
import { Story } from "@/prisma/generated/prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StoryItem({
  story,
  userId,
}: {
  story: Story;
  userId: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push("/home/profile/" + userId + "/story/" + story.id)
      }
      className=" p-2 hover:opacity-60 active:opacity-50 transition-opacity  rounded-xl ">
      {story.cover ? (
        <Image
          src={story.cover}
          alt="story cover"
          width={150}
          height={200}
          className="max-sm:w-30 max-sm:h-40"
        />
      ) : (
        <div className="w-37.5 h-50"></div>
      )}
      <div>
        <h3>{story.title}</h3>
        <p>{story.description}</p>
      </div>
    </button>
  );
}
