import { AnyAction } from "redux";
import { ActionType } from ".";
import { v4 } from "uuid";

export interface websiteReducer {
  title: string;
  coverImage: string;
  content: {
    image: string[];
    text: string[];
    comName: string;
    id: string;
    portfolioID?: string[];
  }[];
  name: string;
  followers: string[];
  userID: string;
  userImage: string;
}

export const initialWebsiteData = {
  title: "",
  coverImage: "",
  content: [],
  name: "",
  followers: [],
  userID: "",
  userImage: "",
};

const WebsiteReducer = (
  websiteData: websiteReducer = initialWebsiteData,
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.WEBSITE.ADD_COMPONENT: {
      const tempContentArr = websiteData.content;
      const tempContent = { ...action.payload.content };
      tempContent.id = v4();
      tempContentArr.push(tempContent);
      const newResumeData = { ...websiteData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.WEBSITE.DELETE_COMPONENT: {
      const tempContentArr = [...websiteData.content];
      const index = action.payload.index;
      tempContentArr.splice(index, 1);
      const newResumeData = { ...websiteData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.WEBSITE.CHANGE_TEXT: {
      const tempContentArr = [...websiteData.content];
      const index = action.payload.index;
      tempContentArr[index] = {
        ...websiteData.content[index],
        text: action.payload.textArr,
      };
      const newWebsiteData = { ...websiteData, content: tempContentArr };
      return newWebsiteData;
    }
    case ActionType.WEBSITE.FILL_CONTENT: {
      const index = action.payload.index;
      const listIndex = action.payload.listIndex;
      const type = action.payload.type;
      const tempContentArr = [...websiteData.content];
      if (type === "text") {
        const tempTypeArr = [...websiteData.content[index].text];
        tempTypeArr[listIndex] = action.payload.string;
        tempContentArr[index] = {
          ...websiteData.content[index],
          text: tempTypeArr,
        };
        const newPortfolioData = { ...websiteData, content: tempContentArr };

        return newPortfolioData;
      } else if (type === "image") {
        const tempTypeArr = [...websiteData.content[index].image];
        tempTypeArr[listIndex] = action.payload.string;
        tempContentArr[index] = {
          ...websiteData.content[index],
          image: tempTypeArr,
        };
        const newWebsiteData = { ...websiteData, content: tempContentArr };
        return newWebsiteData;
      }
    }
    case ActionType.WEBSITE.ADD_IMAGE: {
      const index = action.payload.index;
      const tempContentArr = [...websiteData.content];

      tempContentArr[index] = {
        ...websiteData.content[index],
        image: action.payload.imageArr,
      };
      const newWebsiteData = { ...websiteData, content: tempContentArr };
      return newWebsiteData;
    }
    case ActionType.WEBSITE.ADD_PORTFOLIO_ID: {
      const tempContentArr = [...websiteData.content];
      const index = action.payload.index;
      tempContentArr[index] = {
        ...websiteData.content[index],
        portfolioID: action.payload.textArr,
      };
      const newWebsiteData = { ...websiteData, content: tempContentArr };
      return newWebsiteData;
    }
    case ActionType.WEBSITE.ADD_TIME: {
      const tempObj = { ...websiteData, time: Date.now() };
      return tempObj;
    }
    case ActionType.WEBSITE.ADD_SETTING: {
      let tempResumeData = { ...websiteData };
      tempResumeData = {
        ...websiteData,
        [action.payload.type]: action.payload.text,
      };
      return tempResumeData;
    }
    case ActionType.WEBSITE.RENEW_CONTENT: {
      const tempResumeData = {
        ...websiteData,
        content: action.payload.content,
      };
      return tempResumeData;
    }
    case ActionType.WEBSITE.LOADING: {
      const tempWebsiteData = { ...action.payload.data };
      return tempWebsiteData;
    }
    default:
      return websiteData;
  }
};

export default WebsiteReducer;
