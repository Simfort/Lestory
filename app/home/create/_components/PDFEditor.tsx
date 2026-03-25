"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import { BookOpenText, X } from "lucide-react";
import { useRef, useState } from "react";

export default function PDFEditor({
  setMD,
  closeMD,
  urlPDF,
  setUrlPDF,
}: {
  setMD: (arg: string) => void;
  closeMD: () => void;
  urlPDF: string;
  setUrlPDF: (arg: string) => void;
}) {
  const lang = useLang();
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const [progress, setProgress] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handlePickerPDFClick = () => {
    closeMD();
    setMD("");
    handleReset();
    filePickerRef.current?.click();
  };
  const handleChangeFilePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(213);
    if (!e.target.files) {
      alert("File is not selected!");
      return;
    }
    const file = e.target.files[0];

    setIsLoading(true);
    setProgress(0);
    // Освобождаем предыдущий URL, если он был

    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(percentComplete);
      }
    };
    reader.onload = () => {
      setUrlPDF(reader.result as string);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0); // Сброс прогресса после завершения
      }, 500);
    };
    reader.onerror = () => {
      alert("Ошибка при чтении файла");
      setIsLoading(false);
      setProgress(0);
    };
    reader.readAsDataURL(file);
  };
  const handleReset = () => {
    // 2. Очищаем состояние
    setUrlPDF("");
    setIsLoading(false);
    setProgress(0);
    // 3.Сбрасываем значение input
    if (filePickerRef.current) {
      filePickerRef.current.value = "";
    }
  };
  return (
    <div>
      {" "}
      <input
        onChange={handleChangeFilePDF}
        ref={filePickerRef}
        type="file"
        name="urlPDF"
        accept="application/pdf"
        hidden
      />
      <div className="flex items-center mt-2 gap-2 mb-2">
        {" "}
        <button
          type="button"
          onClick={handlePickerPDFClick}
          className="font-bold shadow-xl bg-red-600 hover:opacity-50 active:opacity-40 transition-opacity  text-white flex rounded-xl w-full gap-4  p-2">
          <BookOpenText />
          {LANGUAGE_TEXTS.createPage.storyCreator.form.pdf[lang]}
        </button>
        {urlPDF && (
          <button
            onClick={handleReset}
            type="button"
            className="p-2 bg-background rounded-xl hover:opacity-50 active:opacity-40 transition-opacity shadow-xl">
            <X />
          </button>
        )}
      </div>
      {isLoading && (
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Загрузка: </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      {urlPDF && (
        <object data={urlPDF} type="application/pdf" width="100%" height={600}>
          {" "}
          <p>
            Ваш браузер не поддерживает встроенный просмотр PDF.
            <a href={urlPDF}>Скачайте файл</a>.
          </p>
        </object>
      )}
    </div>
  );
}
