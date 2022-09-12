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

export interface followMembers {
  name: string;
  userID: string;
  userImage: string;
}

const FollowingArea = () => {
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Portfolios : </p>
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
      <p>Resumes : </p>
      {userData.followResumes.map((data: followResumes, index: number) => {
        return (
          <FollowingResumeCard key={data.userID} data={data} index={index} />
        );
      })}
      <p>Members : </p>
      {userData.followMembers.map((data: followMembers, index: number) => {
        return (
          <div>
            <img
              src={data.userImage}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: "1px solid",
              }}
            />
            <p>{data.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FollowingArea;
