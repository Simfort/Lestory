"use client";
import Image from "next/image";
import SignInForm from "./SignInForm";
import useLang from "@/lib/hooks/useLang";
import { LANGUAGE_TEXTS } from "@/lib/language";

export default function SignInMain() {
  const [lang] = useLang();
  return (
    <main className="w-full  p-2 shadow bg-gray-50 rounded-2xl ">
      <h1 className="text-foreground flex gap-2 items-center bg-accent-text p-2 rounded-2xl  font-bold text-2xl">
        <Image src={"/ramen.svg"} alt="ramen svg logo" width={50} height={50} />{" "}
        {LANGUAGE_TEXTS.authPage.signInTitle[lang]}
      </h1>
      <div className=" flex  flex-col mt-20 items-center">
        <Image
          src={"/naruto.png"}
          alt="naruto background"
          width={400}
          height={400}
        />
        <p className="text-foreground/60 font-bold text-center">
          {
            LANGUAGE_TEXTS.authPage.signInDescription.firstDescription.text[
              lang
            ]
          }
          <span className="text-yellow-600">
            {
              LANGUAGE_TEXTS.authPage.signInDescription.firstDescription.span[
                lang
              ]
            }
          </span>
          <br />
          {
            LANGUAGE_TEXTS.authPage.signInDescription.secondDescription.text[
              lang
            ]
          }
          <span className="text-yellow-600">
            {" "}
            {
              LANGUAGE_TEXTS.authPage.signInDescription.secondDescription.span[
                lang
              ]
            }
          </span>
        </p>
        <div className="flex flex-wrap justify-center gap-5 mt-5">
          <div className=" border-2 border-green-500 text-green-500 rounded-full px-2 bg-green-100 font-bold">
            {LANGUAGE_TEXTS.authPage.words.money[lang]}
          </div>
          <div className=" border-2 border-yellow-500 text-yellow-500 rounded-full px-2 bg-yellow-100 font-bold">
            {LANGUAGE_TEXTS.authPage.words.popularity[lang]}
          </div>
          <div className=" border-2 border-pink-500 text-pink-500 rounded-full px-2 bg-pink-100 font-bold">
            {LANGUAGE_TEXTS.authPage.words.intresting[lang]}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5 text-foreground/50 w-full">
          <hr className=" grow-2" />
          <p>{LANGUAGE_TEXTS.authPage.hr[lang]}</p> <hr className="grow-2" />
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
