import Image from "next/image";
import SignInForm from "./SignInForm";

export default function SignInMain() {
  return (
    <main className="w-full h-full  p-2 shadow bg-gray-50 rounded-2xl ">
      <h1 className="text-background bg-accent-text p-2 rounded-2xl  font-bold text-2xl">
        Sign In
      </h1>
      <div className=" flex  flex-col mt-20 items-center">
        <Image
          src={"/naruto.png"}
          alt="naruto background"
          width={400}
          height={400}
        />
        <p className="text-foreground/60 font-bold text-center">
          Start writing your story and rich{" "}
          <span className="text-yellow-600">money!</span>
          <br />
          Or reading any user`s{" "}
          <span className="text-yellow-600">history!</span>
        </p>
        <div className="flex flex-wrap justify-center gap-5 mt-5">
          <div className=" border-2 border-green-500 text-green-500 rounded-full px-2 bg-green-100 font-bold">
            + Money
          </div>
          <div className=" border-2 border-yellow-500 text-yellow-500 rounded-full px-2 bg-yellow-100 font-bold">
            + Popularity
          </div>
          <div className=" border-2 border-pink-500 text-pink-500 rounded-full px-2 bg-pink-100 font-bold">
            + Interesting history
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5 text-foreground/50 w-full">
          <hr className=" grow-2" />
          <p>Sign In</p> <hr className="grow-2" />
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
