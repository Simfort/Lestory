"use client";

import { Story, User } from "@/prisma/generated/prisma/client";
import { Book, Circle, User2, Users } from "lucide-react";

import Image from "next/image";

export default function ProfileStat({
  profile,
}: {
  profile: User & { stories: Story[] };
}) {
  console.log(profile);
  return (
    <div className="flex    shadow-xl bg-gray-50 py-2 h-full rounded-xl px-5 items-center gap-2 flex-col ">
      {profile && profile.image ? (
        <Image src={profile.image} alt="User Logo" width={100} height={100} />
      ) : (
        <User2 size={50} />
      )}
      <p className="font-bold">{profile.username}</p>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>{" "}
      <button className="bg-yellow-500 hover:opacity-55 active:opacity-40 transition-opacity w-full text-sm rounded-xl p-2 font-bold text-white">
        Edit profile
      </button>
      <div className="flex gap-5 font-bold text-gray-600 text-sm items-center">
        <Users />
        <p>0 Following</p>
        <Circle size={10} />
        <p>0 Followers</p>
      </div>
    </div>
  );
}
