import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { portfolioReducer } from "../reducers/PortfolioContent";
import firebase from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { portfolioLoading } from "../action";
import { RootState } from "../reducers";

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

const SideBar = ({ portfolioData }: { portfolioData: portfolioReducer }) => {
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
    await firebase.addPortfolioFollowing(portfolioData, userData);
    const renewPortfolioData = await firebase.readPortfolioData(
      "portfolios",
      `${portfolioData.portfolioID}`
    );
    if (renewPortfolioData) {
      dispatch(portfolioLoading(renewPortfolioData));
    }
  };
  console.log(isFollow);
  useEffect(() => {
    console.log(portfolioData.followers);

    portfolioData.followers.forEach((data) => {
      if (data.userID === localStorage.getItem("userID")) {
        setIsFollow(true);
      }
    });

    return () => {
      setIsFollow(false);
    };
  }, [portfolioData]);
  return (
    <SideBarArea>
      <div onClick={showingBar}>{showBarInfo.title}</div>
      <Options style={{ left: showBarInfo.showBar ? "0px" : "0px" }}>
        <p>{portfolioData.name}</p>
        <p onClick={followPortfolio}>
          {isFollow ? `❤️` : `❤`}
          {portfolioData.followers.length}
        </p>
        <p></p>
      </Options>
    </SideBarArea>
  );
};

export default SideBar;
