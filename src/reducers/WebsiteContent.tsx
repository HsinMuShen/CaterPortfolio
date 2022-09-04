import { Timestamp } from "firebase/firestore";
import { AnyAction } from "redux";
import { ActionType } from ".";

interface websiteReducer {
  title: string;
  content: { image: string[]; text: string; type: number }[];
  name: string;
  followers: string[];
  tags: string[];
  time: null | number;
  userID: string;
}

const WebsiteReducer = (
  websiteData: websiteReducer = {
    title: "Michael",
    content: [],
    name: "Michael",
    followers: [],
    tags: ["design"],
    time: null,
    userID: "Xvbmt52vwx9RzFaXE17L",
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.WEBSITE.ADD_COMPONENT: {
      const tempContentArr = websiteData.content;
      tempContentArr.push(action.payload.content);
      const newResumeData = { ...websiteData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.DELETE_COMPONENT: {
      const tempContentArr = websiteData.content;
      const index = action.payload.index;
      tempContentArr.splice(index, 1);
      const newResumeData = { ...websiteData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.WEBSITE.FILL_CONTENT: {
      const tempContentArr = websiteData.content;
      const index = action.payload.index;
      tempContentArr[index] = {
        ...websiteData.content[index],
        text: action.payload.html,
      };
      const newWebsiteData = { ...websiteData, content: tempContentArr };
      return newWebsiteData;
    }
    case ActionType.WEBSITE.ADD_IMAGE: {
      const tempContentArr = websiteData.content;
      const index = action.payload.index;
      tempContentArr[index] = {
        ...websiteData.content[index],
        image: action.payload.imageArr,
      };
      const newWebsiteData = { ...websiteData, content: tempContentArr };
      return newWebsiteData;
    }
    case ActionType.WEBSITE.ADD_TIME: {
      const tempObj = { ...websiteData, time: Date.now() };
      return tempObj;
    }
    case ActionType.RESUME.LOADING: {
      const tempWebsiteData = action.payload.data;
      return tempWebsiteData;
    }
    default:
      return websiteData;
  }
};

export default WebsiteReducer;
