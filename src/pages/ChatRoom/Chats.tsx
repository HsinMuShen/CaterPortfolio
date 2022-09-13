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
  border-left: 1px solid;
`;

const NameArea = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid;
  width: 100%;
  padding-left: 15px;
  font-size: 24px;
`;

const MessageArea = styled.div`
  min-height: 600px;
  width: 600px;
`;

const MsgDialog = styled.div`
  display: flex;
  align-items: center;
  background: #d6d6d6;
  border-radius: 0.4em;
  margin: 10px;
  padding: 5px;
  width: fit-content;
`;

const UserMsgDialog = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #d6d6d6;
  border-radius: 0.4em;
  margin: 10px 15px 10px auto;
  padding: 5px;
  width: fit-content;
`;

const UserMsg = styled.p`
  margin-left: auto;
`;

const ControlArea = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 40px;
  align-items: center;
`;
const MessageInput = styled.input`
  width: 80%;
  margin: 0 0 10px 15px;
  height: 30px;
`;
const MessageSubmit = styled.button`
  width: 18%;
  margin: 0 15px 10px;
  height: 30px;
  background-color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

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
      setSendMsg("");
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
      <NameArea>
        <p>{chattingName}</p>
      </NameArea>

      <MessageArea>
        {allMsg.map((data) => {
          if (data.userID === userData.userID) {
            return (
              <UserMsgDialog>
                <UserMsg>{data.msg}</UserMsg>
              </UserMsgDialog>
            );
          } else {
            return (
              <MsgDialog>
                <p>{data.msg}</p>
              </MsgDialog>
            );
          }
        })}
      </MessageArea>

      {chatRoomID === "" ? null : (
        <ControlArea>
          <MessageInput
            type="text"
            value={sendMsg}
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
