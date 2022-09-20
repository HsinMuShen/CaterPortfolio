import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RootState } from "../reducers";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState } from "../action";
import firebase from "../utilis/firebase";
import { userLoading } from "../action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faComment,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import HeaderSidebar from "./HeaderSidebar";
import Fish from "../images/fish.png";
import Logo from "../images/caterportfolio_logo.png";

const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  border-bottom: 1px solid;
  /* box-shadow: 0 3px #888888b3; */
  z-index: 5;
`;

const MainNav = styled.div`
  display: flex;
  align-items: center;
`;

const SideNav = styled.div<{ isMobile: boolean }>`
  display: ${(props) => (props.isMobile ? "none" : "flex")};
  align-items: center;
  margin-right: 20px;
`;

const LogoArea = styled(Link)<{ img: string }>`
  color: #333333;
  text-decoration: none;
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 0px 0 20px;
  background-image: url(${(props) => props.img});
`;
const Tag = styled(Link)`
  color: #333333;
  text-decoration: none;
  margin: 0 20px;
`;

const ChatTag = styled(Link)`
  color: #333333;
  text-decoration: none;
  cursor: pointer;
  margin: 0 20px;
  font-size: 28px;
`;

const Nav = styled.p`
  color: #333333;
  cursor: pointer;
  margin: 0 20px;
  font-size: 28px;
`;

const Header = () => {
  const [isSideBar, setIsSideBar] = useState<boolean>(false);
  const auth = getAuth(firebaseApp);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const userIsLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await firebase.readData("users", user.uid);
        if (userData) {
          dispatch(userLoading(userData));
        }
        dispatch(changeLoginState(true));
      } else {
        dispatch(changeLoginState(false));
      }
    });
  }, []);

  useEffect(() => {
    setIsSideBar(false);
  }, [location]);
  return (
    <Wrapper>
      <MainNav>
        <LogoArea to={`/`} img={Logo}></LogoArea>
        <Tag to={`/`}>CaterPortfolio</Tag>
        <Tag to={`/allresumes`}>All Resumes</Tag>
      </MainNav>
      {userIsLogin ? (
        <SideNav isMobile={false}>
          <ChatTag to={`/chatroom/${userData.userID}`}>
            <FontAwesomeIcon icon={faComment} />
          </ChatTag>
          <Nav
            onClick={() => {
              setIsSideBar(true);
            }}
          >
            <FontAwesomeIcon icon={faUserAstronaut} />
          </Nav>
        </SideNav>
      ) : (
        <SideNav isMobile={false}>
          <Tag to={`/login`}>Login</Tag>
        </SideNav>
      )}
      <SideNav isMobile={true}>
        <FontAwesomeIcon icon={faBars} />
      </SideNav>
      <HeaderSidebar
        userData={userData}
        auth={auth}
        isSideBar={isSideBar}
        setIsSideBar={setIsSideBar}
      />
    </Wrapper>
  );
};

export default Header;
