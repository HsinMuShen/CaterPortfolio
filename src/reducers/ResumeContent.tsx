import { AnyAction } from "redux";
import { ActionType } from ".";
import { Timestamp } from "firebase/firestore";
import { v4 } from "uuid";
import initialUserImage from "../images/user.png";

export interface resumeReducer {
  title: string;
  coverImage: string;
  content: {
    image: string[];
    text: string[];
    type: number;
    comName: string;
    id: string;
  }[];
  name: string;
  followers: {
    name: string;
    userID: string;
    userImage: string;
  }[];
  tags: string[];
  time: null | Timestamp;
  userID: string;
  userImage: string;
  isPublic: boolean;
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
    userImage: initialUserImage,
    isPublic: false,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.RESUME.ADD_COMPONENT: {
      const tempContentArr = [...resumeData.content];
      const tempContent = { ...action.payload.content };
      tempContent.id = v4();
      tempContentArr.push(tempContent);
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.ADD_TEMPLATE: {
      const tempContentArr = [...resumeData.content];
      const templateArr = [...action.payload.templateArr];
      tempContentArr.push(...templateArr);
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.DELETE_COMPONENT: {
      const tempContentArr = [...resumeData.content];
      const index = action.payload.index;
      tempContentArr.splice(index, 1);
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.FILL_TEXT: {
      const index = action.payload.index;
      const listIndex = action.payload.listIndex;
      const tempContentArr = [...resumeData.content];
      const tempTextArr = [...resumeData.content[index].text];
      tempTextArr[listIndex] = action.payload.text;
      tempContentArr[index] = {
        ...resumeData.content[index],
        text: tempTextArr,
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
    case ActionType.RESUME.RENEW_CONTENT: {
      const tempResumeData = { ...resumeData, content: action.payload.content };
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
