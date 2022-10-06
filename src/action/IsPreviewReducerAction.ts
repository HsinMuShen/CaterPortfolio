import { ActionType } from "../reducers";

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
