import { Suspense } from "react";
import ProfileStat from "./_components/ProfileStat";
import ProfileContainer from "./_components/ProfileContainer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
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
    <div className="lg:grid bg-secondary lg:grid-cols-9 flex pt-20  p-5 overflow-y-scroll min-h-screen items-center ">
      <div className="col-start-3 col-span-5  w-full flex flex-col gap-5  py-20  max-sm:py-0 md:h-screen min-h-screen rounded-xl">
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileStat profile={profile} />
          <ProfileContainer profile={profile} />
        </Suspense>
      </div>
    </div>
  );
}
