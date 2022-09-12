import { AnyAction } from "redux";
import { ActionType } from ".";
import { Timestamp } from "firebase/firestore";

interface isPreviewReducer {
  userIsLogin: boolean;
  profileIntro: boolean;
  resume: boolean;
  website: boolean;
  portfolio: boolean;
  nowChatRoom: { chatRoomID: string; name: string };
}

const IsPreviewReducer = (
  isPreview: isPreviewReducer = {
    userIsLogin: false,
    profileIntro: true,
    resume: true,
    website: true,
    portfolio: true,
    nowChatRoom: { chatRoomID: "", name: "" },
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.ISPREVIEW.ISLOGIN: {
      let tempIsPreview = isPreview;
      tempIsPreview = {
        ...tempIsPreview,
        userIsLogin: action.payload.boolean,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.PROFILE: {
      let tempIsPreview = isPreview;
      tempIsPreview = {
        ...tempIsPreview,
        profileIntro: !tempIsPreview.profileIntro,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.RESUME: {
      let tempIsPreview = isPreview;
      tempIsPreview = {
        ...tempIsPreview,
        resume: !tempIsPreview.resume,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.WEBSITE: {
      let tempIsPreview = isPreview;
      tempIsPreview = {
        ...tempIsPreview,
        website: !tempIsPreview.website,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.PORTFOLIO: {
      let tempIsPreview = isPreview;
      tempIsPreview = {
        ...tempIsPreview,
        portfolio: !tempIsPreview.portfolio,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.TRUE: {
      let tempIsPreview = isPreview;
      tempIsPreview = {
        ...tempIsPreview,
        [action.payload.type]: true,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.SET_CHAT_ROOM: {
      let tempIsPreview = isPreview;
      tempIsPreview = {
        ...tempIsPreview,
        nowChatRoom: {
          chatRoomID: action.payload.chatRoomID,
          name: action.payload.name,
        },
      };
      return tempIsPreview;
    }
    default:
      return isPreview;
  }
};

export default IsPreviewReducer;
