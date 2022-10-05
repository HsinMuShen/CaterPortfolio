import { ActionType } from "../reducers";

export const setPortfolioIndex = (index: number) => {
  return {
    type: ActionType.PORTFOLIOINDEX.SET_INDEX,
    payload: { index },
  };
};

export const setPortfolioListIndex = (index: number) => {
  return {
    type: ActionType.PORTFOLIOINDEX.SET_PORTFOLIO_INDEX,
    payload: { index },
  };
};
