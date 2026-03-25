"use client";

import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { useModal } from "@/store/useModal";
import { Plus } from "lucide-react";
import ImageC from "next/image";
import { ChangeEvent, DragEvent, useRef, useState } from "react";

export default function CoverDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const [urlCover, setUrlCover] = useState("");

  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const { setModal } = useModal();
  const lang = useLang();

  const handleClick = () => {
    console.log(2);
    filePickerRef.current?.click();
  };
  const getDemensions = (
    url: string,
  ): Promise<{ width: number; height: number }> => {
    return new Promise((res) => {
      const img = new Image();
      img.onload = (e) => {
        console.log(img.width, img.height);
        res({ width: img.width, height: img.height });
      };
      img.onerror = (e) => {
        console.error("error load image");
        console.log(e);
      };
      img.src = url;
    });
  };
  const handleUploadImage = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const { width, height } = await getDemensions(reader.result as string);
        if (width !== 400 && height !== 600) {
          setModal({
            title: "Error Size Image",
            description: "Image cover size 400 x 600",
            type: "error",
          });
        } else {
          setUrlCover(reader.result as string);
        }
      };
      reader.onerror = () => {
        console.error("Ошибка при загрузке изображения:", reader.error);
        setModal({
          type: "notifications",
          title: "Ошибка",
          description: "Не удалось загрузить изображение",
        });
      };
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
      setModal({
        type: "notifications",
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
      });
    }
  };
  const handlePickerChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setModal({
        type: "notifications",
        title: "Pick File",
        description: "You need pick file for cover",
      });
      return;
    }
    const file = e.target.files[0];
    if (!file) {
      setModal({
        type: "notifications",
        title: "Pick File",
        description: "You need pick file for cover",
      });
      return;
    }
    handleUploadImage(file);
  };
  const handleIsDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(true);
  };
  const handleIsDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleIsDragLeave = (e: DragEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    const relatedTarget = e.relatedTarget as Node | null;

    // Проверяем, остался ли курсор внутри контейнера
    if (!currentTarget.contains(relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = Array.from(e.dataTransfer.files)[0];

    handleUploadImage(droppedFile);
  };
  return (
    <div
      role="button"
      aria-label="File Picker"
      onClick={handleClick}
      onDragEnter={handleIsDragEnter}
      onDragLeave={handleIsDragLeave}
      onDragOver={handleIsDragOver}
      onDrop={handleDrop}
      className={`w-100 h-150 max-sm:w-80 max-sm:h-140 rounded-xl ${isDragging ? "bg-foreground/30" : "bg-background"} border-blue-200 justify-center flex flex-col items-center  border-5 border-dotted`}>
      <input type="hidden" name="urlCover" value={urlCover} />
      <input
        ref={filePickerRef}
        onChange={handlePickerChange}
        type="file"
        hidden
        accept="image/png, image/webp, image/jpeg"
      />
      {isDragging ? (
        <Plus size={40} />
      ) : urlCover ? (
        <ImageC
          width={100}
          height={100}
          src={urlCover}
          alt="Image for cover"
          className="w-full h-full rounded-xl"
        />
      ) : (
        <>
          <p>
            {LANGUAGE_TEXTS.createPage.storyCreator.form.cover.coverDrag[lang]}
          </p>
          <p className="text-blue-500">.PNG , .JPG , .WEBP</p>
        </>
      )}
    </div>
  );
}
