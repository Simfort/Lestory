"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { Story, User } from "@/prisma/generated/prisma/client";
import { marked } from "marked";

export default function StoryContent({
  story,
}: {
  story: Story & { author: Exclude<User, "username" | "image"> };
}) {
  const lang = useLang();
  return (
    <div className="">
      <h3 className="text-center">
        {LANGUAGE_TEXTS.storyProfilePage.storyStat.content[lang]}
      </h3>
      {story.type == "md" ? (
        <div
          className="shadow flex flex-col font-mono  mt-2 rounded-xl p-2"
          dangerouslySetInnerHTML={{ __html: marked.parse(story.content) }}
        />
      ) : (
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(story.content)}&embedded=true`}
          width="100%"
          height="600px"
          title="PDF viewer"
        />
      )}
    </div>
  );
}
