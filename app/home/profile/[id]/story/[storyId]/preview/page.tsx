import { Suspense } from "react";
import Preview from "./_components/Preview";

export default async function Page({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) {
  const storyId = (await params).storyId;
  const getStory = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/story?id=" + storyId,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const story = await getStory();
  return (
    <div>
      <Suspense fallback={<p>Loadinf...</p>}>
        <Preview story={story} />
      </Suspense>
    </div>
  );
}
