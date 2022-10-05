import { DocumentData } from "firebase/firestore";
import { ActionType } from "../reducers";

export const portfolioAddCom = (content: {
  image: string[];
  text: string[] | null[];
  type: number;
  portfolioId?: string[];
}) => {
  return {
    type: ActionType.PORTFOLIO.ADD_COMPONENT,
    payload: { content },
  };
};

export const portfolioDeleteCom = (index: number) => {
  return {
    type: ActionType.PORTFOLIO.DELETE_COMPONENT,
    payload: { index },
  };
};

export const portfolioInitialSetup = (type: string, text: string) => {
  return {
    type: ActionType.PORTFOLIO.INITIAL_SETUP,
    payload: { type, text },
  };
};

export const portfolioFillContent = (
  type: string,
  index: number,
  arr: string[] | null[]
) => {
  return {
    type: ActionType.WEBSITE.FILL_CONTENT,
    payload: { type, index, arr },
  };
};

export const portfolioAddTime = () => {
  return {
    type: ActionType.PORTFOLIO.ADD_TIME,
  };
};

export const portfolioAddSetting = (type: string, text: string) => {
  return {
    type: ActionType.PORTFOLIO.ADD_SETTING,
    payload: { type, text },
  };
};

export const portfolioRenewContent = (
  content: {
    image: string[];
    text: string[];
    type: number;
    comName: string;
    id: string;
  }[]
) => {
  return {
    type: ActionType.PORTFOLIO.RENEW_CONTENT,
    payload: { content },
  };
};

export const portfolioLoading = (data: DocumentData) => {
  return {
    type: ActionType.PORTFOLIO.LOADING,
    payload: { data },
  };
};
