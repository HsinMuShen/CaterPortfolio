import { AnyAction } from "redux";
import { ActionType } from ".";
import { Timestamp } from "firebase/firestore";

interface isPreviewReducer {
  userIsLogin: boolean;
  resume: boolean;
  website: boolean;
  portfolio: boolean;
}

const IsPreviewReducer = (
  isPreview: isPreviewReducer = {
    userIsLogin: false,
    resume: true,
    website: true,
    portfolio: true,
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
    default:
      return isPreview;
  }
};

export default IsPreviewReducer;
