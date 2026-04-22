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
        router.push("/home/profile/story/" + story.id + "?id=" + userId)
      }
      className="shadow p-2 bg-gray-200 hover:opacity-60 active:opacity-50 transition-opacity  rounded-xl ">
      {story.cover ? (
        <Image src={story.cover} alt="story cover" width={200} height={400} />
      ) : (
        <div className="w-25 h-50"></div>
      )}
      <div>
        <h3>{story.title}</h3>
        <p>{story.description}</p>
      </div>
    </button>
  );
}
