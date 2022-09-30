import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db, firebaseApp } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RootState } from "../reducers";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState, setAlert } from "../action";
import firebase from "../utilis/firebase";
import { userLoading } from "../action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faComment,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import HeaderSidebar from "./HeaderSidebar";
import Logo from "../images/caterportfolio_logo.png";

const Wrapper = styled.div<{ isPopup: boolean }>`
  width: 100vw;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  border-bottom: 1px solid;
  z-index: ${(props) => (props.isPopup ? 1 : 5)};
`;

const MainNav = styled.div`
  display: flex;
  align-items: center;
`;

const SideNav = styled.div<{ isMobile: boolean }>`
  display: ${(props) => (props.isMobile ? "none" : "flex")};
  align-items: center;
  margin-right: 20px;
  @media screen and (max-width: 900px) {
    display: ${(props) => (props.isMobile ? "flex" : "none")};
  }
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
  & :hover {
    color: #6d6d6d;
  }
`;
const Tag = styled(Link)<{ mobileNone: Boolean }>`
  color: #333333;
  text-decoration: none;
  margin: 0 20px;
  &:hover {
    color: #6d6d6d;
  }
  @media screen and (max-width: 900px) {
    display: ${(props) => (props.mobileNone ? "none" : "block")};
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
  const isPopup = useSelector(
    (state: RootState) => state.IsPreviewReducer.popup
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
    const userChatData = { name: userData.name, userID: userData.userID };
    const q = query(
      collection(db, "chatrooms"),
      where("userData", "array-contains", userChatData)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === "modified") {
          const name =
            change.doc.data().message[change.doc.data().message.length - 1]
              .name;

          if (name !== userData.name) {
            dispatch(
              setAlert({ isAlert: true, text: `${name}傳送了訊息給你!` })
            );
            setTimeout(() => {
              dispatch(setAlert({ isAlert: false, text: "" }));
            }, 3000);
          }
        }
      });
    });
  }, [userData]);

  useEffect(() => {
    setIsSideBar(false);
  }, [location]);
  return (
    <Wrapper isPopup={isPopup}>
      <MainNav>
        <LogoArea to={`/`} img={Logo} id="logo"></LogoArea>
        <Tag to={`/`} id="allPortfolios" mobileNone={true}>
          CaterPortfolio
        </Tag>
        <Tag to={`/allresumes`} id="allResumes" mobileNone={true}>
          All Resumes
        </Tag>
      </MainNav>
      {userIsLogin ? (
        <SideNav isMobile={false}>
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
        <SideNav isMobile={false} id="login">
          <Tag to={`/login`} mobileNone={false}>
            登入
          </Tag>
        </SideNav>
      )}
      <SideNav isMobile={true}>
        <Nav
          onClick={() => {
            setIsSideBar(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </Nav>
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
