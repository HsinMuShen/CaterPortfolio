import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";

import styled from "styled-components";
import firebase from "../../utilis/firebase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageArea = styled.div`
  min-height: 600px;
  width: 700px;
`;

const UserMsg = styled.p`
  margin-left: 600px;
`;

const ControlArea = styled.div`
  display: flex;
  height: 40px;
`;
const MessageInput = styled.input``;
const MessageSubmit = styled.button``;

const Chats = ({
  chatRoomID,
  chattingName,
}: {
  chatRoomID: string;
  chattingName: string | null;
}) => {
  const [sendMsg, setSendMsg] = useState("");
  const [allMsg, setAllMsg] = useState<{ msg: string; userID: string }[]>([]);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const submitMsg = () => {
    if (sendMsg !== "") {
      console.log(chatRoomID);
      firebase.addMsg(userData, chatRoomID, sendMsg);
    } else {
      alert("請填入文字");
    }
  };
  useEffect(() => {
    if (chatRoomID !== "") {
      onSnapshot(doc(db, "chatrooms", chatRoomID), (doc) => {
        console.log(doc.data());
        setAllMsg(doc.data()!.message);
      });
    }
  }, [chatRoomID]);
  return (
    <Wrapper>
      <p>{chattingName}</p>

      <MessageArea>
        {allMsg.map((data) => {
          if (data.userID === userData.userID) {
            return <UserMsg>{data.msg}</UserMsg>;
          } else {
            return <p>{data.msg}</p>;
          }
        })}
      </MessageArea>

      {chatRoomID === "" ? null : (
        <ControlArea>
          <MessageInput
            type="text"
            onChange={(e) => {
              setSendMsg(e.target.value);
            }}
          />
          <MessageSubmit
            onClick={() => {
              submitMsg();
            }}
          >
            送出
          </MessageSubmit>
        </ControlArea>
      )}
    </Wrapper>
  );
};

export default Chats;
