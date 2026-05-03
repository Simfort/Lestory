import { IStory, IStoryLikes, IStoryView } from "./types";

export function getStories(likes: (IStoryLikes | IStoryView)[]): IStory[] {
  return likes.map((likes) => likes.story);
}
export function getStoriesAll(
  likes: IStoryLikes[],
  views: IStoryView[],
): IStory[] {
  const all = [...likes, ...views];
  const obj = {} as { [id: string]: IStory };
  for (const item of all) {
    if (obj[item.id]) {
      continue;
    }
    obj[item.id] = item.story;
  }
  return Object.values(obj);
}
