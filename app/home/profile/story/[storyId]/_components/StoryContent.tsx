"use client";
import PDFViewer from "@/components/PDFViewer";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { Story, User } from "@/prisma/generated/prisma/client";
import { Download, DownloadIcon } from "lucide-react";
import { marked } from "marked";

export default function StoryContent({
  story,
}: {
  story: Story & { author: Exclude<User, "username" | "image"> };
}) {
  const lang = useLang();
  console.log(story.content);
  return (
    <div className="">
      <h3 className="text-center">
        {LANGUAGE_TEXTS.storyProfilePage.storyStat.content[lang]}
      </h3>{" "}
      {story.type == "md" ? (
        <div
          className="shadow flex flex-col font-mono  mt-2 rounded-xl p-2"
          dangerouslySetInnerHTML={{ __html: marked.parse(story.content) }}
        />
      ) : (
        <PDFViewer file={story.content} />
      )}
      <div className="p-4 flex justify-center gap-2 flex-wrap">
        {story.keywords
          .split("#")
          .slice(1)
          .map((word) => (
            <button
              key={word}
              className="bg-blue-100 hover:opacity-70 active:opacity-50 transition-opacity p-2 rounded-xl inline-block text-blue-400">
              {word}
            </button>
          ))}
      </div>
      <div className="flex justify-center ">
        {" "}
        <a
          href={story.content}
          className="shadow rounded-xl hover:opacity-70 active:opacity-50 p-2 bg-blue-50"
          download={story.title}>
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
}
