"use client";
import useLang from "@/lib/hooks/useLang";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import CropEditor from "./CropEditor";
import Image from "next/image";
import ChapterCreator from "./ChapterCreator";
import useCreateStore from "@/store/useCreateStore";

const textButton = {
  en: "Add Cover",
  ru: "Добавить обложку",
};
const titleNotCover = {
  en: "Cover is not selected",
  ru: "Обложка не выбрана",
};
const titleCover = {
  en: "Cover",
  ru: "Обложка",
};
const titleContent = {
  en: "Content",
  ru: "Контент",
};

export default function Cover() {
  const lang = useLang();
  const [url, setUrl] = useState("");
  const { data, setData } = useCreateStore();
  const currentUrl = data.cover;
  const setCurrentUrl = (cover: string) => {
    setData({ ...data, cover });
  };
  const [flagCrop, setFlagCrop] = useState(false);
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const handleGetFile = () => {
    if (filePickerRef.current) {
      handleReset();
      filePickerRef.current.click();
    }
  };

  const handleReset = () => {
    setUrl("");
    setCurrentUrl("");
    if (filePickerRef.current) filePickerRef.current.value = "";
  };

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result as string);
        setFlagCrop(true);
      };
      reader.onerror = () => {
        console.error(reader.error);
      };

      reader.readAsDataURL(file);
    } else {
      console.log("File is not defined");
      console.log(e.target.files);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-5 md:w-100 w-70.25 pt-20   justify-center mb-5"
      transition={{ duration: 0.5 }}>
      <h3>{titleCover[lang]}</h3>
      <div className="shrink-0 p-4">
        <input
          onChange={handleChangeCover}
          ref={filePickerRef}
          type="file"
          hidden
          accept=".png,.jpeg,.webp"
        />
        <button
          className="bg-amber-300 rounded-xl shadow p-2 hover:opacity-75 active:opacity-50 transition-opacity w-full  font-medium"
          onClick={handleGetFile}>
          {textButton[lang]}
        </button>
      </div>
      <div className="grow  p-2 bg-gray-50 rounded-lg">
        {flagCrop && (
          <CropEditor
            setCurrentUrl={setCurrentUrl}
            url={url}
            setFlagCrop={setFlagCrop}
          />
        )}
        {currentUrl ? (
          <div className="flex justify-center mt-4">
            <Image
              src={currentUrl}
              alt="Current url"
              width={300}
              height={500}
            />
          </div>
        ) : (
          <h4 className="text-foreground/50 text-center">
            {titleNotCover[lang]}
          </h4>
        )}
      </div>{" "}
      <h3>{titleContent[lang]}</h3>
      <ChapterCreator />
    </motion.div>
  );
}
