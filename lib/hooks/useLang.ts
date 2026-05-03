import { useEffect, useState } from "react";
import { AccessLangs } from "../types";
import { useLanguage } from "@/store/useLanguage";

export default function useLang(): [AccessLangs, (arg: AccessLangs) => void] {
  const { setLang: setCurrLang, lang: currLang } = useLanguage();

  // Функция для установки языка — будет передаваться в пропсах
  const setLanguage = (lang: AccessLangs) => {
    setCurrLang(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "lang" && event.newValue) {
        setCurrLang(event.newValue as AccessLangs);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return [currLang as AccessLangs, setLanguage];
}
