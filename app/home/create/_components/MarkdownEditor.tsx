"use client";
import { useRef } from "react";
import { marked } from "marked";
import { File } from "lucide-react";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";

function MarkdownEditor({
  content,
  setContent,
}: {
  content: string;
  setContent: (arg: string) => void;
}) {
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const lang = useLang();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      alert("File is not selected!");
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setContent(reader.result as string);
    };
    reader.onerror = () => {
      throw new Error(reader.error?.message);
    };
  };
  const handleMarkdownPickClick = () => {
    filePickerRef.current?.click();
  };
  return (
    <div className="mt-2 ">
      <textarea
        value={content}
        required
        onChange={handleChange}
        placeholder="Using Markdown"
        className="w-full shadow-xl h-30 rounded-xl p-2 bg-background
      "
      />
      <h3 className="mt-2">
        {
          LANGUAGE_TEXTS.createPage.storyCreator.form.markdownEditor.h2Preview[
            lang
          ]
        }
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
        className=" bg-background p-2 overflow-y-scroll h-50 "
      />
      <input
        onChange={handleChangeFile}
        ref={filePickerRef}
        type="file"
        accept="text/markdown"
        hidden
      />
      <button
        type="button"
        onClick={handleMarkdownPickClick}
        className="p-2 rounded-xl  bg-blue-400 font-bold shadow-xl transition-opacity hover:opacity-50 active:opacity-40 flex gap-2 text-background mt-5">
        {
          LANGUAGE_TEXTS.createPage.storyCreator.form.markdownEditor
            .uploadMarkdownButton[lang]
        }{" "}
        <File className="text-blue-100" />
      </button>
    </div>
  );
}

export default MarkdownEditor;
