"use client";
import type { Story, User } from "@/prisma/generated/prisma/client";
import { Book, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthorItem({
  author,
}: {
  author: User & { stories: Story[] };
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/home/user/" + author.id)}
      className="flex gap-2 text-start items-center shadow p-2 rounded-xl">
      {author.image ? (
        <Image
          src={author.image}
          width={50}
          height={50}
          className="h-12.5 w-12.5"
          alt={`${author.username} avatar image`}
        />
      ) : (
        <UserIcon size={50} />
      )}
      <div>
        <h4>{author.username}</h4>
        <p>Bla blal blalalb blala blall ablal blala blla</p>
        <p className="flex items-center gap-2 text-amber-600">
          <Book />
          {author.stories.length}
        </p>
      </div>
    </button>
  );
}
