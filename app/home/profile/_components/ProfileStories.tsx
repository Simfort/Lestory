"use client";

import { Story, User } from "@/prisma/generated/prisma/client";
import StoryItem from "./StoryItem";

export default function ProfileStories({
  profile,
  userId,
}: {
  profile: User & { stories: Story[] };
  userId: string;
}) {
  console.log(profile, "stories");
  return (
    <div className="h-full overflow-y-scroll pb-30 max-md:mt-10">
      <div>
        <h3>Stories</h3>
      </div>
      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
        {profile.stories.map((story) => (
          <StoryItem story={story} key={story.id} userId={userId} />
        ))}
      </div>
    </div>
  );
}
