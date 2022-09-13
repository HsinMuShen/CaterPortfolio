import React, { useState, useEffect } from "react";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import { UserReducer } from "../../reducers";
import { userLoading } from "../../action";
import firebase from "../../utilis/firebase";

const FollowBtn = ({ profileData }: UserReducer) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();
  const followPortfolio = async () => {
    {
      if (isFollow) {
        await firebase.cancelMemberFollowing(profileData, userData);
        alert("取消追蹤!");
      } else {
        console.log(profileData, userData);
        await firebase.addMemberFollowing(profileData, userData);
        alert("加入追蹤!");
      }

      //   const renewPortfolioData = await firebase.readPortfolioData(
      //     "portfolios",
      //     `${data.portfolioID}`
      //   );
      //   if (renewPortfolioData) {
      //     dispatch(portfolioLoading(renewPortfolioData));
      //   }
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
  }, [profileData, userData]);
  return (
    <button onClick={followPortfolio}>
      {isFollow ? "cancel follow" : "follow this guy"}
    </button>
  );
};

export default FollowBtn;
