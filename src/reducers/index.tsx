import ResumeReducer from "./ResumeContent";
import WebsiteReducer from "./WebsiteContent";
import PortfolioReducer from "./PortfolioContent";
import IsPreviewReducer from "./IsPreviewContent";
import PortfolioIndex from "./PortfolioIndexContent";
import { combineReducers } from "redux";

export const ActionType: {
  RESUME: {
    ADD_COMPONENT: string | undefined;
    DELETE_COMPONENT: string | undefined;
    FILL_CONTENT: string | undefined;
    ADD_IMAGE: string | undefined;
    LOADING: string | undefined;
  };
  WEBSITE: {
    ADD_COMPONENT: string | undefined;
    DELETE_COMPONENT: string | undefined;
    FILL_CONTENT: string | undefined;
    ADD_IMAGE: string | undefined;
    ADD_TIME: string | undefined;
    LOADING: string | undefined;
    ADD_PORTFOLIO_ID: string | undefined;
  };
  PORTFOLIO: {
    ADD_COMPONENT: string | undefined;
    DELETE_COMPONENT: string | undefined;
    INITIAL_SETUP: string | undefined;
    FILL_CONTENT: string | undefined;
    ADD_IMAGE: string | undefined;
    ADD_TIME: string | undefined;
    LOADING: string | undefined;
  };
  ISPREVIEW: {
    RESUME: string | undefined;
    WEBSITE: string | undefined;
    PORTFOLIO: string | undefined;
  };
  PORTFOLIOINDEX: {
    SET_INDEX: string | undefined;
    SET_PORTFOLIO_INDEX: string | undefined;
  };
} = {
  RESUME: {
    ADD_COMPONENT: "RESUME_ADD_COMPONENT",
    DELETE_COMPONENT: "RESUME_DELETE_COMPONENT",
    FILL_CONTENT: "RESUME_FILL_CONTENT",
    ADD_IMAGE: "RESUME_ADD_IMAGE",
    LOADING: "RESUME_LOADING",
  },
  WEBSITE: {
    ADD_COMPONENT: "WEBSITE_ADD_COMPONENT",
    DELETE_COMPONENT: "WEBSITE_DELETE_COMPONENT",
    FILL_CONTENT: "WEBSITE_FILL_CONTENT",
    ADD_IMAGE: "WEBSITE_ADD_IMAGE",
    ADD_TIME: "WEBSITE_ADD_TIME",
    LOADING: "WEBSITE_LOADING",
    ADD_PORTFOLIO_ID: "ADD_PORTFOLIO_ID",
  },
  PORTFOLIO: {
    ADD_COMPONENT: "PORTFOLIO_ADD_COMPONENT",
    DELETE_COMPONENT: "PORTFOLIO_DELETE_COMPONENT",
    INITIAL_SETUP: "PORTFOLIO_INITIAL_SETUP",
    FILL_CONTENT: "PORTFOLIO_FILL_CONTENT",
    ADD_IMAGE: "PORTFOLIO_ADD_IMAGE",
    ADD_TIME: "PORTFOLIO_ADD_TIME",
    LOADING: "PORTFOLIO_LOADING",
  },
  ISPREVIEW: {
    RESUME: "ISPREVIEW_RESUME",
    WEBSITE: "ISPREVIEW_WEBSITE",
    PORTFOLIO: "ISPREVIEW_PORTFOLIO",
  },
  PORTFOLIOINDEX: {
    SET_INDEX: "SET_INDEX",
    SET_PORTFOLIO_INDEX: "SET_PORTFOLIO_INDEX",
  },
};

const allReducers = combineReducers({
  ResumeReducer,
  WebsiteReducer,
  PortfolioReducer,
  PortfolioIndex,
  IsPreviewReducer,
});

export type RootState = ReturnType<typeof allReducers>;
export type ResumeReducer = ReturnType<typeof ResumeReducer>;
export type WebsiteReducer = ReturnType<typeof WebsiteReducer>;
export type PortfolioReducer = ReturnType<typeof PortfolioReducer>;
export default allReducers;
