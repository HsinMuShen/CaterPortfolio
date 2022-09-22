import React from "react";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { UserReducer } from "../../reducers";
import { useNavigate } from "react-router-dom";
import { setAlert, setChatRoomID, userLoading } from "../../action";

import { v4 } from "uuid";
import firebase from "../../utilis/firebase";
import styled from "styled-components";

export interface chatRoom {
  chatRoomID: string;
  userID: string;
  name: string;
  userImage: string;
}

const EditBtn = styled.div`
  background-color: #ffffff;
  color: #555555;
  border: 2px solid;
  width: 120px;
  height: 30px;
  font-size: 14px;
  margin: 5px 0 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

const ChatButton = ({ profileData }: UserReducer) => {
  const userData = useSelector((state: RootState) => state.UserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toChatRoom = async () => {
    let hasChat = false;
    userData.chatRoom.forEach((data: chatRoom) => {
      if (data.userID === profileData.userID) {
        navigate(`/chatroom/${userData.userID}`);
        dispatch(setChatRoomID(data.chatRoomID, data.name, data.userImage));
        hasChat = true;
        return;
      }
    });

    if (!hasChat) {
      const chatRoomID = v4();
      dispatch(
        setChatRoomID(chatRoomID, profileData.name, profileData.userImage)
      );
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
      dispatch(setAlert({ isAlert: true, text: "成功開啟對話!" }));
      setTimeout(() => {
        dispatch(setAlert({ isAlert: false, text: "" }));
      }, 3000);
      navigate(`/chatroom/${userData.userID}`);

      const newUserData = await firebase.readData("users", userData.userID);
      if (newUserData) {
        dispatch(userLoading(newUserData));
      }
    }
  };

  return <EditBtn onClick={toChatRoom}>開始與{profileData.name}對話</EditBtn>;
};

export default ChatButton;
