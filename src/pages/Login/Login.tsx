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

import signinImg from "./loginimg.jpg";
import registerImg from "./registerimg.jpg";

const auth = getAuth(firebaseApp);

const Wrapper = styled.div`
  margin: 120px auto 0;
  width: 960px;
`;

const LoginArea = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto;
  width: 600px;
`;
const SelectArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const SelectTag = styled.div<{ backgroundColor: string }>`
  width: 50%;
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
`;
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px;
`;

const SingleInputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const Label = styled.label`
  width: 120px;
  font-size: 16px;
`;
const Input = styled.input`
  width: 360px;
  height: 30px;
`;

const SubmitBtn = styled.button`
  width: 480px;
  height: 35px;
  margin: 0 auto 20px;
  background-color: #ffffff;
  border-radius: 5px;
  font-size: 18px;

  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

const SideArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SideImgArea = styled.div<{ backgroundImg: string }>`
  width: 780px;
  height: 300px;
  object-fit: cover;
  margin: 20vh auto 0;
  background-image: url(${(props) => props.backgroundImg});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transition: background-image 1s;
`;

const Login = () => {
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
      <LoginArea>
        <SelectArea>
          <SelectTag
            onClick={() => {
              setActiveItem("signin");
            }}
            backgroundColor={activeItem === "register" ? "#ffffff" : "#e9e9e9"}
          >
            登入
          </SelectTag>
          <SelectTag
            onClick={() => {
              setActiveItem("register");
            }}
            backgroundColor={activeItem === "register" ? "#e9e9e9" : "#ffffff"}
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
        <SubmitBtn onClick={onSubmit}>
          {activeItem === "register" ? "註冊" : "登入"}
        </SubmitBtn>
      </LoginArea>
      <SideArea>
        <SideImgArea
          backgroundImg={activeItem === "signin" ? signinImg : registerImg}
        ></SideImgArea>
      </SideArea>
    </Wrapper>
  );
};

export default Login;
