import { DocumentData } from "firebase/firestore";
import { ActionType } from "../reducers";

export const websiteAddCom = (content: {
  image: string[];
  text: string[] | null[];
  type: number;
  portfolioId?: string[];
}) => {
  return {
    type: ActionType.WEBSITE.ADD_COMPONENT,
    payload: { content },
  };
};

export const websiteDeleteCom = (index: number) => {
  return {
    type: ActionType.WEBSITE.DELETE_COMPONENT,
    payload: { index },
  };
};

export const websiteChangeText = (
  index: number,
  textArr: string[] | null[]
) => {
  return {
    type: ActionType.WEBSITE.CHANGE_TEXT,
    payload: { index, textArr },
  };
};

export const websiteFillContent = (
  type: string,
  index: number,
  arr: string[] | undefined
) => {
  return {
    type: ActionType.WEBSITE.FILL_CONTENT,
    payload: { type, index, arr },
  };
};

export const websiteChangePortfolioID = (
  index: number,
  textArr: string[] | null[]
) => {
  return {
    type: ActionType.WEBSITE.ADD_PORTFOLIO_ID,
    payload: { index, textArr },
  };
};

export const websiteAddImage = (index: number, imageArr: string[] | null[]) => {
  return {
    type: ActionType.WEBSITE.ADD_IMAGE,
    payload: { index, imageArr },
  };
};

export const websiteAddTime = () => {
  return {
    type: ActionType.WEBSITE.ADD_TIME,
  };
};

export const websiteAddSetting = (type: string, text: string) => {
  return {
    type: ActionType.WEBSITE.ADD_SETTING,
    payload: { type, text },
  };
};

export const websiteRenewContent = (
  content: {
    image: string[];
    text: string[];
    type: number;
    comName: string;
    id: string;
    portfolioID?: string[];
  }[]
) => {
  return {
    type: ActionType.WEBSITE.RENEW_CONTENT,
    payload: { content },
  };
};

export const websiteLoading = (data: DocumentData) => {
  return {
    type: ActionType.WEBSITE.LOADING,
    payload: { data },
  };
};
