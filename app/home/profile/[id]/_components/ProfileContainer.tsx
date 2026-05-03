"use client";

import { useSelectedProfile } from "@/store/useSelectedProfile";
import ProfileStories from "./ProfileStories";

import ProfileTemplate from "./ProfileTemplate";

import ProfileStoriesFilter from "./ProfileStoriesFilter";
import { IUser } from "@/lib/types";

export default function ProfileContainer({ profile }: { profile: IUser }) {
  const { selected } = useSelectedProfile();
  let CurrentElement: null | React.ReactNode;
  switch (selected) {
    case 0:
      CurrentElement = (
        <ProfileTemplate filterElement={<ProfileStoriesFilter />}>
          <ProfileStories profile={profile} />
        </ProfileTemplate>
      );
  }
  return <section>{CurrentElement}</section>;
}
