"use client";
import useLang from "@/lib/hooks/useLang";
import StoryCreator from "./_components/StoryCreator";
import { LANGUAGE_TEXTS } from "@/lib/language";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Page() {
  const lang = useLang();
  return (
    <div className="flex items-center h-screen   overflow-y-scroll flex-col ">
      <div className="mt-20 w-full p-2 relative">
        {" "}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 50, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center justify-center">
          {" "}
          <Image src={"/ramen.svg"} alt="ramen" width={50} height={50} />
        </motion.div>
        <h2 className=" text-center">
          {" "}
          {LANGUAGE_TEXTS.createPage.storyCreator.title[lang]}
        </h2>
        <StoryCreator />
      </div>
    </div>
  );
}
