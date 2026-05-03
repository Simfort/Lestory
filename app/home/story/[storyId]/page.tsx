"use client";
import { Suspense } from "react";
import Story from "./_components/Story";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const getStory = async () => {
    const storyId = window.location.pathname.split("/").pop();
    try {
      const res = await fetch(
        `http://localhost:3000/api/story/views?id=${storyId}&user=${(session?.user as { id: string }).id}`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["storyView"],
    queryFn: getStory,
    enabled: session ? true : false,
  });
  console.log(data);
  return (
    <div className=" bg-gray-200  pb-20 pt-20  overflow-y-scroll h-screen ">
      {isPending ? <p>LOading</p> : <Story story={data} />}
    </div>
  );
}
