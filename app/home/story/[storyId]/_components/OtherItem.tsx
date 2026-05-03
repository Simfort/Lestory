"use client";

import { Story } from "@/prisma/generated/prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OtherItem({
  story,
  index,
  itemRef, // пропс для ref
}: {
  story: Story;
  index: number;
  itemRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/home/story/${story.id}`)}
      ref={itemRef}
      className="bg-white shadow rounded-xl p-2 flex flex-col gap-4 shrink-0">
      <Image
        width={100}
        height={200}
        src={story.cover}
        alt={`${story.title} cover`}
      />
      <div className="px-2">
        <h3 className="font-semibold">{story.title}</h3>
      </div>
    </div>
  );
}
