"use client";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import useCreateStore from "@/store/useCreateStore";

export default function TitleAndDesc() {
  const lang = useLang();
  const { errors } = useCreateStore();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="title" className="relative">
        <h3 className="font-bold text-lg">
          {LANGUAGE_TEXTS.createPage.storyCreator.form.title[lang]}{" "}
          <span className="text-red-500">*</span>
        </h3>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title-1"
          className={`w-full px-4 py-3 bg-white border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
        />
      </label>{" "}
      <label htmlFor="description">
        <h3 className="font-bold text-lg">
          {" "}
          {LANGUAGE_TEXTS.createPage.storyCreator.form.description[lang]}{" "}
          <span className="text-red-500">*</span>
        </h3>
        <input
          type="text"
          name="description"
          placeholder="Story-1"
          className={`w-full px-4 py-3 bg-white border ${errors.desc ? "border-red-500" : "border-gray-300"} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
        />
      </label>{" "}
    </div>
  );
}
