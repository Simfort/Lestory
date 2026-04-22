"use client";

import { Home, Plus, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function FooterPhoneHome() {
  const { data: session } = useSession();

  return (
    <footer className="px-5 gap-5 bottom-0 left-0 fixed items-center justify-center flex w-screen bg-background py-2 border-t border-amber-50 z-1000 ">
      <Link
        href={"/home/create"}
        className="rounded-xl border-2 text-blue-500 hover:opacity-50 active:opacity-40 transition-opacity border-blue-100 p-2">
        <Plus />
      </Link>{" "}
      <Link
        href={"/home"}
        className="rounded-xl border-2 text-blue-500 hover:opacity-50 active:opacity-40 transition-opacity border-blue-100 p-2">
        <Home />
      </Link>{" "}
      <Link
        href={
          session
            ? "/home/profile?id=" + (session.user as { id: string }).id
            : "/home"
        }
        className="hover:opacity-50 active:opacity-40 transition-opacity">
        {session ? (
          session.user?.image ? (
            <Image
              width={40}
              height={40}
              alt="Your avatar profile"
              src={session.user.image}
            />
          ) : (
            <User2 size={40} />
          )
        ) : (
          ""
        )}
      </Link>{" "}
    </footer>
  );
}
