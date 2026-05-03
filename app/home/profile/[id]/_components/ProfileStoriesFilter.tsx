import useLang from "@/lib/hooks/useLang";
import { useOptionProfileFilter } from "@/store/useOptionProfileFilter";
import { Book, Eye, Heart, Settings } from "lucide-react";

const titleList = {
  en: "List",
  ru: "Списки",
};
const titleSort = { en: "By Sort", ru: "Сортировка" };
const buttonsTitle = [
  {
    en: "All",
    ru: "Все",
  },
  {
    en: "Readed",
    ru: "Читали",
  },
  {
    en: "Favorite",
    ru: "Любимые",
  },
];
const icons = [
  <Book size={20} key={1} />,
  <Eye size={20} key={2} />,
  <Heart size={20} key={3} />,
];
const sortButtons = [
  {
    en: "By name(A-Z)",
    ru: "По названию(А-Я)",
  },
  {
    en: "By date",
    ru: "По дате",
  },
  {
    en: "By reading",
    ru: "По чтения",
  },
];

export default function ProfileStoriesFilter() {
  const [lang] = useLang();
  const { setOption, options } = useOptionProfileFilter();
  return (
    <aside className="h-full flex flex-col gap-5 p-2 text-sm ">
      <div className="flex flex-col  gap-2 ">
        <h4 className="flex items-center  text-foreground/40 gap-1 ">
          <div className="h-px w-5 bg-foreground/40" />
          {titleList[lang]}
          <Settings size={20} className="shrink-0" />{" "}
          <div className="h-px w-full bg-foreground/40" />
        </h4>
        {buttonsTitle.map((buttonText, i) => (
          <button
            key={i}
            onClick={() => setOption({ ...options, list: i })}
            className={`p-2 ${options.list === i ? "bg-foreground/2" : ""} flex items-center gap-2 hover:bg-foreground/2 active:bg-foreground/5 w-full text-start transition-colors rounded-md`}>
            {icons[i]}
            {buttonText[lang]}
          </button>
        ))}
      </div>{" "}
      <div className="flex flex-col  gap-2 ">
        <h4 className="flex items-center  text-foreground/40 gap-1 ">
          {" "}
          <div className="h-px w-5 bg-foreground/40" />
          {titleSort[lang]}
          <div className="h-px w-full bg-foreground/40" />
        </h4>
        {sortButtons.map((buttonText, i) => (
          <button
            onClick={() => setOption({ ...options, sortBy: i })}
            key={i}
            className="p-2 flex items-center gap-2 hover:bg-foreground/2   active:bg-foreground/5 w-full text-start rounded-md">
            <div
              className={`${options.sortBy === i ? " border-accent-text" : "border-foreground/20"} transition-all duration-150 border-2 rounded-full p-px `}>
              <div
                className={`${options.sortBy === i ? " bg-accent-text" : "bg-foreground/20"} transition-all duration-75  size-2 rounded-full`}></div>
            </div>
            {buttonText[lang]}
          </button>
        ))}
      </div>
    </aside>
  );
}
