import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { firebaseApp } from "../firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeLoginState } from "../action";
import firebase from "../utilis/firebase";
import {
  userLoading,
  portfolioLoading,
  websiteLoading,
  resumeLoading,
} from "../action";

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

const initialUserData = {
  name: "",
  email: "",
  password: "",
  userID: "",
  userImage: "",
  backgroundImage: "",
  introduction: "",
  chatRoom: [],
  followers: [],
  interestingTags: [],
  tags: [],
  followMembers: [],
  followResumes: [],
  followPortfolios: [],
  followWebsites: [],
};

const initialPortfolioData = {
  title: "Title",
  mainImage: "",
  content: [],
  name: "",
  followers: [],
  tags: [],
  time: null,
  userID: "",
  portfolioID: "",
};

const initialResumeData = {
  title: "",
  coverImage: "",
  content: [],
  name: "",
  followers: [],
  tags: [],
  time: null,
  userID: "",
};

const initialWebsiteData = {
  title: "",
  content: [],
  name: "",
  followers: [],
  tags: [],
  time: null,
  userID: "",
};

const Header = () => {
  const auth = getAuth(firebaseApp);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await firebase.readData("users", user.uid);
        console.log(userData);
        if (userData) {
          dispatch(userLoading(userData));
        }
        dispatch(changeLoginState(true));
      } else {
        dispatch(userLoading(initialUserData));
        dispatch(portfolioLoading(initialPortfolioData));
        dispatch(websiteLoading(initialWebsiteData));
        dispatch(resumeLoading(initialResumeData));
        dispatch(changeLoginState(false));
      }
    });
  }, []);
  return (
    <Wrapper>
      <Tag to={`/`}>CaterPortfolio</Tag>
      <Tag to={`/allresumes`}>All Resumes</Tag>
      <Tag to={`/profile/${userData.userID}`}>profile</Tag>
      <Tag to={`/resume/${userData.userID}`}>Resume</Tag>
      <Tag to={`/website/${userData.userID}`}>Website</Tag>
      <Tag to={`/chatroom/${userData.userID}`}>Chatroom</Tag>
      <Tag to={`/login`}>Login</Tag>
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
