import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import { chatRoom } from "../Profile/ChatButton";

import styled from "styled-components";
import Chats from "./Chats";

const Wrapper = styled.div``;
const ChatRoomArea = styled.div`
  display: flex;
  width: 960px;
  margin: 60px auto;
  border: 1px solid;
`;
const UserList = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const ChatRoom = () => {
  const [showingChatID, setShowingChatID] = useState<string>("");
  const [chattingName, setChattingName] = useState<string | null>(null);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const urlID = useParams().id;
  return (
    <Wrapper>
      {userData.userID === urlID ? (
        <ChatRoomArea>
          <UserList>
            {userData.chatRoom.map((data: chatRoom) => {
              return (
                <button
                  onClick={() => {
                    setShowingChatID(data.chatRoomID);
                    setChattingName(data.name);
                  }}
                  key={data.name}
                >
                  {data.name}
                </button>
              );
            })}
          </UserList>
          <Chats chatRoomID={showingChatID} chattingName={chattingName} />
        </ChatRoomArea>
      ) : (
        <p>這不是你該來的地方</p>
      )}
    </Wrapper>
  );
};

export default ChatRoom;
