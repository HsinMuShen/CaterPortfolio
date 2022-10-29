import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { portfolioReducer } from "../../reducers/PortfolioContent";
import { resumeReducer } from "../../reducers/ResumeContent";
import { RootState } from "../../reducers";
import { userLoading } from "../../action/UserReducerAction";
import { resumeLoading } from "../../action/ResumeReducerAction";
import { portfolioLoading } from "../../action/PortfolioReducerAction";
import { setAlert } from "../../action/IsPreviewReducerAction";

import firebase from "../firebase";
import useAlertCalling from "../../components/useAlertCalling";

const SideBarArea = styled.div`
  position: fixed;
  top: 45%;
  left: 0;
  @media screen and (max-width: 1079px) {
    top: 65px;
  }
`;

const Options = styled.div`
  position: relative;
  left: 0px;
  top: -5px;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 16px;
  padding: 5px;
  width: 140px;
  background-color: #ffffff;
  transition: left 1s;
`;

const FollowArea = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const IconArea = styled.div`
  display: flex;
  align-items: center;
`;

const FollowText = styled.p`
  margin: 5px;
  font-size: 14px;
`;

const FollowIcon = styled.div<{ backgroundColor: string }>`
  cursor: pointer;
  margin: 5px;
  color: ${(props) => props.backgroundColor};
`;

const SideBar = ({
  type,
  data,
}: {
  type: string;
  data: portfolioReducer | resumeReducer;
}) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const isLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startAlert } = useAlertCalling();

  const followPortfolio = async () => {
    if (!isLogin) {
      startAlert("請先登入再進行收藏!");
      navigate(`/login`);
      return;
    }
    if (type === "portfolio") {
      if (isFollow) {
        await firebase.cancelPortfolioFollowing(
          data as portfolioReducer,
          userData
        );
        setIsFollow(false);
        startAlert("取消收藏!");
      } else {
        await firebase.addPortfolioFollowing(
          data as portfolioReducer,
          userData
        );
        setIsFollow(true);
        startAlert("加入收藏!");
      }
      if ("portfolioID" in data) {
        const renewPortfolioData = await firebase.readData(
          "portfolios",
          data.portfolioID
        );
        if (renewPortfolioData) {
          dispatch(portfolioLoading(renewPortfolioData));
        }
      }
    } else if (type === "resume") {
      if (isFollow) {
        await firebase.cancelResumeFollowing(data as resumeReducer, userData);
        setIsFollow(false);
        startAlert("取消收藏!");
      } else {
        await firebase.addResumeFollowing(data as resumeReducer, userData);
        setIsFollow(true);
        startAlert("加入收藏!");
      }
      if ("userID" in data) {
        const renewResumeData = await firebase.readData("resumes", data.userID);
        if (renewResumeData) {
          dispatch(resumeLoading(renewResumeData));
        }
      }
    }

    const renewUserData = await firebase.readData("users", userData.userID);
    if (renewUserData) {
      dispatch(userLoading(renewUserData));
    }
  };

  useEffect(() => {
    const result = data.followers.find(
      (data) => data.userID === userData.userID
    );
    if (result) setIsFollow(true);

    return () => {
      setIsFollow(false);
    };
  }, [userData.userID]);
  return (
    <SideBarArea id="sideBar">
      <Options>
        <FollowArea>
          <FollowText>
            {isFollow ? "點擊愛心取消收藏!" : "點擊愛心收藏!"}
          </FollowText>
          <IconArea>
            <FollowIcon
              onClick={followPortfolio}
              backgroundColor={isFollow ? "#C54545" : "none"}
            >
              <FontAwesomeIcon icon={faHeart} />
            </FollowIcon>
            <FollowText>{data.followers.length}</FollowText>
          </IconArea>
        </FollowArea>
      </Options>
    </SideBarArea>
  );
};

export default SideBar;
