import { AnyAction } from "redux";
import { ActionType } from ".";

interface isPreviewReducer {
  index: number;
  portfolioListIndex: number;
}

const PortfolioIndex = (
  indexOfWebsite: isPreviewReducer = {
    index: 0,
    portfolioListIndex: 0,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.PORTFOLIOINDEX.SET_INDEX: {
      let tempObj = indexOfWebsite;
      tempObj = { ...tempObj, index: action.payload.index };
      return tempObj;
    }
    case ActionType.PORTFOLIOINDEX.SET_PORTFOLIO_INDEX: {
      let tempObj = indexOfWebsite;
      tempObj = { ...tempObj, portfolioListIndex: action.payload.index };
      return tempObj;
    }
    default:
      return indexOfWebsite;
  }
};

export default PortfolioIndex;
