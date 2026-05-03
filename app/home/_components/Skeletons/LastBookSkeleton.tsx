import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";

export default function LastBookSkeleton() {
  const [lang] = useLang();
  return (
    <section className="mt-2 p-4 w-full  bg-background rounded-xl select-none relative flex flex-col justify-center">
      <h3>{LANGUAGE_TEXTS.homePage.lastBooks[lang]}</h3>

      {/* Контейнер с горизонтальной прокруткой */}
      <div className="flex  rounded-lg w-full overflow-hidden gap-5 py-5 ">
        {new Array(5).fill(null).map((_, i) => (
          <div
            className="text-start bg-foreground/20  h-70.25 shrink-0 transition-opacity w-47.75"
            key={i}></div>
        ))}
      </div>
    </section>
  );
}
