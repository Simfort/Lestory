import {
  Comment,
  CommentLike,
  Story,
  StoryLike,
  StoryView,
  User,
} from "@/prisma/generated/prisma/client";

export type AccessLangs = "en" | "ru";

export type UseStore = {
  openMenu: boolean;
  setOpenMenu: (arg: boolean) => void;
};
export type ErrorsCreator = {
  content: string;
  title: string;
  desc: string;
  category: string;
};

export type StateCreatorAction = {
  errors: null | Partial<ErrorsCreator>;
  id: null | number;
  success: boolean;
};
export type Chapter = { title: string; images: File[] };
export type CreateData = {
  title: string;
  description: string;
  cover: string;
  chapters: Chapter[];
  category: string;
  keywords: string;

  price: string;
};
export type UseCreateStore = {
  errors: Partial<ErrorsCreator>;
  setError: (arg: Partial<ErrorsCreator>) => void;
  setData: (arg: CreateData) => void;
  data: CreateData;
};

export type AccordionReducerTypes = "MARKDOWN" | "PDF";

export type Modal = {
  title: string;
  description: string;
  type: "error" | "success" | "notifications";
};

export type UseModal = {
  data: Modal | null;
  setModal: (arg: Modal | null) => void;
};

export type IStory = Story & {
  views: StoryView[];
  likes: StoryLike[];
  author: User;
  chapters: Chapter[];
};
export type UseStory = {
  story: IStory | null;
  setStory: (arg: IStory | null) => void;
};
export type TStory = Story & { author: User } & { views: StoryView[] } & {
  likes: StoryLike[];
};

export type BGDataLoading = {
  view: boolean;
  title: string;

  cb: null | ((signal: AbortSignal) => Promise<void>);
};

export type UseLoadingBackground = {
  data: BGDataLoading;
  setData: (arg: BGDataLoading) => void;
};
export type IComment = Comment & {
  answers: IComment[];
  comment: IComment;
  author: User;
  likes: CommentLike[];
};
export type UseSearchOpen = {
  searchOpen: boolean;
  setSearchOpen: (arg: boolean) => void;
};
export type UseSelectedProfile = {
  selected: number;
  setSelected: (arg: number) => void;
};

export type ProfileOptionStories = {
  sortBy: number;
  list: number;
  up: boolean;
};
export type UseOptionProfileFilter = {
  options: ProfileOptionStories;
  setOption: (arg: ProfileOptionStories) => void;
};
export type IStoryView = StoryView & { story: IStory };
export type IStoryLikes = StoryLike & { story: IStory };
export type IUser = User & {
  stories: IStory[];
  likes: IStoryLikes[];
  views: IStoryView[];
};
export type UseLanguage = {
  lang: string;
  setLang: (arg: string) => void;
};
