import { ActionType } from "../reducers";


export const resumeFillContent = (index:number,html: string) => {
  return {
    type: ActionType.RESUME.FILL_CONTENT,
    payload: {index,html},
  };
};

export const resumeAddImage = (index:number,url: string) => {
  return {
    type: ActionType.RESUME.ADD_IMAGE,
    payload: {index,url},
  };
};

export const websiteFillContent = (index:number,html: string) => {
  return {
    type: ActionType.WEBSITE.FILL_CONTENT,
    payload: {index,html},
  };
};

export const websiteAddImage = (index:number,JSONstring: string) => {
  return {
    type: ActionType.WEBSITE.ADD_IMAGE,
    payload: {index,JSONstring},
  };
};

export const websiteAddTime = () => {
  return {
    type: ActionType.WEBSITE.ADD_TIME,
  };
};
