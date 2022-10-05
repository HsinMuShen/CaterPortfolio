import React, { useState, useEffect } from "react";
import { RootState } from "../../reducers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserReducer } from "../../reducers";
import { userLoading } from "../../action/UserReducerAction";
import { setAlert } from "../../action";
import styled from "styled-components";
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
  const followPortfolio = async () => {
    {
      if (!isLogin) {
        dispatch(setAlert({ isAlert: true, text: "請先登入再進行收藏!" }));
        navigate(`/login`);
        setTimeout(() => {
          dispatch(setAlert({ isAlert: false, text: "" }));
        }, 3000);
        return;
      }
      if (isFollow) {
        setIsLargeLoading(true);
        await firebase.cancelMemberFollowing(profileData, userData);
        setIsFollow(false);
        setIsLargeLoading(false);
        dispatch(setAlert({ isAlert: true, text: "取消收藏!" }));
        setTimeout(() => {
          dispatch(setAlert({ isAlert: false, text: "" }));
        }, 2000);
      } else {
        setIsLargeLoading(true);
        await firebase.addMemberFollowing(profileData, userData);
        setIsFollow(true);
        setIsLargeLoading(false);
        dispatch(setAlert({ isAlert: true, text: "加入收藏!" }));
        setTimeout(() => {
          dispatch(setAlert({ isAlert: false, text: "" }));
        }, 2000);
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
      profileData.followers.forEach(
        (data: { userID: string; name: string }) => {
          if (data.userID === userData.userID) {
            console.log("follow!");
            setIsFollow(true);
            followMatch = true;
            return;
          }
        }
      );
    }
  }, [profileData]);
  return (
    <FollowButton onClick={followPortfolio} id="followButton">
      {isFollow ? "取消收藏" : `收藏${profileData.name}`}
    </FollowButton>
  );
};

export default FollowBtn;
