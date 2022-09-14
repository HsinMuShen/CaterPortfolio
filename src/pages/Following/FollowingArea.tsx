import React, { useState, useEffect } from "react";
import { RootState } from "../../reducers";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import firebase from "../../utilis/firebase";

import FollowingPortfolioCard from "./FollowingPortfolioCard";
import FollowingResumeCard from "./FollowingResumeCard";
import FollowingMemberCard from "./FollowingMemberCard";
import { DocumentData } from "firebase/firestore";

const Wrapper = styled.div`
  width: 960px;
  margin: 120px auto;
`;

const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const CardsArea = styled.div`
  display: flex;
`;

const Member = styled(Link)``;

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
  const [userData, setUserData] = useState<DocumentData>();
  const followID = useParams().id;

  useEffect(() => {
    const loadData = async () => {
      const userData = await firebase.readData("users", `${followID}`);
      if (userData) {
        setUserData(userData);
      }
    };
    loadData();
  }, []);
  return (
    <Wrapper>
      <TypeWrapper>
        <Title>Portfolios : </Title>
        <CardsArea>
          {userData?.followPortfolios.map(
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
        </CardsArea>
      </TypeWrapper>

      <TypeWrapper>
        <Title>Resumes : </Title>
        {userData?.followResumes.map((data: followResumes, index: number) => {
          return (
            <FollowingResumeCard key={data.userID} data={data} index={index} />
          );
        })}
      </TypeWrapper>

      <TypeWrapper>
        <Title>Members : </Title>
        {userData?.followMembers.map((data: followMembers, index: number) => {
          return (
            <FollowingMemberCard key={data.userID} data={data} index={index} />
          );
        })}
      </TypeWrapper>
    </Wrapper>
  );
};

export default FollowingArea;
