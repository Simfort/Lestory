import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";
import useCreateStore from "@/store/useCreateStore";

export default function CatAndKey() {
  const lang = useLang();
  return (
    <div className="mt-2">
      <h3>
        {
          LANGUAGE_TEXTS.createPage.storyCreator.form
            .categoriesAndKeywordsTitle[lang]
        }
      </h3>
      <div className="flex gap-2">
        <Category />
        <Keywords />
      </div>
    </div>
  );
}

export function Keywords() {
  const { keywords, setKeywords } = useCreateStore();

  const keywordsFormated = Array.from(new Set(keywords.split("#").slice(1)));
  const [rightChangeFlag, setRightChangeFlag] = useState(false);
  const lang = useLang();
  const handleChangeKeywords = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith("#")) setKeywords(e.target.value);
    if (e.target.value.startsWith("#") && e.target.value.trim().length > 1) {
      setRightChangeFlag(true);
    } else {
      setRightChangeFlag(false);
    }
  };
  return (
    <div className="w-full relative">
      <input
        placeholder={
          LANGUAGE_TEXTS.createPage.storyCreator.form.keywords.placeholder[lang]
        }
        value={keywords}
        name="keywords"
        className=" w-full
          p-4
          bg-white
          text-gray-800
          border-2
          border-gray-200
          rounded-2xl
                shadow-sm
          flex
          items-center
          justify-between
          cursor-pointer
          outline-none
          hover:border-blue-400
          hover:shadow
          transition-all
          duration-300"
        onChange={handleChangeKeywords}
      />
      <div className="flex gap-2 mt-3 flex-wrap">
        {keywordsFormated.map((word) =>
          word.trim() ? (
            <p
              key={word}
              className="px-2 py-1 text-sm border-2 bg-blue-100 text-blue-500 font-bold border-blue-500 rounded-full">
              {word}
            </p>
          ) : (
            ""
          ),
        )}
      </div>
      <p
        className={`${rightChangeFlag ? "text-green-500" : "text-red-500"} flex mt-3 flex-wrap`}>
        {rightChangeFlag ? (
          <>
            <Check />
            {LANGUAGE_TEXTS.createPage.storyCreator.form.keywords.right[lang]}
          </>
        ) : (
          <>
            <X />
            {
              LANGUAGE_TEXTS.createPage.storyCreator.form.keywords.notRight[
                lang
              ]
            }
          </>
        )}
      </p>
    </div>
  );
}

export function Category() {
  const [isOpen, setIsOpen] = useState(false);
  const lang = useLang();
  const [other, setOther] = useState("");

  const {
    category: selected,
    setCategory: setSelected,
    errors,
  } = useCreateStore();
  const options = [
    {
      value: "adventure",
      label:
        "🗻 " +
        LANGUAGE_TEXTS.createPage.storyCreator.form.categories.adventure[lang],
      color: "from-green-50 to-green-100",
    },
    {
      value: "horror",
      label:
        "🦇 " +
        LANGUAGE_TEXTS.createPage.storyCreator.form.categories.horror[lang],
      color: "from-red-50 to-red-100",
    },
    {
      value: "fanfic",
      label:
        "✍️ " +
        LANGUAGE_TEXTS.createPage.storyCreator.form.categories.fanfic[lang],
      color: "from-purple-50 to-purple-100",
    },
    {
      value: "fantasy",
      label:
        "🧙‍♂️ " +
        LANGUAGE_TEXTS.createPage.storyCreator.form.categories.fantasy[lang],
      color: "from-blue-50 to-blue-100",
    },
  ];

  const handleSelect = (value: string) => {
    setIsOpen(false);
    setSelected(value);
  };
  const handleSelectOpt = () => {
    const label = options.find((opt) => opt.value === selected)?.label;
    if (label) {
      return label;
    }
    return other;
  };
  return (
    <div className="w-full relative">
      {/* Выбранное значение */}
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby="category-label"
        type="button"
        className={`
          w-full
          p-4
          bg-white
          text-gray-800
          border-2
          ${errors.category ? "border-red-500" : "border-gray-300"}
          rounded-2xl
                shadow-sm
          flex
          items-center
          justify-between
          cursor-pointer
          hover:border-blue-400
          hover:shadow
          transition-all
          duration-300 
        `}
        onClick={() => setIsOpen(!isOpen)}>
        <span className={selected ? "font-semibold" : "text-gray-400"}>
          {selected ? handleSelectOpt() : "Выберите жанр"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-600" : "text-gray-500"
          }`}
        />
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <ul
          role="listbox"
          aria-activedescendant={selected || undefined}
          className="
            absolute
            
            left-0
            right-0
            mt-1
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-gray-100
            z-50
            max-h-60
            overflow-y-auto
          ">
          {options.map((option) => (
            <li
              role="option"
              aria-selected={selected === option.value}
              key={option.value}
              className={`
                p-3
                px-4
                cursor-pointer
                flex
                items-center
                gap-3
                rounded-lg
                transition-colors
                duration-200 
                ${
                  selected === option.value
                    ? `bg-gradient-to-r ${option.color} font-semibold border-l-4 border-blue-500`
                    : "hover:bg-gray-50"
                }
              `}
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSelect(option.value);
                }
              }}
              tabIndex={-1}>
              <span>{option.label}</span>
              {selected === option.value && (
                <button onClick={() => setIsOpen(false)} className="ml-auto">
                  <X className="w-3 h-3  text-blue-600" />
                </button>
              )}
            </li>
          ))}
          <div className="flex gap-2  items-center">
            {" "}
            <input
              onChange={(e) => {
                setOther(e.target.value);
              }}
              type="text"
              placeholder="Other"
              className="outline-none p-4 w-full"
            />
            {other && (
              <button
                onClick={() => setSelected(other)}
                type="button"
                className="shadow-xl rounded-full p-1 transition-colors bg-gray-100 border-2 border-transparent  hover:border-green-200 active:border-green-50 max-md:mr-5">
                <Check className="text-green-500 max-md:size-4 " />
              </button>
            )}
          </div>
        </ul>
      )}
    </div>
  );
}
