import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { portfolioReducer } from "../reducers/PortfolioContent";
import firebase from "./firebase";
import { RootState } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { portfolioLoading, resumeLoading, userLoading } from "../action";

const SideBarArea = styled.div`
  position: fixed;
  top: 45%;
`;

const SideBarTag = styled.div`
  position: relative;

  width: 140px;
  border: 1px solid;
  border-radius: 5px;
  padding: 6px;
  font-size: 16px;
  background-color: #555555;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const Options = styled.div`
  position: relative;
  left: -200px;
  top: -5px;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 0 5px 16px 16px;
  padding: 5px;
  width: 140px;
  background-color: #ffffff;
  transition: left 1s;
`;

const OptionsBtn = styled.p`
  cursor: pointer;
`;

const SideBar = ({ type, data }: { type: string; data: portfolioReducer }) => {
  const [showBarInfo, setShowBarInfo] = useState({
    showBar: false,
    title: "我喜歡這個作品!",
  });
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();
  const showingBar = () => {
    if (showBarInfo.showBar) {
      setShowBarInfo({
        showBar: false,
        title: "我喜歡這個作品!",
      });
    } else {
      setShowBarInfo({
        showBar: true,
        title: "收起這個東西",
      });
    }
  };
  const followPortfolio = async () => {
    if (type === "portfolio") {
      if (isFollow) {
        await firebase.cancelPortfolioFollowing(data, userData);
        alert("取消追蹤!");
      } else {
        await firebase.addPortfolioFollowing(data, userData);
        alert("加入追蹤!");
      }

      const renewPortfolioData = await firebase.readPortfolioData(
        "portfolios",
        `${data.portfolioID}`
      );
      if (renewPortfolioData) {
        dispatch(portfolioLoading(renewPortfolioData));
      }
    } else if (type === "resume") {
      if (isFollow) {
        console.log(data, userData);
        await firebase.cancelResumeFollowing(data, userData);
        alert("取消追蹤!");
      } else {
        await firebase.addResumeFollowing(data, userData);
        alert("加入追蹤!");
      }

      const renewResumeData = await firebase.readData(
        "resumes",
        `${data.portfolioID}`
      );
      if (renewResumeData) {
        dispatch(resumeLoading(renewResumeData));
      }
    }

    const renewUserData = await firebase.readData("users", userData.userID);
    if (renewUserData) {
      dispatch(userLoading(renewUserData));
    }
  };

  useEffect(() => {
    data.followers.forEach((data) => {
      if (data.userID === userData.userID) {
        setIsFollow(true);
      }
    });
    return () => {
      setIsFollow(false);
    };
  }, [data]);
  return (
    <SideBarArea>
      <SideBarTag onClick={showingBar} id="sideBar">
        {showBarInfo.title}
      </SideBarTag>
      <Options style={{ left: showBarInfo.showBar ? "0px" : "-200px" }}>
        <OptionsBtn>{data.name}</OptionsBtn>
        <OptionsBtn onClick={followPortfolio}>
          {isFollow ? `已追蹤 ❤️` : `加入追蹤 ❤`}
          {data.followers.length}
        </OptionsBtn>
      </Options>
    </SideBarArea>
  );
};

export default SideBar;
