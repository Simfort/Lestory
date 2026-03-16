"use client";
import { Github, Twitch } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInForm() {
  return (
    <form className="mt-5 flex  gap-5">
      <button
        type="button"
        onClick={() => signIn("github")}
        className="hover:opacity-50 transition-opacity">
        <Github size={50} />
      </button>
      <button type="button" className="hover:opacity-50 transition-opacity">
        <Image src={"/google.svg"} width={50} height={50} alt="google icon" />
      </button>
    </form>
  );
}
