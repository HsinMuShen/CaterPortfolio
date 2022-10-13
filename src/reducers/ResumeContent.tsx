import { AnyAction } from "redux";
import { ActionType } from ".";
import { v4 } from "uuid";
import initialUserImage from "../images/user.png";

export interface resumeReducer {
  title: string;
  coverImage: string;
  content: {
    image: string[];
    text: string[];
    comName: string;
    id: string;
  }[];
  name: string;
  followers: {
    name: string;
    userID: string;
    userImage: string;
  }[];
  userID: string;
  userImage: string;
  isPublic: boolean;
}

export const initialResumeData = {
  title: "",
  coverImage: "",
  content: [],
  name: "",
  followers: [],
  userID: "",
  userImage: initialUserImage,
  isPublic: false,
};

const ResumeReducer = (
  resumeData: resumeReducer = initialResumeData,
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
    case ActionType.RESUME.FILL_CONTENT: {
      const index = action.payload.index;
      const listIndex = action.payload.listIndex;
      const type = action.payload.type;
      const tempContentArr = [...resumeData.content];
      if (type === "text") {
        const tempTypeArr = [...resumeData.content[index].text];
        tempTypeArr[listIndex] = action.payload.string;
        tempContentArr[index] = {
          ...resumeData.content[index],
          text: tempTypeArr,
        };
        const newPortfolioData = { ...resumeData, content: tempContentArr };

        return newPortfolioData;
      } else if (type === "image") {
        const tempTypeArr = [...resumeData.content[index].image];
        tempTypeArr[listIndex] = action.payload.string;
        tempContentArr[index] = {
          ...resumeData.content[index],
          image: tempTypeArr,
        };
        const newResumeData = { ...resumeData, content: tempContentArr };
        return newResumeData;
      }
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
