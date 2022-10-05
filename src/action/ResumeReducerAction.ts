import { DocumentData } from "firebase/firestore";
import { ActionType } from "../reducers";

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

export const resumeFillContent = (
  type: string,
  index: number,
  arr: string[] | null[]
) => {
  return {
    type: ActionType.WEBSITE.FILL_CONTENT,
    payload: { type, index, arr },
  };
};

export const resumeAddSetting = (type: string, text: string | boolean) => {
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
