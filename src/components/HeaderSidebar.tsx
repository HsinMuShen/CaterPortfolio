import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { UserReducer } from "../reducers";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div<{ isSideBar: boolean }>`
  position: fixed;
  right: ${(props) => (props.isSideBar ? "0" : "-200px")};
  top: 0px;
  height: 100vh;
  width: 200px;
  background-color: #555555f2;
  /* border-left: 1px solid; */
`;

const TagArea = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

const Tag = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  margin: 0 20px 20px;
`;

const Nav = styled.p`
  position: relative;
  color: #ffffff;
  cursor: pointer;
  font-size: 28px;
  top: 15px;
  left: 20px;
`;

const HeaderSidebar = ({
  userData,
  auth,
  isSideBar,
  setIsSideBar,
}: UserReducer) => {
  return (
    <Wrapper isSideBar={isSideBar}>
      <Nav
        onClick={(e) => {
          console.log(e.target);
          setIsSideBar(false);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </Nav>
      <TagArea>
        <Tag to={`/profile/${userData.userID}`}>profile</Tag>
        <Tag to={`/resume/${userData.userID}`}>Resume</Tag>
        <Tag to={`/website/${userData.userID}`}>Website</Tag>
        <Tag to={`/chatroom/${userData.userID}`}>Chatroom</Tag>
        <Tag
          to={"#"}
          onClick={() => {
            signOut(auth);
            alert("成功登出會員!");
          }}
        >
          登出
        </Tag>
      </TagArea>
    </Wrapper>
  );
};

export default HeaderSidebar;
