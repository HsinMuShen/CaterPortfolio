import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import firebase from "../../utilis/firebase";

import Loading from "../../utilis/Loading";
import FollowingPortfolioCard from "./FollowingPortfolioCard";
import FollowingResumeCard from "./FollowingResumeCard";
import FollowingMemberCard from "./FollowingMemberCard";
import { DocumentData } from "firebase/firestore";

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  @media screen and (max-width: 1279px) {
    width: 75vw;
    margin: 0;
  }
`;

const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  flex-wrap: wrap;
  border-radius: 15px;
  background-color: #e3e3e3;
  padding: 20px;
  @media screen and (max-width: 1279px) {
    width: 75vw;
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 1279px) {
    width: 120px;
  }
`;

const CardsArea = styled.div`
  width: 960px;
  display: flex;
  margin: 0 auto;
  @media screen and (max-width: 1279px) {
    width: 75vw;
  }
`;

const MemtionP = styled.p`
  font-size: 18px;
  margin: 10px auto;
`;

export interface followPortfolios {
  name: string;
  title: string;
  mainImage: string;
  userID: string;
  portfolioID: string;
  userImage: string;
}

export interface followResumes {
  name: string;
  userID: string;
  coverImage: string;
  userImage: string;
}

export interface followMembers {
  name: string;
  userID: string;
  userImage: string;
}

const FollowingArea = ({ followID }: { followID: string | undefined }) => {
  const [userData, setUserData] = useState<DocumentData>();
  const [isLargeLoading, setIsLargeLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLargeLoading(true);
      const userData = await firebase.readData("users", `${followID}`);
      if (userData) {
        setUserData(userData);
        setIsLargeLoading(false);
      }
    };
    loadData();
  }, []);
  return (
    <>
      {isLargeLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <TypeWrapper>
            <Title>作品集 : </Title>
            <CardsArea>
              {userData?.followPortfolios.length > 0 ? (
                userData?.followPortfolios.map(
                  (data: followPortfolios, index: number) => {
                    return (
                      <FollowingPortfolioCard
                        key={data.portfolioID}
                        data={data}
                        index={index}
                      />
                    );
                  }
                )
              ) : (
                <MemtionP>目前沒有收藏</MemtionP>
              )}
            </CardsArea>
          </TypeWrapper>

          <TypeWrapper>
            <Title>履歷 : </Title>
            <CardsArea>
              {userData?.followResumes.length > 0 ? (
                userData?.followResumes.map(
                  (data: followResumes, index: number) => {
                    return (
                      <FollowingResumeCard
                        key={data.userID}
                        data={data}
                        index={index}
                      />
                    );
                  }
                )
              ) : (
                <MemtionP>目前沒有收藏</MemtionP>
              )}
            </CardsArea>
          </TypeWrapper>

          <TypeWrapper>
            <Title>創作者 : </Title>
            <CardsArea>
              {userData?.followMembers.length > 0 ? (
                userData?.followMembers.map(
                  (data: followMembers, index: number) => {
                    return (
                      <FollowingMemberCard
                        key={data.userID}
                        data={data}
                        index={index}
                      />
                    );
                  }
                )
              ) : (
                <MemtionP>目前沒有收藏</MemtionP>
              )}
            </CardsArea>
          </TypeWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default FollowingArea;
