import { DocumentData } from "firebase/firestore";
import { ActionType } from "../reducers";

export const initialSetUserData = (type: string, data: string) => {
  return {
    type: ActionType.USER.INPUT_EMAIL_PASSWORD,
    payload: { type, data },
  };
};

export const userLoading = (data: DocumentData) => {
  return {
    type: ActionType.USER.LOADING,
    payload: { data },
  };
};

export const resumeAddCom = (content: {
  image: string[];
  text: string[] | null[];
  type: number;
  comName: string;
  id: string;
}) => {
  return {
    type: ActionType.RESUME.ADD_COMPONENT,
    payload: { content },
  };
};

export const resumeAddTemplate = (
  templateArr: {
    image: string[];
    text: string[] | null[];
    type: number;
    comName: string;
    id: string;
  }[]
) => {
  return {
    type: ActionType.RESUME.ADD_TEMPLATE,
    payload: { templateArr },
  };
};

export const resumeDeleteCom = (index: number) => {
  return {
    type: ActionType.RESUME.DELETE_COMPONENT,
    payload: { index },
  };
};

export const resumeFillContent = (index: number, textArr: string[]) => {
  return {
    type: ActionType.RESUME.FILL_TEXT,
    payload: { index, textArr },
  };
};

export const resumeAddImage = (index: number, imageArr: string[]) => {
  return {
    type: ActionType.RESUME.ADD_IMAGE,
    payload: { index, imageArr },
  };
};

export const resumeAddSetting = (type: string, text: string) => {
  return {
    type: ActionType.RESUME.ADD_SETTING,
    payload: { type, text },
  };
};

export const resumeRenewContent = (
  content: {
    image: string[];
    text: string[];
    type: number;
    comName: string;
    id: string;
  }[]
) => {
  return {
    type: ActionType.RESUME.RENEW_CONTENT,
    payload: { content },
  };
};

export const resumeLoading = (data: DocumentData) => {
  return {
    type: ActionType.RESUME.LOADING,
    payload: { data },
  };
};

//------------------------ WEBSITE ----------------------------//

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

export const websiteFillContent = (
  index: number,
  textArr: string[] | null[]
) => {
  return {
    type: ActionType.WEBSITE.FILL_CONTENT,
    payload: { index, textArr },
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
  index: number,
  textArr: string[] | null[]
) => {
  return {
    type: ActionType.PORTFOLIO.FILL_CONTENT,
    payload: { index, textArr },
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
