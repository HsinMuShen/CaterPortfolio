import React, { useState, useEffect } from "react";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import { UserReducer } from "../../reducers";
import { setAlert, userLoading } from "../../action";
import styled from "styled-components";
import firebase from "../../utilis/firebase";

const FollowButton = styled.div``;

const FollowBtn = ({ profileData, setIsLargeLoading }: UserReducer) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();
  const followPortfolio = async () => {
    {
      if (isFollow) {
        setIsLargeLoading(true);
        await firebase.cancelMemberFollowing(profileData, userData);
        setIsFollow(false);
        setIsLargeLoading(false);
        dispatch(setAlert({ isAlert: true, text: "取消追蹤!" }));
        setTimeout(() => {
          dispatch(setAlert({ isAlert: false, text: "" }));
        }, 2000);
      } else {
        await firebase.addMemberFollowing(profileData, userData);
        setIsFollow(true);
        setIsLargeLoading(false);
        dispatch(setAlert({ isAlert: true, text: "加入追蹤!" }));
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
          console.log(data, userData.userID);
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
      {isFollow ? "取消追蹤" : `追蹤${profileData.name}`}
    </FollowButton>
  );
};

export default FollowBtn;
