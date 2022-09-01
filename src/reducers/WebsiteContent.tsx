import { AnyAction } from "redux";
import { ActionType } from ".";

const WebsiteReducer = (
  websiteData = {
    title: "Michael",
    content: [{image:'',text:''}],
    name: "Michael",
    followers: [],
    tags: ["design"],
    time: null,
    userID: "Xvbmt52vwx9RzFaXE17L",
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.WEBSITE.FILL_CONTENT: {
      const tempContentArr =  websiteData.content;
      const index = action.payload.index;
      tempContentArr[index] = {...websiteData.content[index],text:action.payload.html};
      const newResumeData =  {...websiteData, content: tempContentArr};
      return newResumeData;
    }
    case ActionType.WEBSITE.ADD_IMAGE: {
      const tempContentArr =  websiteData.content;
      const index = action.payload.index;
      tempContentArr[index] = {...websiteData.content[index],image:action.payload.JSONstring};
      const newResumeData =  {...websiteData, content: tempContentArr};
      return newResumeData;
    }
    default:
      return websiteData;
  }
};

export default WebsiteReducer;