"use client";
import { Chapter } from "@/lib/types";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChapterItem({
  chapter,
  setChapters,
  index,
}: {
  chapter: Chapter;
  setChapters: (newChapters: (prev: Chapter[]) => Chapter[]) => void;
  index: number;
}) {
  const settingsRef = useRef<HTMLButtonElement | null>(null);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [openSettings, setOpenSettings] = useState(false);
  const chapterRef = useRef<HTMLInputElement | null>(null);
  const [newTitle, setNewTitle] = useState<string | null>(null);
  const handleClickPickFile = () => {
    setOpenSettings(false);
    if (filePickerRef.current) filePickerRef.current.click();
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (files) {
        setChapters((prev) => {
          const newArr = [...prev];
          newArr[index].images = files;
          return newArr;
        });
      }
    }
  };
  const handleClickRename = () => {
    setOpenSettings(false);
    setNewTitle(chapter.title);
  };
  const handleClickRemove = () => {
    setOpenSettings(false);
    setChapters((prev) => {
      const newArr = [...prev.slice(0, index), ...prev.slice(index + 1)];
      return newArr;
    });
  };
  const handleClickSuccess = () => {
    setChapters((prev) => {
      const newArr = [...prev];
      if (newTitle) newArr[index].title = newTitle;
      return newArr;
    });
    setNewTitle(null);
  };
  const handleChangeRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  useEffect(() => {
    if (newTitle !== null && chapterRef.current) {
      chapterRef.current.focus();
    }
  }, [newTitle]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openSettings &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setOpenSettings(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openSettings]);

  return (
    <div
      className="bg-gray-200/50 shadow relative rounded-md items-center justify-between flex pr-5   w-full"
      key={chapter.title}>
      <input
        onChange={handleChangeFile}
        ref={filePickerRef}
        type="file"
        hidden
      />
      <div className="p-2 bg-gray-400/20 h-full  text-foreground/40 rounded-l-md">
        {index + 1}
      </div>
      {newTitle === null ? (
        <>
          <p className="w-full ml-2"> {chapter.title}</p>
          <button
            ref={settingsRef}
            onClick={() => setOpenSettings(!openSettings)}
            className="flex flex-col hover:opacity-50 active:opacity-40 transition-opacity items-center gap-0.5">
            <span className="size-1 shrink-0 rounded-full bg-blue-600"></span>
            <span className="size-1 shrink-0 rounded-full bg-blue-600"></span>
            <span className="size-1 shrink-0  rounded-full bg-blue-600"></span>
          </button>
        </>
      ) : (
        <>
          {" "}
          <input
            ref={chapterRef}
            value={newTitle}
            onChange={handleChangeRename}
            type="text"
            className="w-full  outline-0  ml-2"
          />
          <button onClick={handleClickSuccess} className=" text-green-500">
            <Check />
          </button>
        </>
      )}

      {openSettings && (
        <div className="p-2 justify-center gap-2 w-30  top-10 right-0 flex flex-col z-50 absolute  bg-background shadow rounded-xl">
          <button
            onClick={handleClickRename}
            className="hover:opacity-50 text-blue-600 active:opacity-40 transition-opacity">
            Rename
          </button>
          <hr className="text-blue-600" />
          <button
            onClick={handleClickPickFile}
            className="hover:opacity-50 text-blue-600 active:opacity-40 transition-opacity">
            Change File
          </button>{" "}
          <hr className="text-blue-600" />
          <button
            onClick={handleClickRemove}
            className="text-red-500 hover:opacity-50  active:opacity-40 transition-opacity flex items-center justify-center">
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
