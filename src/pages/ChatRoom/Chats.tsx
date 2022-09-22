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
  font-size: 20px;
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

const MessageArea = styled.div`
  height: 600px;
  width: 600px;
  overflow: scroll;
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
  userImage,
}: {
  chatRoomID: string;
  chattingName: string | null;
  userImage: string;
}) => {
  const [sendMsg, setSendMsg] = useState("");
  const [allMsg, setAllMsg] = useState<
    { msg: string; userID: string; name: string }[]
  >([]);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const submitMsg = () => {
    if (sendMsg !== "") {
      firebase.addMsg(userData, chatRoomID, sendMsg);
      setSendMsg("");
    } else {
      alert("請填入文字");
    }
  };
  useEffect(() => {
    if (chatRoomID !== "") {
      onSnapshot(doc(db, "chatrooms", chatRoomID), (doc) => {
        setAllMsg(doc.data()!.message);
      });
    }
  }, [chatRoomID]);
  return (
    <Wrapper>
      <NameArea>
        <IntroImg $backgroundImg={userImage}></IntroImg>
        <p>{chattingName + " 聊天室"}</p>
      </NameArea>

      <MessageArea>
        {allMsg.map((data, index) => {
          if (data.userID === userData.userID) {
            return (
              <UserMsgDialog key={index}>
                <UserMsg>{data.msg}</UserMsg>
              </UserMsgDialog>
            );
          } else {
            return (
              <MsgDialog key={index}>
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
