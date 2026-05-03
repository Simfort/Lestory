import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";

export default function NewsStoriesSkeleton({
  type,
}: {
  type: "new" | "topViews" | "topLikes";
}) {
  const [lang] = useLang();

  return (
    <section className="mt-2 w-full">
      <h4 className="text-foreground/50 pl-2 pb-2">
        {LANGUAGE_TEXTS.homePage.nowReaded[type][lang]}
      </h4>
      <div className=" flex w-full flex-col  gap-5 ">
        {new Array(5).fill(null).map((_, i) => (
          <div key={i} className=" h-35 w-50 bg-foreground/20"></div>
        ))}
      </div>
    </section>
  );
}
