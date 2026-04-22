"use client";

import useLang from "@/lib/hooks/useLang";
import useCreateStore from "@/store/useCreateStore";

const titleAuthors = { en: "Authors", ru: "Авторы" };

export default function InputAuthors() {
  const lang = useLang();

  const { data, setData } = useCreateStore();
  const authors = data.authors;
  const setAuthors = (arg: string) => {
    setData({ ...data, authors: arg });
  };

  return (
    <div>
      <label htmlFor="authors">
        {" "}
        <h4>{titleAuthors[lang]}</h4>
      </label>

      <input
        type="text"
        value={authors}
        onChange={(e) => setAuthors(e.target.value)}
        id="authors"
        className="p-3 rounded-xl shadow outline-0 border w-full border-amber-200 focus:border-amber-400"
      />
    </div>
  );
}
