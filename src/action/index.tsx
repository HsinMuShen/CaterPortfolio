import { DocumentData } from "firebase/firestore";
import { ActionType } from "../reducers";
import ResumeReducer from "../reducers/ResumeContent";

export const resumeAddCom = (content: {
  image: string[];
  text: string;
  type: number;
}) => {
  return {
    type: ActionType.RESUME.ADD_COMPONENT,
    payload: { content },
  };
};

export const resumeDeleteCom = (index: number) => {
  return {
    type: ActionType.RESUME.DELETE_COMPONENT,
    payload: { index },
  };
};

export const resumeFillContent = (index: number, html: string) => {
  return {
    type: ActionType.RESUME.FILL_CONTENT,
    payload: { index, html },
  };
};

export const resumeAddImage = (index: number, imageArr: string[] | null[]) => {
  return {
    type: ActionType.RESUME.ADD_IMAGE,
    payload: { index, imageArr },
  };
};

export const resumeLoading = (data: DocumentData) => {
  return {
    type: ActionType.RESUME.LOADING,
    payload: { data },
  };
};

export const websiteFillContent = (index: number, html: string) => {
  return {
    type: ActionType.WEBSITE.FILL_CONTENT,
    payload: { index, html },
  };
};

export const websiteAddImage = (index: number, JSONstring: string) => {
  return {
    type: ActionType.WEBSITE.ADD_IMAGE,
    payload: { index, JSONstring },
  };
};

export const websiteAddTime = () => {
  return {
    type: ActionType.WEBSITE.ADD_TIME,
  };
};
