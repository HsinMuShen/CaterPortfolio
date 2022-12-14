import React from "react";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { UserReducer } from "../../reducers";
import { useNavigate } from "react-router-dom";
import { userLoading } from "../../action/UserReducerAction";
import { setAlert, setChatRoomID } from "../../action/IsPreviewReducerAction";

import { v4 } from "uuid";
import firebase from "../../utilis/firebase";
import styled from "styled-components";
import useAlertCalling from "../../components/useAlertCalling";

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
  width: 180px;
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
  const isLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const { startAlert } = useAlertCalling();
  const toChatRoom = async () => {
    if (!isLogin) {
      startAlert("請先登入再開啟對話!");
      navigate(`/login`);
      return;
    }

    const result = userData.chatRoom.find(
      (data: chatRoom) => data.userID === profileData.userID
    );
    if (result) {
      console.log(result);
      navigate(`/chatroom/${userData.userID}`);
      dispatch(setChatRoomID(result.chatRoomID, result.name, result.userImage));
    } else {
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
      await firebase.uploadDoc("chatrooms", chatRoomID, chatRoomData);
      await firebase.initialChat(profileData, userData, chatRoomID);
      startAlert("成功開啟對話!");
      navigate(`/chatroom/${userData.userID}`);

      const newUserData = await firebase.readData("users", userData.userID);
      if (newUserData) {
        dispatch(userLoading(newUserData));
      }
    }
  };

  return (
    <EditBtn onClick={toChatRoom} id="chatroomButton">
      開始與{profileData.name}對話
    </EditBtn>
  );
};

export default ChatButton;
