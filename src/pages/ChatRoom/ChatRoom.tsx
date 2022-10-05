import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import { chatRoom } from "../Profile/ChatButton";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import Chats from "./Chats";
import { setChatRoomID } from "../../action/IsPreviewReducerAction";

const Wrapper = styled.div``;
const ChatRoomArea = styled.div`
  display: flex;
  width: 800px;
  margin: 100px auto;
  border: 2px solid;
  border-radius: 15px;
  overflow: hidden;
  background-color: #ffffff;
  @media screen and (max-width: 900px) {
    width: 80vw;
  }
`;
const UserList = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  @media screen and (max-width: 900px) {
    width: 70px;
  }
`;

const UserBtn = styled.button<{ backgroundColor: string; color: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: 200px;
  height: 40px;
  color: ${(props) => props.color};
  border: 0;
  border-bottom: 1px solid;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #777777;
    color: #ffffff;
  }
  @media screen and (max-width: 900px) {
    width: 70px;
  }
`;

const IntroImg = styled.div<{ $backgroundImg: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid;
  margin: 5px 10px 5px 0;
  background-image: url(${(props) => props.$backgroundImg});
  background-size: cover;
  background-position: center;
  background-color: #ffffff;
`;

const ChatName = styled.p`
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const ChatRoom = () => {
  const [showingChatID, setShowingChatID] = useState<string>("");
  const [chattingName, setChattingName] = useState<string>("");
  const [chattingImage, setChattingImage] = useState<string>("");
  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const initialChatRoomData = useSelector(
    (state: RootState) => state.IsPreviewReducer.nowChatRoom
  );
  const dispatch = useDispatch();
  const urlID = useParams().id;
  useEffect(() => {
    if (initialChatRoomData.chatRoomID && initialChatRoomData.name) {
      setShowingChatID(initialChatRoomData.chatRoomID);
      setChattingName(initialChatRoomData.name);
      setChattingImage(initialChatRoomData.userImage);
      userData.chatRoom.forEach((data: chatRoom, index: number) => {
        if (data.name === initialChatRoomData.name) {
          setSelectIndex(index);
        }
      });
    }

    return () => {
      setShowingChatID("");
      setChattingName("");
    };
  }, [initialChatRoomData, userData]);

  useEffect(() => {
    return () => {
      dispatch(setChatRoomID("", "", ""));
    };
  }, []);
  return (
    <Wrapper>
      {userData.userID === urlID ? (
        <ChatRoomArea>
          <UserList>
            {userData.chatRoom.map((data: chatRoom, index: number) => {
              return (
                <UserBtn
                  onClick={() => {
                    setShowingChatID(data.chatRoomID);
                    setChattingName(data.name);
                    setChattingImage(data.userImage);
                    setSelectIndex(index);
                  }}
                  key={data.name}
                  backgroundColor={
                    index === selectIndex ? "#555555" : "#ffffff"
                  }
                  color={index === selectIndex ? "#ffffff" : "#555555"}
                >
                  <IntroImg $backgroundImg={data.userImage}></IntroImg>
                  <ChatName>{data.name}</ChatName>
                </UserBtn>
              );
            })}
          </UserList>
          <Chats
            chatRoomID={showingChatID}
            chattingName={chattingName}
            userImage={chattingImage}
          />
        </ChatRoomArea>
      ) : (
        <p>這不是你該來的地方</p>
      )}
    </Wrapper>
  );
};

export default ChatRoom;
