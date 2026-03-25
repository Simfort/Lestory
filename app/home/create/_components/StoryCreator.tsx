"use client";
import { ArrowDown, ArrowUp, BookMarked, Loader } from "lucide-react";
import MarkdownEditor from "./MarkdownEditor";
import { SubmitEvent, useReducer, useState } from "react";
import { AccordionReducerTypes, ErrorsCreator } from "@/lib/types";

import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";

import PDFEditor from "./PDFEditor";
import CatAndKey from "./CatAndKey";

import useCreateStore from "@/store/useCreateStore";

import TitleAndDesc from "./TitleAndDesc";
import { useModal } from "@/store/useModal";
import { useRouter } from "next/navigation";
import CoverDrop from "./CoverDrop";

const intialState = { markdownEditor: false };

const accordionReducer = (
  prevState: typeof intialState,
  action: { type: AccordionReducerTypes; payload: boolean },
): typeof intialState => {
  switch (action.type) {
    case "MARKDOWN":
      return { ...prevState, markdownEditor: action.payload };
    default:
      throw new Error("This type is not defined:" + action.type);
  }
};

export default function StoryCreator() {
  const lang = useLang();
  const [accordionState, dispatch] = useReducer(accordionReducer, intialState);
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const { keywords, category } = useCreateStore();
  const [urlPDF, setUrlPDF] = useState("");
  const { setError } = useCreateStore();
  const { setModal } = useModal();
  const router = useRouter();

  const handleSumbit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = {} as ErrorsCreator;
    let hasError = false;
    if (!formData.get("title")) {
      hasError = true;
      errors.title = "Title is empty";
    }
    if (!formData.get("description")) {
      hasError = true;
      errors.desc = "Description is empty";
    }
    if (!formData.get("category")) {
      hasError = true;
      errors.category = "Category is empty";
    }
    if (!formData.get("markdown") && !formData.get("urlPDF")) {
      hasError = true;
      errors.content = "Content is empty";
    }

    if (hasError) {
      setModal({
        title: "Form Invaild",
        description: Object.values(errors).join("---"),
        type: "error",
      });
      setError(errors);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/story", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const id = await res.json();

        router.push(`/home/profile/story/${id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSumbit}
      method="POST"
      className="bg-gray-100/50  relative p-2 w-1/1 rounded-xl">
      <input type="hidden" name="markdown" value={markdown} />
      <input type="hidden" name="keywords" value={keywords} />
      <input type="hidden" name="category" value={category} />
      <TitleAndDesc />
      {/** Category and Keywords */}
      <CatAndKey />
      <h3>{LANGUAGE_TEXTS.createPage.storyCreator.form.cover.title[lang]}</h3>
      <div className="flex justify-center">
        <CoverDrop />
      </div>
      <h3 className="mt-5">
        {LANGUAGE_TEXTS.createPage.storyCreator.form.editorsTitle[lang]}{" "}
        <span className="text-red-500">*</span>
      </h3>{" "}
      {/** Markdown buton with editor */}
      <div className="inline-flex relative overflow-hidden  gap-4 mt-2 shadow p-2 bg-gray-50 rounded-xl w-full items-center">
        <BookMarked className="text-blue-500" /> <h4>Markdown Editor </h4>
        <button
          type="button"
          className="bg-background shadow-xl relative z-2  transition-opacity hover:opacity-50 active:opacity-40 ml-auto rounded-full p-2"
          onClick={() => {
            setUrlPDF("");
            dispatch({
              type: "MARKDOWN",
              payload: !accordionState.markdownEditor,
            });
          }}>
          {accordionState.markdownEditor ? (
            <ArrowUp size={15} />
          ) : (
            <ArrowDown size={15} />
          )}{" "}
        </button>{" "}
        <div className="h-10 w-10 border-2 border-dotted rounded-full absolute -bottom-2  z-1  border-blue-500 left-0"></div>
        <div className="h-10 w-10 border-2 border-dotted rounded-full absolute -top-2  border-blue-500 right-0"></div>
      </div>
      {accordionState.markdownEditor && (
        <MarkdownEditor content={markdown} setContent={setMarkdown} />
      )}
      {/** PDF button  */}
      <PDFEditor
        urlPDF={urlPDF}
        setUrlPDF={setUrlPDF}
        closeMD={() => dispatch({ type: "MARKDOWN", payload: false })}
        setMD={setMarkdown}
      />
      <button
        disabled={loading}
        className={`font-bold w-full flex items-center justify-center relative overflow-hidden disabled:bg-gray-500 shadow-xl active:opacity-40 hover:opacity-50 transition-opacity rounded-xl bg-blue-500 text-background p-2`}>
        {" "}
        <div className="h-10 w-10 border-2 border-dotted rounded-full absolute -top-2 left-0"></div>
        {loading ? (
          <Loader size={20} className="text-blue-50 animate-spin" />
        ) : (
          <p>Create</p>
        )}
        <div className="h-10 w-10 border-2 border-dotted rounded-full absolute -bottom-2 right-0"></div>
      </button>{" "}
    </form>
  );
}
