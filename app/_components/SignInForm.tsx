"use client";
import { Github, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const handleSignInGitHub = async () => {
    setLoading(true);
    try {
      await signIn("github");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSignInGoogle = async () => {
    setLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="mt-5 flex  gap-5">
      {" "}
      <button
        type="button"
        disabled={loading}
        onClick={handleSignInGitHub}
        className="hover:opacity-50 active:opacity-40 transition-opacity ">
        {loading ? <Loader className=" animate-spin" /> : <Github size={50} />}
      </button>
      <button
        onClick={handleSignInGoogle}
        type="button"
        disabled={loading}
        className="hover:opacity-50 disabled:opacity-75 active:opacity-40 transition-opacity">
        <Image src={"/google.svg"} width={50} height={50} alt="google icon" />
      </button>
    </form>
  );
}
