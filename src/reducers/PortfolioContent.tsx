import { AnyAction } from "redux";
import { ActionType } from ".";

export interface portfolioReducer {
  title: string;
  mainImage: string;
  content: {
    image: string[];
    text: string[];
    type: number;
  }[];
  name: string;
  followers: string[];
  tags: string[];
  time: null | number;
  userID: string;
  portfolioID: string;
}

const PortfolioReducer = (
  portfolioData: portfolioReducer = {
    title: "Title",
    mainImage: "",
    content: [],
    name: "Michael",
    followers: [],
    tags: ["design"],
    time: null,
    userID: "Xvbmt52vwx9RzFaXE17L",
    portfolioID: "",
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.PORTFOLIO.INITIAL_SETUP: {
      let tempData = portfolioData;
      if (action.payload.type === "title") {
        tempData = { ...tempData, title: action.payload.text };
      } else if (action.payload.type === "mainImage") {
        tempData = { ...tempData, mainImage: action.payload.text };
      } else if (action.payload.type === "portfolioID") {
        tempData = { ...tempData, portfolioID: action.payload.text };
      }
      return tempData;
    }
    case ActionType.PORTFOLIO.ADD_COMPONENT: {
      const tempContentArr = portfolioData.content;
      tempContentArr.push(action.payload.content);
      const newResumeData = { ...portfolioData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.PORTFOLIO.DELETE_COMPONENT: {
      const tempContentArr = portfolioData.content;
      const index = action.payload.index;
      tempContentArr.splice(index, 1);
      const newResumeData = { ...portfolioData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.PORTFOLIO.FILL_CONTENT: {
      const tempContentArr = portfolioData.content;
      const index = action.payload.index;
      tempContentArr[index] = {
        ...portfolioData.content[index],
        text: action.payload.textArr,
      };
      const newWebsiteData = { ...portfolioData, content: tempContentArr };
      return newWebsiteData;
    }
    case ActionType.PORTFOLIO.ADD_IMAGE: {
      const tempContentArr = portfolioData.content;
      const index = action.payload.index;
      tempContentArr[index] = {
        ...portfolioData.content[index],
        image: action.payload.imageArr,
      };
      const newWebsiteData = { ...portfolioData, content: tempContentArr };
      return newWebsiteData;
    }
    case ActionType.PORTFOLIO.ADD_TIME: {
      const tempObj = { ...portfolioData, time: Date.now() };
      return tempObj;
    }
    case ActionType.PORTFOLIO.LOADING: {
      const tempWebsiteData = action.payload.data;
      return tempWebsiteData;
    }
    default:
      return portfolioData;
  }
};

export default PortfolioReducer;
