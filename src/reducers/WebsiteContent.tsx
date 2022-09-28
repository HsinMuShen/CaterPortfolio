import { AnyAction } from "redux";
import { ActionType } from ".";
import { v4 } from "uuid";

interface websiteReducer {
  title: string;
  coverImage: string;
  content: {
    image: string[];
    text: string[];
    type: number;
    comName: string;
    id: string;
    portfolioID?: string[];
  }[];
  name: string;
  followers: string[];
  tags: string[];
  time: null | number;
  userID: string;
}

const WebsiteReducer = (
  websiteData: websiteReducer = {
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
      const tempContentArr = [...websiteData.content];

      const tempTextArr = [...websiteData.content[index].text];
      tempTextArr[listIndex] = action.payload.text;

      tempContentArr[index] = {
        ...websiteData.content[index],
        text: tempTextArr,
      };
      const newWebsiteData = { ...websiteData, content: tempContentArr };
      return newWebsiteData;
    }
    case ActionType.WEBSITE.ADD_IMAGE: {
      const tempContentArr = [...websiteData.content];
      const index = action.payload.index;
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
