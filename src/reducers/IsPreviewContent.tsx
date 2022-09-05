import { AnyAction } from "redux";
import { ActionType } from ".";
import { Timestamp } from "firebase/firestore";

interface isPreviewReducer {
  resume: boolean;
  website: boolean;
  portfolio: boolean;
}

const IsPreviewReducer = (
  isPreview: isPreviewReducer = {
    resume: false,
    website: false,
    portfolio: false,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.ISPREVIEW.RESUME: {
      let tempIsPreview = isPreview;
      tempIsPreview = {
        ...tempIsPreview,
        resume: !tempIsPreview.resume,
      };
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.WEBSITE: {
      const tempIsPreview = isPreview;
      tempIsPreview.website = !tempIsPreview.website;
      return tempIsPreview;
    }
    case ActionType.ISPREVIEW.PORTFOLIO: {
      const tempIsPreview = isPreview;
      tempIsPreview.portfolio = !tempIsPreview.portfolio;
      return tempIsPreview;
    }
    default:
      return isPreview;
  }
};

export default IsPreviewReducer;
