import { AnyAction } from "redux";
import { ActionType } from ".";
import initialUserImage from "../images/user.png";
import initialBackgroundImg from "../images/initialBackgroundImg.jpg";

export interface userReducer {
  name: string;
  email: string;
  password: string;
  userID: string;
  userImage: string;
  backgroundImage: string;
  introduction: string;
  chatRoom: { chatRoomID: string; userID: string; name: string }[];
  followers: {
    userID: string;
    userImage: string;
    name: string;
  }[];
  interestingTags: string[];
  tags: string[];
  followMembers: {
    userID: string;
    userImage: string;
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
    email: "michael@gmail.com",
    password: "asdfgh",
    userID: "",
    userImage: initialUserImage,
    backgroundImage: initialBackgroundImg,
    introduction: "",
    chatRoom: [],
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
      let tempResumeData = { ...userData };
      tempResumeData = {
        ...userData,
        [action.payload.type]: action.payload.data,
      };
      return tempResumeData;
    }
    case ActionType.USER.ADD_FOLLOWING: {
      const tempResumeData = action.payload.data;
      return tempResumeData;
    }
    default:
      return userData;
  }
};

export default UserReducer;
