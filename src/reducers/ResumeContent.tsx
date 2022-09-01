import { AnyAction } from "redux";
import firebase from "../utilis/firebase";

export const ActionType:{
  FILL_CONTENT: string|undefined,
  ADD_IMAGE: string|undefined,
  UPLOAD_RESUME: string|undefined,
} = { 
  FILL_CONTENT: "FILL_CONTENT",
  ADD_IMAGE: "ADD_IMAGE",
  UPLOAD_RESUME: "UPLOAD_RESUME",
};

const ResumeReducer = (
  resumeData = {
    title: "Michael",
    content: [{image:[''],text:''}],
    name: "Michael",
    followers: [],
    tags: ["design"],
    time: null,
    userID: "Xvbmt52vwx9RzFaXE17L",
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.FILL_CONTENT: {
      const tempContentArr =  resumeData.content;
      const index = action.payload.index;
      tempContentArr[index] = {...resumeData.content[index],text:action.payload.html};
      const newResumeData =  {...resumeData, content: tempContentArr};
      return newResumeData;
    }
    // case ActionType.ADD_IMAGE: {
    //   const tempContentArr =  resumeData.content;
    //   const index = action.payload.index;
    //   tempContentArr[index] = {...resumeData.content[index],image:[action.payload.url]};
    //   const newResumeData =  {...resumeData, content: tempContentArr};
    //   return newResumeData;
    // }
    default:
      return resumeData;
  }
};

export default ResumeReducer;
