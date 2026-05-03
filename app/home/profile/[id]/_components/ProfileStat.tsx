"use client";

import useLang from "@/lib/hooks/useLang";
import { Story, User } from "@/prisma/generated/prisma/client";
import { Book, Circle, Settings, User2, Users } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSelectedProfile } from "@/store/useSelectedProfile";
import { IUser } from "@/lib/types";
import SettingsModal from "./SettingsModal";

const titleButtons = [
  { en: "Books", ru: "Произведения" },
  { en: "Comments", ru: "Комментарии" },
  { en: "History views", ru: "История просмотров" },
  { en: "Reviews", ru: "Отзывы" },
];

export default function ProfileStat({ profile }: { profile: IUser }) {
  const [lang] = useLang();
  const [settingFlag, setSettingsFlag] = useState(false);

  const { selected, setSelected } = useSelectedProfile();
  return (
    <div className=" bg-background py-2  w-full  flex flex-col  max-sm:h-max rounded-md   ">
      <div className="flex w-full px-5 flex-wrap items-center gap-2 ">
        {profile && profile.image ? (
          <Image src={profile.image} alt="User Logo" width={50} height={50} />
        ) : (
          <User2 size={50} />
        )}
        <div className="flex flex-col w-full gap-2">
          <p className="font-bold">{profile.username}</p>
          <a className="text-sm" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>{" "}
        </div>
        <div className="flex gap-5 w-full max-sm:justify-start font-bold text-gray-600 text-sm justify-end items-center">
          <Users />
          <p>0 Following</p>
          <Circle size={10} />
          <p>0 Followers</p>
          <button
            onClick={() => setSettingsFlag(!settingFlag)}
            className="hover:opacity-50 active:opacity-40">
            <Settings />
          </button>
        </div>{" "}
      </div>
      <hr className="w-full h-2  mt-5 text-foreground/20" />{" "}
      <div className="flex gap-2 px-5 relative flex-wrap">
        {" "}
        {settingFlag && <SettingsModal />}
        {titleButtons.map((title, i) => (
          <div key={i} className="flex flex-col">
            <button
              className={`${selected === i ? "text-foreground" : "text-foreground/50"} transition-colors`}
              onClick={() => setSelected(i)}>
              {title[lang]}
            </button>
            {i === selected && (
              <motion.hr
                layout
                layoutId="border-button-profile"
                className="text-accent-text h-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
