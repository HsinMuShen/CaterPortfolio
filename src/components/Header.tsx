import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { db, firebaseApp } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RootState } from "../reducers";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState, setAlert } from "../action/IsPreviewReducerAction";
import firebase from "../utilis/firebase";
import { userLoading } from "../action/UserReducerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faComment,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import HeaderSidebar from "./HeaderSidebar";
import useAlertCalling from "./useAlertCalling";
import LogoWithText from "../images/caterportfolio_logowithtext.png";

const Wrapper = styled.div<{
  portfolioListPopup: boolean;
  portfolioSinglePopup: boolean;
}>`
  width: 100vw;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  border-bottom: 1px solid;
  z-index: ${(props) =>
    props.portfolioListPopup || props.portfolioSinglePopup ? 1 : 5};
`;

const MainNav = styled.div`
  display: flex;
  align-items: center;
`;

const SideNav = styled.div<{ $isMobile: boolean }>`
  display: ${(props) => (props.$isMobile ? "none" : "flex")};
  align-items: center;
  margin-right: 20px;
  @media screen and (max-width: 900px) {
    display: ${(props) => (props.$isMobile ? "flex" : "none")};
  }
`;

const LogoArea = styled(Link)<{ img: string }>`
  color: #333333;
  text-decoration: none;
  width: 150px;
  height: 45px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 20px 0 20px;
  background-image: url(${(props) => props.img});
  & :hover {
    color: #6d6d6d;
  }
`;
const Tag = styled(Link)<{ $mobileNone: Boolean }>`
  color: #333333;
  text-decoration: none;
  margin: 0 20px;
  &:hover {
    color: #6d6d6d;
  }
  @media screen and (max-width: 900px) {
    display: ${(props) => (props.$mobileNone ? "none" : "block")};
  }
`;

const ChatTag = styled(Link)`
  color: #333333;
  text-decoration: none;
  cursor: pointer;
  margin: 0 20px;
  font-size: 28px;
  & :hover {
    color: #6d6d6d;
  }
`;

const Nav = styled.p`
  color: #333333;
  cursor: pointer;
  margin: 0 20px;
  font-size: 28px;
  & :hover {
    color: #6d6d6d;
  }
  @media screen and (max-width: 900px) {
    font-size: 20px;
    margin: 0 5px;
  }
`;

const Header = () => {
  const [isSideBar, setIsSideBar] = useState<boolean>(false);
  const auth = getAuth(firebaseApp);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const userIsLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const { portfolioListPopup, portfolioSinglePopup } = useSelector(
    (state: RootState) => state.IsPreviewReducer
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const { startAlert } = useAlertCalling();

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
    const userChatData = { name: userData.name, userID: userData.userID };
    const q = query(
      collection(db, "chatrooms"),
      where("userData", "array-contains", userChatData)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          const name =
            change.doc.data().message[change.doc.data().message.length - 1]
              .name;
          if (name !== userData.name) {
            startAlert(`${name}傳送了訊息給你!`);
          }
        }
      });
    });
  }, [userData]);

  useEffect(() => {
    setIsSideBar(false);
  }, [location]);
  return (
    <Wrapper
      portfolioListPopup={portfolioListPopup}
      portfolioSinglePopup={portfolioSinglePopup}
    >
      <MainNav>
        <LogoArea to={`/`} img={LogoWithText} id="logo"></LogoArea>
        <Tag to={`/allportfolios`} id="allPortfolios" $mobileNone={true}>
          所有作品集
        </Tag>
        <Tag to={`/allresumes`} id="allResumes" $mobileNone={true}>
          所有履歷
        </Tag>
      </MainNav>
      {userIsLogin ? (
        <SideNav $isMobile={false}>
          <ChatTag to={`/chatroom/${userData.userID}`} id="chatroomIcon">
            <FontAwesomeIcon icon={faComment} />
          </ChatTag>
          <Nav
            onClick={() => {
              setIsSideBar(true);
            }}
            id="profileIcon"
          >
            <FontAwesomeIcon icon={faUserAstronaut} />
          </Nav>
        </SideNav>
      ) : (
        <SideNav $isMobile={false} id="login">
          <Tag to={`/login`} $mobileNone={false}>
            登入
          </Tag>
        </SideNav>
      )}
      <SideNav $isMobile={true}>
        {userIsLogin ? (
          <Nav
            onClick={() => {
              setIsSideBar(true);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </Nav>
        ) : (
          <Tag to={`/login`} $mobileNone={false}>
            登入
          </Tag>
        )}
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
