import { AnyAction } from "redux";
import { v4 } from "uuid";
import { ActionType } from ".";

export interface portfolioReducer {
  title: string;
  mainImage: string;
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
  userID: string;
  userImage: string;
  portfolioID: string;
}

export const initialPortfolioData = {
  title: "Title",
  mainImage: "",
  content: [],
  name: "",
  followers: [],
  tags: [],
  time: null,
  userID: "",
  userImage: "",
  portfolioID: "",
};

const PortfolioReducer = (
  portfolioData: portfolioReducer = initialPortfolioData,
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.PORTFOLIO.INITIAL_SETUP: {
      let tempData = { ...portfolioData };
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
      const tempContentArr = [...portfolioData.content];
      const tempContent = { ...action.payload.content };
      tempContent.id = v4();
      tempContentArr.push(tempContent);
      const newPortfolioData = { ...portfolioData, content: tempContentArr };
      return newPortfolioData;
    }
    case ActionType.PORTFOLIO.DELETE_COMPONENT: {
      const tempContentArr = [...portfolioData.content];
      const index = action.payload.index;
      tempContentArr.splice(index, 1);
      const newPortfolioData = { ...portfolioData, content: tempContentArr };
      return newPortfolioData;
    }
    case ActionType.PORTFOLIO.FILL_CONTENT: {
      const index = action.payload.index;
      const listIndex = action.payload.listIndex;
      const type = action.payload.type;
      const tempContentArr = [...portfolioData.content];
      if (type === "text") {
        const tempTypeArr = [...portfolioData.content[index].text];
        tempTypeArr[listIndex] = action.payload.string;
        tempContentArr[index] = {
          ...portfolioData.content[index],
          text: tempTypeArr,
        };
        const newPortfolioData = { ...portfolioData, content: tempContentArr };

        return newPortfolioData;
      } else if (type === "image") {
        const tempTypeArr = [...portfolioData.content[index].image];
        tempTypeArr[listIndex] = action.payload.string;
        tempContentArr[index] = {
          ...portfolioData.content[index],
          image: tempTypeArr,
        };
        const newPortfolioData = { ...portfolioData, content: tempContentArr };
        return newPortfolioData;
      }
    }
    case ActionType.PORTFOLIO.ADD_IMAGE: {
      const tempContentArr = [...portfolioData.content];
      const index = action.payload.index;
      tempContentArr[index] = {
        ...portfolioData.content[index],
        image: action.payload.imageArr,
      };
      const newPortfolioData = { ...portfolioData, content: tempContentArr };
      return newPortfolioData;
    }
    case ActionType.PORTFOLIO.ADD_TIME: {
      const tempObj = { ...portfolioData, time: Date.now() };
      return tempObj;
    }
    case ActionType.PORTFOLIO.ADD_SETTING: {
      let tempPortfolioeData = portfolioData;
      tempPortfolioeData = {
        ...portfolioData,
        [action.payload.type]: action.payload.text,
      };
      return tempPortfolioeData;
    }
    case ActionType.PORTFOLIO.RENEW_CONTENT: {
      const tempPortfolioeData = {
        ...portfolioData,
        content: action.payload.content,
      };
      return tempPortfolioeData;
    }
    case ActionType.PORTFOLIO.LOADING: {
      const tempPortfolioeData = action.payload.data;
      return tempPortfolioeData;
    }
    default:
      return portfolioData;
  }
};

export default PortfolioReducer;
