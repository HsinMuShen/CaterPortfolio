import { AnyAction } from "redux";
import { ActionType } from ".";
import { Timestamp } from "firebase/firestore";

interface resumeReducer {
  title: string;
  coverImage: string;
  content: { image: string[]; text: string[]; type: number }[];
  name: string;
  followers: string[];
  tags: string[];
  time: null | Timestamp;
  userID: string;
}

const ResumeReducer = (
  resumeData: resumeReducer = {
    title: "",
    coverImage: "",
    content: [],
    name: "",
    followers: [],
    tags: [],
    time: null,
    userID: "",
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.RESUME.ADD_COMPONENT: {
      const tempContentArr = resumeData.content;
      tempContentArr.push(action.payload.content);
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.DELETE_COMPONENT: {
      const tempContentArr = resumeData.content;
      const index = action.payload.index;
      tempContentArr.splice(index, 1);
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.FILL_CONTENT: {
      const tempContentArr = resumeData.content;
      const index = action.payload.textArr;
      tempContentArr[index] = {
        ...resumeData.content[index],
        text: action.payload.html,
      };
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.ADD_IMAGE: {
      const tempContentArr = resumeData.content;
      const index = action.payload.index;
      tempContentArr[index] = {
        ...resumeData.content[index],
        image: action.payload.imageArr,
      };
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.ADD_SETTING: {
      let tempResumeData = resumeData;
      tempResumeData = {
        ...resumeData,
        [action.payload.type]: action.payload.text,
      };
      return tempResumeData;
    }
    case ActionType.RESUME.LOADING: {
      const tempResumeData = action.payload.data;
      return tempResumeData;
    }
    default:
      return resumeData;
  }
};

export default ResumeReducer;
