import React from "react";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import { UserReducer } from "../../reducers";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import firebase from "../../utilis/firebase";

export interface chatRoom {
  chatRoomID: string;
  userID: string;
  name: string;
}

const ChatButton = ({ profileData }: UserReducer) => {
  const userData = useSelector((state: RootState) => state.UserReducer);
  let navigate = useNavigate();
  const toChatRoom = () => {
    let hasChat = false;
    userData.chatRoom.forEach((data: chatRoom) => {
      if (data.userID === profileData.userID) {
        navigate(`/chatroom/${userData.userID}`);
        hasChat = true;
        return;
      }
    });

    if (!hasChat) {
      const chatRoomID = v4();
      const user = [
        { name: profileData.name, userID: profileData.userID },
        { name: userData.name, userID: userData.userID },
      ];
      const chatRoomData = {
        userData: user,
        chatRoomID: chatRoomID,
        message: [],
      };
      //新增chats collection, user chatroom []
      firebase.uploadDoc("chatrooms", chatRoomID, chatRoomData);
      firebase.initialChat(profileData, userData, chatRoomID);
      navigate(`/chatroom/${userData.userID}`);
    }
  };
  return <div onClick={toChatRoom}>ChatButton</div>;
};

export default ChatButton;
