import { Timestamp } from "firebase/firestore";
import { AnyAction } from "redux";
import { ActionType } from ".";

interface chatroomReducer {
  time: Timestamp | null;
  message: string;
  chatRoomID: string;
  sendUserID: string;
  getUserID: string;
}

const ChatRoomReducer = (
  messageData: chatroomReducer = {
    time: null,
    message: "",
    chatRoomID: "",
    sendUserID: "",
    getUserID: "",
  },
  action: AnyAction
) => {
  switch (action.type) {
    case ActionType.WEBSITE.LOADING: {
      const tempMessageData = action.payload.data;
      return tempMessageData;
    }
    default:
      return messageData;
  }
};

export default ChatRoomReducer;
