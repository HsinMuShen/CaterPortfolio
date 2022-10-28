import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { firebaseApp } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { initialSetUserData } from "../../action/UserReducerAction";
import { useNavigate } from "react-router-dom";

import firebase from "../../utilis/firebase";

import initialUserImage from "../../images/user.png";
import initialBackgroundImg from "../../images/initialBackgroundImg.jpg";
import useAlertCalling from "../../components/useAlertCalling";

const auth = getAuth(firebaseApp);

const LoginArea = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid;
  border-radius: 16px;
  overflow: hidden;
  margin: 120px auto;
  width: 600px;
  @media screen and (max-width: 749px) {
    width: 80vw;
  }
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
  @media screen and (max-width: 749px) {
    margin: 20px auto;
  }
`;

const SingleInputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  @media screen and (max-width: 749px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  width: 120px;
  font-size: 16px;
`;
const Input = styled.input`
  width: 360px;
  height: 30px;
  padding-left: 5px;
  @media screen and (max-width: 749px) {
    width: 60vw;
  }
`;

const SubmitBtn = styled.button`
  width: 480px;
  height: 35px;
  margin: 0 auto 20px;
  background-color: #ffffff;
  border-radius: 5px;
  font-size: 16px;

  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
  @media screen and (max-width: 749px) {
    width: 60vw;
  }
`;

const Login = () => {
  const [activeItem, setActiveItem] = useState("signin");
  const userData = useSelector((state: RootState) => state.UserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { startAlert } = useAlertCalling();

  const onSubmit = () => {
    if (activeItem === "signin") {
      signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          startAlert("成功登入!");
          const tempData = { ...userData };
          tempData.userID = user.uid;
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage === "Firebase: Error (auth/user-not-found).") {
            startAlert(`找不到使用者，請檢察輸入信箱與密碼是否正確`);
          }
        });
    } else if (activeItem === "register") {
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          startAlert("成功註冊!");
          const tempData = { ...userData };
          tempData.userID = user.uid;
          tempData.userImage = initialUserImage;
          tempData.backgroundImage = initialBackgroundImg;
          firebase.uploadDoc("users", user.uid, tempData);
          navigate("/profile");
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (userData.name === "") {
            startAlert("請輸入使用者名稱!");
          } else if (errorMessage === "Firebase: Error (auth/missing-email).") {
            startAlert("電子信箱欄位不得空白");
          } else if (errorMessage === "Firebase: Error (auth/invalid-email).") {
            startAlert("電子信箱格式錯誤");
          } else if (
            errorMessage === "Firebase: Error (auth/internal-error)." ||
            errorMessage ===
              "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            startAlert("請輸入至少六位數密碼");
          } else if (
            errorMessage === "Firebase: Error (auth/email-already-in-use)."
          ) {
            startAlert("電子信箱已經被註冊過了");
          }
        });
    }
  };

  const SubmitWithTest = () => {
    signInWithEmailAndPassword(auth, "michael@gmail.com", "asdfgh").then(
      (userCredential) => {
        const user = userCredential.user;
        startAlert("成功登入!");
        const tempData = { ...userData };
        tempData.userID = user.uid;
        navigate("/");
      }
    );
  };

  useEffect(() => {
    dispatch(initialSetUserData("email", "michael@gmail.com"));
    dispatch(initialSetUserData("password", "asdfgh"));
  }, []);

  return (
    <LoginArea>
      <SelectArea>
        <SelectTag
          onClick={() => {
            setActiveItem("signin");
          }}
          backgroundColor={activeItem === "register" ? "#E7E7E7" : "#CBCBCB"}
        >
          登入
        </SelectTag>
        <SelectTag
          onClick={() => {
            setActiveItem("register");
          }}
          backgroundColor={activeItem === "register" ? "#CBCBCB" : "#E7E7E7"}
        >
          註冊
        </SelectTag>
      </SelectArea>
      <InputArea>
        {activeItem === "register" ? (
          <SingleInputArea>
            <Label>使用者名稱</Label>
            <Input
              type="text"
              onChange={(e) => {
                dispatch(initialSetUserData("name", e.target.value));
              }}
              required
            />
          </SingleInputArea>
        ) : null}

        <SingleInputArea>
          <Label>電子信箱</Label>
          <Input
            type="text"
            onChange={(e) => {
              dispatch(initialSetUserData("email", e.target.value));
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            required
          />
        </SingleInputArea>
        <SingleInputArea>
          <Label>密碼</Label>
          <Input
            type="password"
            onChange={(e) => {
              dispatch(initialSetUserData("password", e.target.value));
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            required
          />
        </SingleInputArea>
      </InputArea>
      {activeItem === "signin" ? (
        <SubmitBtn onClick={SubmitWithTest}>使用測試帳號一鍵登入</SubmitBtn>
      ) : null}
      <SubmitBtn onClick={onSubmit}>
        {activeItem === "register" ? "註冊" : "登入"}
      </SubmitBtn>
    </LoginArea>
  );
};

export default Login;
