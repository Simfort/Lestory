import {
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
  authors: string;
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

export type UseStory = {
  story: Story | null;
  setStory: (arg: Story | null) => void;
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
