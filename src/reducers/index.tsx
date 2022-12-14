import { combineReducers } from "redux";

import UserReducer from "./UserContent";
import ResumeReducer from "./ResumeContent";
import WebsiteReducer from "./WebsiteContent";
import PortfolioReducer from "./PortfolioContent";
import IsPreviewReducer from "./IsPreviewContent";
import PortfolioIndex from "./PortfolioIndexContent";

import { resumeReducer } from "./ResumeContent";

export const ActionType: {
  USER: {
    INPUT_EMAIL_PASSWORD: string;
    LOADING: string;
    ADD_FOLLOWING: string;
  };
  RESUME: {
    ADD_COMPONENT: string;
    ADD_TEMPLATE: string;
    DELETE_COMPONENT: string;
    FILL_CONTENT: string;
    ADD_IMAGE: string;
    ADD_SETTING: string;
    RENEW_CONTENT: string;
    LOADING: string;
  };
  WEBSITE: {
    ADD_COMPONENT: string;
    DELETE_COMPONENT: string;
    CHANGE_TEXT: string;
    FILL_CONTENT: string;
    ADD_IMAGE: string;
    ADD_TIME: string;
    ADD_SETTING: string;
    RENEW_CONTENT: string;
    LOADING: string;
    ADD_PORTFOLIO_ID: string;
  };
  PORTFOLIO: {
    ADD_COMPONENT: string;
    DELETE_COMPONENT: string;
    INITIAL_SETUP: string;
    FILL_CONTENT: string;
    ADD_IMAGE: string;
    ADD_TIME: string;
    ADD_SETTING: string;
    RENEW_CONTENT: string;
    LOADING: string;
  };
  ISPREVIEW: {
    ISLOGIN: string;
    PROFILE: string;
    RESUME: string;
    WEBSITE: string;
    PORTFOLIO: string;
    TRUE: string;
    FALSE: string;
    SET_CHAT_ROOM: string;
    SET_ALERT: string;
    SET_HOMEPAGE_LIST: string;
  };
  PORTFOLIOINDEX: {
    SET_INDEX: string;
    SET_PORTFOLIO_INDEX: string;
  };
} = {
  USER: {
    INPUT_EMAIL_PASSWORD: "INPUT_EMAIL_PASSWORD",
    LOADING: "USER_LOADING",
    ADD_FOLLOWING: "ADD_FOLLOWING",
  },
  RESUME: {
    ADD_COMPONENT: "RESUME_ADD_COMPONENT",
    ADD_TEMPLATE: "RESUME_ADD_TEMPLATE",
    DELETE_COMPONENT: "RESUME_DELETE_COMPONENT",
    FILL_CONTENT: "RESUME_FILL_CONTENT",
    ADD_IMAGE: "RESUME_ADD_IMAGE",
    ADD_SETTING: "RESUME_ADD_SETTING",
    RENEW_CONTENT: "RESUME_RENEW_CONTENT",
    LOADING: "RESUME_LOADING",
  },
  WEBSITE: {
    ADD_COMPONENT: "WEBSITE_ADD_COMPONENT",
    DELETE_COMPONENT: "WEBSITE_DELETE_COMPONENT",
    CHANGE_TEXT: "WEBSITE_CHANGE_TEXT",
    FILL_CONTENT: "WEBSITE_FILL_CONTENT",
    ADD_IMAGE: "WEBSITE_ADD_IMAGE",
    ADD_TIME: "WEBSITE_ADD_TIME",
    ADD_SETTING: "WEBSITE_ADD_SETTING",
    RENEW_CONTENT: "WEBSITE_RENEW_CONTENT",
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
    ADD_SETTING: "PORTFOLIO_ADD_SETTING",
    RENEW_CONTENT: "PORTFOLIO_RENEW_CONTENT",
    LOADING: "PORTFOLIO_LOADING",
  },
  ISPREVIEW: {
    ISLOGIN: "ISPREVIEW_ISLOGIN",
    PROFILE: "ISPREVIEW_PROFILE",
    RESUME: "ISPREVIEW_RESUME",
    WEBSITE: "ISPREVIEW_WEBSITE",
    PORTFOLIO: "ISPREVIEW_PORTFOLIO",
    TRUE: "ISPREVIEW_TRUE",
    FALSE: "ISPREVIEW_FALSE",
    SET_CHAT_ROOM: "ISPREVIEW_SET_CHAT_ROOM",
    SET_ALERT: "ISPREVIEW_SET_ALERT",
    SET_HOMEPAGE_LIST: "ISPREVIEW_SET_HOMEPAGE_LIST",
  },
  PORTFOLIOINDEX: {
    SET_INDEX: "SET_INDEX",
    SET_PORTFOLIO_INDEX: "SET_PORTFOLIO_INDEX",
  },
};

const allReducers = combineReducers({
  UserReducer,
  ResumeReducer,
  WebsiteReducer,
  PortfolioReducer,
  PortfolioIndex,
  IsPreviewReducer,
});

export type RootState = ReturnType<typeof allReducers>;
export type UserReducer = ReturnType<typeof UserReducer>;
export type ResumeReducer = resumeReducer;
export type WebsiteReducer = ReturnType<typeof WebsiteReducer>;
export type PortfolioReducer = ReturnType<typeof PortfolioReducer>;
export default allReducers;
