import ResumeReducer from "./ResumeContent";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    ResumeReducer,
}) 

export type RootState = ReturnType<typeof allReducers>
export type ResumeReducer = ReturnType<typeof ResumeReducer>
export default allReducers