"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import StepBar from "./_components/StepBar";
import TitleInput from "./_components/TitleInput";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CaK from "./_components/CaK";
import Cover from "./_components/Cover";
import { useEffect } from "react";
import useCreateStore from "@/store/useCreateStore";
import useCreatorBookDB from "@/lib/hooks/useCreatorBookDB";
import SettingBook from "./_components/SettingBook";
import useLoadingBackground from "@/store/useLoadingBackground";
import createBook from "@/lib/createBook";

const stepsComponents = [
  <TitleInput key={0} />,
  <CaK key={1} />,
  <Cover key={2} />,
  <SettingBook key={3} />,
];

export default function Page() {
  const router = useRouter();
  const step = Number(useSearchParams().get("step"));
  const { get, update, loading, error } = useCreatorBookDB();
  const { setData: setBGLoad } = useLoadingBackground();
  const { data, setData } = useCreateStore();
  let disabled = { next: true, back: step === 0 };
  useEffect(() => {
    if (loading || error) return;
    get(1)
      .then((res) => {
        if (res) {
          console.log("Data retrieved:", res);

          setData(res);
          update({ id: 1, ...res }); // Используем res вместо неопределённого data
        } else {
          console.log("No data found for id: 1");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [loading, error]); // Добавляем error в зависимости
  if (loading) return <div>Инициализация базы данных...</div>;
  if (error) return <div>Ошибка БД: {error.message}</div>;
  switch (step) {
    case 0:
      if (data.title && data.description) {
        disabled = { back: true, next: false };
        update({ id: 1, ...data });
        break;
      } else {
        disabled = { back: true, next: true };
        break;
      }

    case 1:
      if (data.category && data.keywords) {
        disabled = { back: false, next: false };
        update({ id: 1, ...data });
        break;
      } else {
        disabled = { back: false, next: true };
        break;
      }
    case 2:
      if (data.cover && data.chapters.length) {
        disabled = { back: false, next: false };
        console.log(data, "2");
        update({ id: 1, ...data });
        break;
      } else {
        disabled = { back: false, next: true };

        break;
      }
    case 3:
      if (data.price) {
        disabled = { back: false, next: false };

        update({ id: 1, ...data });
        break;
      } else {
        disabled = { back: false, next: true };

        break;
      }
  }

  const handleNextStep = async () => {
    if (step && step < stepsComponents.length) {
      if (step === 3) {
        setBGLoad({
          title: "Upload Book",
          cb: async (signal) => {
            await createBook(data, signal);
          },

          view: true,
        });
        router.push(`/home`);
      } else {
        router.push(`?step=${Number(step) + 1}`);
      }
    } else {
      router.push("?step=1");
    }
  };

  const handleBackStep = () => {
    if (step && step > 0) {
      router.push("?step=" + (step - 1));
    }
  };

  return (
    <div className=" min-h-screen lg:flex lg:items-center  lg:justify-around pb-20 pt-20 relative   p-2">
      <div></div>
      <div className=" px-10 fixed lg:left-80 lg:top-40  max-sm:w-screen">
        {" "}
        <StepBar step={step || 0} />
      </div>{" "}
      <div className="flex flex-col w-max max-sm:ml-auto  max-sm:mr-auto justify-center p-5 h-full">
        <AnimatePresence mode="wait">
          {" "}
          {stepsComponents[step || 0]}
        </AnimatePresence>{" "}
        <div className="flex text-background  w-full justify-between gap-5 mt-2 ">
          {" "}
          <button
            disabled={disabled.back}
            className="bg-accent-text not-disabled:hover:bg-accent-text/20 transition-opacity  disabled:bg-accent-text/20 font-bold p-2 rounded-xl "
            onClick={handleBackStep}>
            <ArrowLeft />
          </button>
          <button
            disabled={disabled.next}
            className="bg-accent-text not-disabled:hover:bg-muted transition-opacity  disabled:bg-muted font-bold p-2 rounded-xl "
            onClick={handleNextStep}>
            {step === stepsComponents.length - 1 ? "Create" : <ArrowRight />}
          </button>{" "}
        </div>
      </div>{" "}
    </div>
  );
}
