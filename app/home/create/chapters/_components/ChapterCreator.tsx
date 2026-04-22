"use client";

import useLang from "@/lib/hooks/useLang";
import { Plus } from "lucide-react";
import { useRef } from "react";
import ChapterItem from "./ChapterItem";
import useCreateStore from "@/store/useCreateStore";
import { Chapter } from "@/lib/types";
import Link from "next/link";

const titleButton = { en: "Add chapter", ru: "Добавить главу" };

const titleChapters = { en: "Chapters", ru: "Главы" };
const paragraphChapters = {
  en: "Select multiple files to fill out your chapter",
  ru: "Выберите несколько файлов для того чтобы заполнить вашу главу",
};
const titlePreview = {
  en: "Preview",
  ru: "Предпросмотр",
};

export default function ChapterCreator() {
  const lang = useLang();
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const { setData, data } = useCreateStore();
  const chapters = data.chapters;
  const setChapters = (newChapters: (prev: Chapter[]) => Chapter[]) => {
    const result = newChapters(data.chapters);
    setData({ ...data, chapters: result });
  };

  const handlePickFile = () => {
    if (filePickerRef.current) {
      filePickerRef.current.value = "";
      filePickerRef.current.click();
    }
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const filesArray = Array.from(e.target.files); // FileList → File[]

      const newChapter: Chapter = {
        title:
          chapters.length > 0 ? `Chapter ${chapters.length + 1}` : `Chapter 1`,
        images: filesArray,
      };

      setChapters((prev) => [...prev, newChapter]);
    } else {
      console.log("No files selected");
    }
  };

  return (
    <div>
      <input
        ref={filePickerRef}
        onChange={handleChangeFile}
        type="file"
        multiple
        hidden
      />
      <div className="flex flex-col gap-2">
        <div className="bg-gray-200/10 p-2 flex flex-col gap-4 rounded-xl w-full">
          <h4 className="font-light">{titleChapters[lang]}</h4>
          <p className="text-sm text-foreground/70">
            {paragraphChapters[lang]}
          </p>{" "}
          <button
            onClick={handlePickFile}
            className="text-amber-800 hover:opacity-50 active:opacity-40 transition-opacity gap-2 flex items-center justify-center bg-gray-200/50 shadow p-2 rounded-xl">
            <p>{titleButton[lang]}</p>
            <Plus />
          </button>
          <Link href={"/home/create/chapters/preview"}>
            {titlePreview[lang]}
          </Link>
          {chapters.map((chapter, index) => (
            <ChapterItem
              index={index}
              setChapters={setChapters}
              key={chapter.title}
              chapter={chapter}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
