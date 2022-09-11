import { AnyAction } from "redux";
import { ActionType } from ".";

export interface userReducer {
  name: string;
  email: string;
  password: string;
  userID: string;
  userImage: string;
  backgroundImage: string;
  introduction: string;
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
  followResumes: {
    portfolioID: string;
    userID: string;
    name: string;
    coverImage: string;
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
    name: "",
    email: "",
    password: "",
    userID: "",
    userImage: "",
    backgroundImage: "",
    introduction: "",
    followers: [],
    interestingTags: [],
    tags: [],
    followMembers: [],
    followResumes: [],
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
    case ActionType.USER.INPUT_EMAIL_PASSWORD: {
      let tempResumeData = userData;
      tempResumeData = {
        ...userData,
        [action.payload.type]: action.payload.data,
      };
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
