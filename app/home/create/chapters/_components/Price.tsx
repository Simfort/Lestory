"use client";

import useLang from "@/lib/hooks/useLang";
import useCreateStore from "@/store/useCreateStore";
import { Check } from "lucide-react";
import { useState } from "react";

const titlePrice = { en: "Price", ru: "Цена" };
const free = { en: "Free", ru: "Бесплатно" };

export default function Price() {
  const [lang] = useLang();

  const [flagFree, setFreeFlag] = useState(false);
  const { data, setData } = useCreateStore();
  const price = data.price;
  const setPrice = (arg: string) => {
    setData({ ...data, price: arg });
  };
  console.log(price);
  if (!data) return "loading";
  return (
    <div className="flex flex-col gap-2">
      <h4>{titlePrice[lang]}</h4>
      <input
        type="number"
        min={0}
        onChange={(e) => setPrice(e.target.value)}
        step={0.01}
        value={flagFree ? 0 : price}
        className={` px-4 py-2 bg-white border border-blue-200 w-full rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
      />
      <div className="flex gap-2 items-center">
        <p className={`font-bold text-gray-500 `}>{free[lang]}</p>
        <button
          onClick={() => setFreeFlag(!flagFree)}
          className={`border-2 size-5 flex items-center justify-center rounded-xl ${flagFree ? "border-green-500 text-green-500" : "border-gray-500 text-gray-500"}`}>
          {flagFree && <Check />}
        </button>
      </div>
    </div>
  );
}
