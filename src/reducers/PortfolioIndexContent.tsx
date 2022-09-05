import { AnyAction } from "redux";
import { ActionType } from ".";

interface isPreviewReducer {
  index: number;
}

const PortfolioIndex = (
  indexOfWebsite: isPreviewReducer = {
    index: 0,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.PORTFOLIOINDEX.SET_INDEX: {
      let tempObj = indexOfWebsite;
      tempObj = { ...tempObj, index: action.payload.index };
      return tempObj;
    }
    default:
      return indexOfWebsite;
  }
};

export default PortfolioIndex;
