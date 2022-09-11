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
const Options = styled.div`
  position: fixed;
  left: -200px;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 16px;
  width: 200px;
  background-color: #ffffff;
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
        await firebase.cancelResumeFollowing(data, userData);
        alert("取消追蹤!");
      } else {
        await firebase.addResumeFollowing(data, userData);
        alert("加入追蹤!");
      }

      const renewResumeData = await firebase.readPortfolioData(
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
      <div onClick={showingBar}>{showBarInfo.title}</div>
      <Options style={{ left: showBarInfo.showBar ? "0px" : "-200px" }}>
        <p>{data.name}</p>
        <p onClick={followPortfolio}>
          {isFollow ? `❤️` : `❤`}
          {data.followers.length}
        </p>
        <p></p>
      </Options>
    </SideBarArea>
  );
};

export default SideBar;
