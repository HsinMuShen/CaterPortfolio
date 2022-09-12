import React from "react";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { UserReducer } from "../../reducers";
import { useNavigate } from "react-router-dom";
import { setChatRoomID, userLoading } from "../../action";

import { v4 } from "uuid";
import firebase from "../../utilis/firebase";

export interface chatRoom {
  chatRoomID: string;
  userID: string;
  name: string;
}

const ChatButton = ({ profileData }: UserReducer) => {
  const userData = useSelector((state: RootState) => state.UserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toChatRoom = async () => {
    let hasChat = false;
    userData.chatRoom.forEach((data: chatRoom) => {
      if (data.userID === profileData.userID) {
        navigate(`/chatroom/${userData.userID}`);
        dispatch(setChatRoomID(data.chatRoomID, data.name));
        hasChat = true;
        return;
      }
    });

    if (!hasChat) {
      const chatRoomID = v4();
      dispatch(setChatRoomID(chatRoomID, profileData.name));
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
      await firebase.uploadDoc("chatrooms", chatRoomID, chatRoomData);
      await firebase.initialChat(profileData, userData, chatRoomID);
      navigate(`/chatroom/${userData.userID}`);

      const newUserData = await firebase.readData("users", userData.userID);
      if (newUserData) {
        dispatch(userLoading(newUserData));
      }
    }
  };
  return <div onClick={toChatRoom}>ChatButton</div>;
};

export default ChatButton;