import { AnyAction } from "redux";
import firebase from "../utilis/firebase";
import { ActionType } from ".";

const ResumeReducer = (
  resumeData = {
    title: "Michael",
    content: [
      { image: [""], text: "" },
      { image: [""], text: "" },
      { image: [""], text: "" },
    ],
    name: "Michael",
    followers: [],
    tags: ["design"],
    time: null,
    userID: "Xvbmt52vwx9RzFaXE17L",
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.RESUME.ADD_COMPONENT: {
      const tempContentArr = resumeData.content;
      tempContentArr.push({ image: [""], text: "" });
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.DELETE_COMPONENT: {
      const tempContentArr = resumeData.content;
      const index = action.payload.index;
      tempContentArr.splice(index, 1);
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.FILL_CONTENT: {
      const tempContentArr = resumeData.content;
      const index = action.payload.index;
      tempContentArr[index] = {
        ...resumeData.content[index],
        text: action.payload.html,
      };
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    case ActionType.RESUME.ADD_IMAGE: {
      const tempContentArr = resumeData.content;
      const index = action.payload.index;
      tempContentArr[index] = {
        ...resumeData.content[index],
        image: action.payload.imageArr,
      };
      const newResumeData = { ...resumeData, content: tempContentArr };
      return newResumeData;
    }
    default:
      return resumeData;
  }
};

export default ResumeReducer;
