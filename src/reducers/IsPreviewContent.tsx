import { AnyAction } from "redux";
import { ActionType } from ".";

export interface isPreviewReducer {
  userIsLogin: boolean;
  profileIntro: boolean;
  resume: boolean;
  website: boolean;
  portfolio: boolean;
  nowChatRoom: { chatRoomID: string; name: string; userImage: string };
  portfolioListPopup: boolean;
  portfolioSinglePopup: boolean;
  alert: {
    isAlert: boolean;
    text: string;
  };
  homepageList: number[];
}

const IsPreviewReducer = (
  isPreview: isPreviewReducer = {
    userIsLogin: false,
    profileIntro: true,
    resume: true,
    website: true,
    portfolio: true,
    nowChatRoom: { chatRoomID: "", name: "", userImage: "" },
    portfolioListPopup: false,
    portfolioSinglePopup: false,
    alert: {
      isAlert: false,
      text: "",
    },
    homepageList: [],
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.ISPREVIEW.ISLOGIN: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        userIsLogin: action.payload.boolean,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.PROFILE: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        profileIntro: !tempIsPreview.profileIntro,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.RESUME: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        resume: !tempIsPreview.resume,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.WEBSITE: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        website: !tempIsPreview.website,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.PORTFOLIO: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        portfolio: !tempIsPreview.portfolio,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.TRUE: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        [action.payload.type]: true,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.FALSE: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        [action.payload.type]: false,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.SET_CHAT_ROOM: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        nowChatRoom: {
          chatRoomID: action.payload.chatRoomID,
          name: action.payload.name,
          userImage: action.payload.userImage,
        },
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.SET_ALERT: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        alert: action.payload.alertData,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.SET_HOMEPAGE_LIST: {
      let tempIsPreview = { ...isPreview };
      tempIsPreview = {
        ...tempIsPreview,
        homepageList: action.payload.arr,
      };
      return tempIsPreview;
    }
    default:
      return isPreview;
  }
};

export default IsPreviewReducer;
