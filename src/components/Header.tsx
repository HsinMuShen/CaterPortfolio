import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { firebaseApp } from "../firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { changeLoginState } from "../action";

const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #000000;
  display: flex;
`;

const Tag = styled(Link)`
  color: #ffffff;
  margin: 20px;
`;

const Nav = styled.p`
  color: #ffffff;
  cursor: pointer;
`;

const Header = () => {
  const auth = getAuth(firebaseApp);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        dispatch(changeLoginState(true));
      } else {
        dispatch(changeLoginState(false));
      }
    });
  }, []);
  return (
    <Wrapper>
      <Tag to={`/`}>CaterPortfolio</Tag>
      <Tag to={`/profile/${localStorage.getItem("userID")}`}>profile</Tag>
      <Tag to={`/resume/${localStorage.getItem("userID")}`}>Resume</Tag>
      <Tag to={`/website/${localStorage.getItem("userID")}`}>Website</Tag>
      <Nav
        onClick={() => {
          signOut(auth);
          alert("成功登出會員!");
        }}
      >
        登出
      </Nav>
    </Wrapper>
  );
};

export default Header;
