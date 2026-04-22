"use client";

import useCreatorBookDB from "@/lib/hooks/useCreatorBookDB";
import { CreateData } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PreviewChapterItem from "./_components/PreviewChapterItem";

export default function Page() {
  const { get, loading, error } = useCreatorBookDB();
  const [preview, setPreview] = useState<CreateData | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    if (loading || error) return;
    get(1)
      .then((res) => {
        console.log(res);
        setPreview(res);
      })
      .catch((res) => console.log("Error:" + res));
  }, [loading, error]);
  if (!preview) return <div>aBAME</div>;
  return (
    <div className="bg-gray-800  text-white relative min-h-screen">
      <aside className="flex-col p-2 gap-2 bg-black/50 h-full fixed flex w-50">
        <Link href={"/home/create/chapters?step=2"}>
          <ArrowLeft className="text-blue-500" />
        </Link>
        <div className="flex flex-col gap-5">
          {preview?.chapters.map((chapter, i) => (
            <button
              onClick={() => setCurrentChapter(i)}
              key={i}
              className={`${currentChapter === i ? "opacity-100 bg-blue-950" : "opacity-50"} flex items-center transition-all border rounded-xl border-blue-800 px-5 py-2 text-start text-sm justify-between hover:opacity-100 active:opacity-100 `}>
              <h4 className="font-bold">{chapter.title}</h4>
              <p className="text-blue-100/50"> {chapter.images.length}</p>
            </button>
          ))}
        </div>
      </aside>
      <div className="flex items-center p-2 flex-col">
        <h2 className="bg-black/50 rounded-lg p-5 shadow">
          {preview.chapters[currentChapter].title}
        </h2>
        {preview.chapters[currentChapter].images.map((file, i) => (
          <PreviewChapterItem image={file} key={i} />
        ))}
      </div>
    </div>
  );
}
