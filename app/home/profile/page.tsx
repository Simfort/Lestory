import { Suspense } from "react";
import ProfileStat from "./_components/ProfileStat";
import ProfileStories from "./_components/ProfileStories";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const userId = (await searchParams).id;
  const getUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:${process.env.PORT || 3000}/api/user?id=${userId}`,
        {
          method: "GET",
        },
      );

      const data = await res.json();

      console.log(data, "data user");
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const profile = await getUser();
  return (
    <div className="flex flex-col bg-radial  to-white from-gray-200 p-5 overflow-y-scroll h-screen items-center ">
      <div className="shadow bg-white w-full flex gap-5 flex-wrap py-10 justify-center items-center h-screen rounded-xl">
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileStat profile={profile} />
          <ProfileStories profile={profile} userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}
