import { useEffect, useState } from "react";
import { AccessLangs } from "../types";

export default function useLang() {
  const [currLang, setCurrLang] = useState<string>(() => {
    if (typeof window === "undefined") return "ru";
    const savedLang = localStorage.getItem("lang");
    return savedLang || "ru";
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "lang" && event.newValue) {
        setCurrLang(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return currLang as AccessLangs;
}
