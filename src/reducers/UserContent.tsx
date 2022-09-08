import { AnyAction } from "redux";
import { ActionType } from ".";

interface userReducer {
  name: string;
  email: string;
  userID: string;
  followers: {
    userID: string;
    name: string;
  }[];
  interestingTags: string[];
  tags: string[];
  followMembers: {
    userID: string;
    name: string;
  }[];
  followPortfolios: {
    portfolioID: string;
    userID: string;
    name: string;
    mainImage: string;
    title: string;
  }[];
  followWebsites: {
    portfolioID: string;
    userID: string;
    name: string;
  }[];
}

const UserReducer = (
  userData: userReducer = {
    name: "Michael",
    email: "electrycity84@gmail.com",
    userID: "Xvbmt52vwx9RzFaXE17L",
    followers: [],
    interestingTags: [],
    tags: ["design"],
    followMembers: [],
    followPortfolios: [],
    followWebsites: [],
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.USER.LOADING: {
      const tempResumeData = action.payload.data;
      return tempResumeData;
    }
    case ActionType.USER.ADD_FOLLOWING: {
      let tempData = { ...userData };
      const tempResumeData = action.payload.data;
      return tempResumeData;
    }
    default:
      return userData;
  }
};

export default UserReducer;
