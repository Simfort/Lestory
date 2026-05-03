import { Suspense } from "react";
import Story from "./_components/Story";

export default async function Page({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) {
  const storyId = (await params).storyId;
  const getStory = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/story?id=${storyId}`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      }
      console.log(res.statusText);
    } catch (error) {
      console.error(error);
    }
  };
  const story = await getStory();
  console.log(story);
  return (
    <div className=" bg-gray-200    overflow-y-scroll h-screen ">
      {" "}
      <Suspense fallback={<p>Loading..</p>}>
        {" "}
        <Story story={story} />
      </Suspense>
    </div>
  );
}
