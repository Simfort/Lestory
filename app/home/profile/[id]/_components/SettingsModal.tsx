"use client";

import useLang from "@/lib/hooks/useLang";
import { useTheme } from "@/lib/hooks/useTheme";
import { AccessLangs } from "@/lib/types";
import { Moon, Sun, Globe, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const textLang = { en: "Language", ru: "Язык" };
const textTitle = { en: "Settings", ru: "Настройки" };
const pathFlags = { en: "english", ru: "russia" };

export default function SettingsModal() {
  const [lang, setLang] = useLang();
  const { theme, toggleTheme } = useTheme();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const handleSetFlag = (flag: AccessLangs) => {
    setLang(flag);
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className="flex flex-col border border-accent-text w-64 absolute z-10 right-4  p-4 rounded-md bg-background shadow backdrop-blur-sm border-opacity-30">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-foreground/10">
        <h4 className="text-lg font-semibold text-foreground">
          {textTitle[lang]}
        </h4>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/70 transition-all duration-200 flex items-center justify-center"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-yellow-400" />
          ) : (
            <Sun className="w-5 h-5 text-orange-400" />
          )}
        </button>
      </div>

      {/* Выбор языка */}
      <div className="mb-4">
        <button
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 border border-foreground/20">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent-text" />
            <span className="font-medium text-foreground">
              {textLang[lang]}
            </span>
            <Image
              src={`/${pathFlags[lang]}.svg`}
              width={20}
              height={20}
              alt={`${pathFlags[lang]} flag`}
              className="rounded-full"
            />
          </div>
          <ChevronDown
            className={`w-4 h-4 text-foreground/60 transition-transform duration-200 ${
              isLanguageMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Выпадающее меню языков */}
        {isLanguageMenuOpen && (
          <div className="mt-2 p-2 rounded-md bg-secondary/20 border border-foreground/20">
            <div className="space-y-1">
              {(["en", "ru"] as AccessLangs[]).map((language) => (
                <button
                  key={language}
                  onClick={() => handleSetFlag(language)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-150
                    ${
                      lang === language
                        ? "bg-accent-text/10 text-accent-text border border-accent-text/30"
                        : "hover:bg-secondary/50 text-foreground"
                    }
          `}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={`/${pathFlags[language]}.svg`}
                      width={18}
                      height={18}
                      alt={`${pathFlags[language]} flag`}
                      className="rounded-full"
                    />
                    <span className="capitalize">{language}</span>
                  </div>
                  {lang === language && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
