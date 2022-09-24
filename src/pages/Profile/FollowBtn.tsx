import React, { useState, useEffect } from "react";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import { UserReducer } from "../../reducers";
import { setAlert, userLoading } from "../../action";
import styled from "styled-components";
import firebase from "../../utilis/firebase";

const FollowButton = styled.div``;

const FollowBtn = ({ profileData }: UserReducer) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();
  const followPortfolio = async () => {
    {
      if (isFollow) {
        setIsFollow(false);
        await firebase.cancelMemberFollowing(profileData, userData);
        dispatch(setAlert({ isAlert: true, text: "取消追蹤!" }));
        setTimeout(() => {
          dispatch(setAlert({ isAlert: false, text: "" }));
        }, 3000);
      } else {
        setIsFollow(true);
        await firebase.addMemberFollowing(profileData, userData);
        dispatch(setAlert({ isAlert: true, text: "加入追蹤!" }));
        setTimeout(() => {
          dispatch(setAlert({ isAlert: false, text: "" }));
        }, 3000);
      }
    }

    const renewUserData = await firebase.readData("users", userData.userID);
    if (renewUserData) {
      dispatch(userLoading(renewUserData));
    }
  };

  useEffect(() => {
    if (profileData.followers) {
      profileData.followers.forEach(
        (data: { userID: string; name: string }) => {
          if (data.userID === userData.userID) {
            setIsFollow(true);
          }
        }
      );
    }
    return () => {
      setIsFollow(false);
    };
  }, [userData]);
  return (
    <FollowButton onClick={followPortfolio} id="followButton">
      {isFollow ? "取消追蹤" : `追蹤${profileData.name}`}
    </FollowButton>
  );
};

export default FollowBtn;
