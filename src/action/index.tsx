import { ActionType } from "../reducers/ResumeContent";


export const resumeFillContent = (index:number,html: string) => {
  return {
    type: ActionType.FILL_CONTENT,
    payload: { index,html },
  };
};

export const resumeAddImage = (index:number,url: string) => {
  return {
    type: ActionType.ADD_IMAGE,
    payload: { index,url },
  };
};
