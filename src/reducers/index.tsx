import ResumeReducer from "./ResumeContent";
import WebsiteReducer from "./WebsiteContent";
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
    FILL_CONTENT: string | undefined;
    ADD_IMAGE: string | undefined;
    ADD_TIME: string | undefined;
  };
} = {
  RESUME: {
    ADD_COMPONENT: "ADD_COMPONENT",
    DELETE_COMPONENT: "DELETE_COMPONENT",
    FILL_CONTENT: "FILL_CONTENT",
    ADD_IMAGE: "ADD_IMAGE",
    LOADING: "LOADING",
  },
  WEBSITE: {
    FILL_CONTENT: "FILL_CONTENT",
    ADD_IMAGE: "ADD_IMAGE",
    ADD_TIME: "ADD_TIME",
  },
};

const allReducers = combineReducers({
  ResumeReducer,
  WebsiteReducer,
});

export type RootState = ReturnType<typeof allReducers>;
export type ResumeReducer = ReturnType<typeof ResumeReducer>;
export type WebsiteReducer = ReturnType<typeof WebsiteReducer>;
export default allReducers;
