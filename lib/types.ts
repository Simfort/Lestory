import { Story } from "@/prisma/generated/prisma/client";

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

export type UseCreateStore = {
  errors: Partial<ErrorsCreator>;
  setError: (arg: Partial<ErrorsCreator>) => void;
  category: string;
  keywords: string;
  setCategory: (arg: string) => void;
  setKeywords: (arg: string) => void;
};

export type AccordionReducerTypes = "MARKDOWN";

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
