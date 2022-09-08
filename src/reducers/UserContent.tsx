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
    followPortfolios: [
      {
        name: "Michael",
        portfolioID: "6d267146-cf42-43b9-ba08-949fc23227ba",
        userID: "Xvbmt52vwx9RzFaXE17L",
        mainImage:
          "https://firebasestorage.googleapis.com/v0/b/caterprotfolio.appspot.com/o/images%2F1662613112827%E5%9C%96%E7%89%871.png?alt=media&token=f7259d6c-b032-4416-8586-df9ce6d28279",
        title: "123",
      },
    ],
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
