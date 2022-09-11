import React, { useEffect } from "react";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import { portfolioLoading } from "../../action";

import FollowingCard from "./FollowingCard";

export interface followPortfolios {
  name: string;
  title: string;
  mainImage: string;
  userID: string;
  portfolioID: string;
}

const FollowingArea = () => {
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     const loadData = async () => {
  //       const userData = await firebase.readData("users", `${userData.userID}`);
  //       if (userData) {
  //         setProfileData(userData);
  //       }
  //     };
  //     loadData();
  //   }, []);
  return (
    <div>
      <p>Portfolio : </p>
      {userData.followPortfolios.map(
        (data: followPortfolios, index: number) => {
          return (
            <FollowingCard key={data.portfolioID} data={data} index={index} />
          );
        }
      )}
    </div>
  );
};

export default FollowingArea;
