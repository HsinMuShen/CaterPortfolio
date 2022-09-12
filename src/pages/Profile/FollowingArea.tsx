import React, { useEffect } from "react";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import { portfolioLoading } from "../../action";

import FollowingPortfolioCard from "./FollowingPortfolioCard";
import FollowingResumeCard from "./FollowingResumeCard";

export interface followPortfolios {
  name: string;
  title: string;
  mainImage: string;
  userID: string;
  portfolioID: string;
}

export interface followResumes {
  name: string;
  userID: string;
  coverImage: string;
}

const FollowingArea = () => {
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Portfolio : </p>
      {userData.followPortfolios.map(
        (data: followPortfolios, index: number) => {
          return (
            <FollowingPortfolioCard
              key={data.portfolioID}
              data={data}
              index={index}
            />
          );
        }
      )}
      <p>Resume : </p>
      {userData.followResumes.map((data: followResumes, index: number) => {
        return (
          <FollowingResumeCard key={data.userID} data={data} index={index} />
        );
      })}
    </div>
  );
};

export default FollowingArea;
