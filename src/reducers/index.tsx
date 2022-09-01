import ResumeReducer from "./ResumeContent";
import WebsiteReducer from "./WebsiteContent";
import { combineReducers } from "redux";

export const ActionType:{
    RESUME:{
        FILL_CONTENT: string|undefined,
      ADD_IMAGE: string|undefined,
        },
      WEBSITE:{
        FILL_CONTENT: string|undefined,
        ADD_IMAGE: string|undefined,
    },
  } = { 
    RESUME:{
        FILL_CONTENT: "FILL_CONTENT",
        ADD_IMAGE: "ADD_IMAGE",},
    WEBSITE:{
        FILL_CONTENT: "FILL_CONTENT",
        ADD_IMAGE: "ADD_IMAGE",
    }
  };

const allReducers = combineReducers({
    ResumeReducer,
    WebsiteReducer,
}) 

export type RootState = ReturnType<typeof allReducers>
export type ResumeReducer = ReturnType<typeof ResumeReducer>
export type WebsiteReducer = ReturnType<typeof WebsiteReducer>
export default allReducers