"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import Story from "./_components/Story";
import { Loader } from "lucide-react";

export default function Page() {
  const { storyId } = useParams();
  const { data: session } = useSession();
  const getAndViewingUser = async () => {
    const res = await fetch(
      `/api/story/views?id=${storyId}&user=${session!.user!.id}`,
      {
        method: "PATCH",
      },
    );
    const data = await res.json();
    console.log(data);
    return data;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["storyViews", session],
    queryFn: getAndViewingUser,
    enabled: !!storyId && !!session, // Включаем запрос только при наличии storyId и сессии
    retry: 2, // Автоповтор при ошибке (максимум 2 раза)
    staleTime: 5 * 60 * 1000, // Кэшируем на 5 минут
    refetchOnWindowFocus: false, // Не перезагружаем при фокусе окна
    refetchOnMount: true,
  });
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin" size={100} />
      </div>
    );
  }
  if (error) {
  }
  return (
    <div className="py-10 overflow-y-scroll h-screen  ">
      {data && <Story story={data} />}
    </div>
  );
}
