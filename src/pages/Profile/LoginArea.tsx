import React, { useState } from "react";
import styled from "styled-components";
import { firebaseApp } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { initialSetUserData } from "../../action";
import firebase from "../../utilis/firebase";

const auth = getAuth(firebaseApp);

const Wrapper = styled.div``;
const SelectArea = styled.div`
  display: flex;
`;
const SelectTag = styled.p``;
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const SingleInputArea = styled.div`
  display: flex;
`;

const Label = styled.label``;
const Input = styled.input``;

const LoginArea = () => {
  const [activeItem, setActiveItem] = useState("signin");
  const userData = useSelector((state: RootState) => state.UserReducer);

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (activeItem === "signin") {
      signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("成功登入會員!");
          const tempData = userData;
          tempData.userID = user.uid;
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } else if (activeItem === "register") {
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("成功註冊會員!");
          const tempData = userData;
          tempData.userID = user.uid;
          firebase.uploadDoc("users", user.uid, tempData);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };
  return (
    <Wrapper>
      <SelectArea>
        <SelectTag
          onClick={() => {
            setActiveItem("signin");
          }}
        >
          登入
        </SelectTag>
        <SelectTag
          onClick={() => {
            setActiveItem("register");
          }}
        >
          註冊
        </SelectTag>
      </SelectArea>
      <InputArea>
        {activeItem === "register" ? (
          <div>
            <SingleInputArea>
              <Label>使用者名稱</Label>
              <Input
                type="text"
                onChange={(e) => {
                  dispatch(initialSetUserData("name", e.target.value));
                }}
              />
            </SingleInputArea>
          </div>
        ) : null}

        <SingleInputArea>
          <Label>Email</Label>
          <Input
            type="text"
            onChange={(e) => {
              dispatch(initialSetUserData("email", e.target.value));
            }}
          />
        </SingleInputArea>
        <SingleInputArea>
          <Label>Password</Label>
          <Input
            type="text"
            onChange={(e) => {
              dispatch(initialSetUserData("password", e.target.value));
            }}
          />
        </SingleInputArea>
      </InputArea>
      <div onClick={onSubmit}>
        {activeItem === "register" ? "註冊" : "登入"}
      </div>
    </Wrapper>
  );
};

export default LoginArea;
