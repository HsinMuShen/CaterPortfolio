import React, { useState, useEffect } from "react";
import { RootState } from "../../reducers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { UserReducer } from "../../reducers";
import { userLoading } from "../../action/UserReducerAction";
import { setAlert } from "../../action/IsPreviewReducerAction";
import useAlertCalling from "../../components/useAlertCalling";

import firebase from "../../utilis/firebase";

const FollowButton = styled.div``;

const FollowBtn = ({ profileData, setIsLargeLoading }: UserReducer) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const isLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startAlert } = useAlertCalling();
  const followPortfolio = async () => {
    {
      if (!isLogin) {
        startAlert("請先登入再進行收藏!");
        navigate(`/login`);
        return;
      }
      if (isFollow) {
        setIsLargeLoading(true);
        await firebase.cancelMemberFollowing(profileData, userData);
        setIsFollow(false);
        setIsLargeLoading(false);
        startAlert("取消收藏!");
      } else {
        setIsLargeLoading(true);
        await firebase.addMemberFollowing(profileData, userData);
        setIsFollow(true);
        setIsLargeLoading(false);
        startAlert("加入收藏!");
      }
    }

    const renewUserData = await firebase.readData("users", userData.userID);
    if (renewUserData) {
      dispatch(userLoading(renewUserData));
    }
  };

  useEffect(() => {
    if (profileData.followers) {
      let followMatch = false;
      const result = profileData.followers.find(
        (data: { userID: string; name: string }) =>
          data.userID === userData.userID
      );
      if (result) {
        setIsFollow(true);
        followMatch = true;
      }
    }
  }, [profileData]);
  return (
    <FollowButton onClick={followPortfolio} id="followButton">
      {isFollow ? "取消收藏" : `收藏${profileData.name}`}
    </FollowButton>
  );
};

export default FollowBtn;
