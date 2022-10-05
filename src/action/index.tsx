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

export const portfolioAddImage = (
  index: number,
  imageArr: string[] | null[]
) => {
  return {
    type: ActionType.PORTFOLIO.ADD_IMAGE,
    payload: { index, imageArr },
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

export const changeLoginState = (boolean: boolean) => {
  return {
    type: ActionType.ISPREVIEW.ISLOGIN,
    payload: { boolean },
  };
};

export const isPreviewProfile = () => {
  return {
    type: ActionType.ISPREVIEW.PROFILE,
  };
};

export const isPreviewResume = () => {
  return {
    type: ActionType.ISPREVIEW.RESUME,
  };
};

export const isPreviewWebsite = () => {
  return {
    type: ActionType.ISPREVIEW.WEBSITE,
  };
};

export const isPreviewPortfolio = () => {
  return {
    type: ActionType.ISPREVIEW.PORTFOLIO,
  };
};

export const isPreviewTrue = (type: string) => {
  return {
    type: ActionType.ISPREVIEW.TRUE,
    payload: { type },
  };
};

export const isPreviewFalse = (type: string) => {
  return {
    type: ActionType.ISPREVIEW.FALSE,
    payload: { type },
  };
};

export const setChatRoomID = (
  chatRoomID: string,
  name: string,
  userImage: string
) => {
  return {
    type: ActionType.ISPREVIEW.SET_CHAT_ROOM,
    payload: { chatRoomID, name, userImage },
  };
};

export const setAlert = (alertData: { isAlert: boolean; text: string }) => {
  return {
    type: ActionType.ISPREVIEW.SET_ALERT,
    payload: { alertData },
  };
};

export const setHomepageList = (arr: number[]) => {
  return {
    type: ActionType.ISPREVIEW.SET_HOMEPAGE_LIST,
    payload: { arr },
  };
};

export const setPortfolioIndex = (index: number) => {
  return {
    type: ActionType.PORTFOLIOINDEX.SET_INDEX,
    payload: { index },
  };
};

export const setPortfolioListIndex = (index: number) => {
  return {
    type: ActionType.PORTFOLIOINDEX.SET_PORTFOLIO_INDEX,
    payload: { index },
  };
};
