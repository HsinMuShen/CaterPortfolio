import React, { useState, useEffect } from "react";
import { RootState } from "../../reducers";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import firebase from "../../utilis/firebase";

import LargeLoading from "../../utilis/LargeLoading";
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
  width: 960px;
  display: flex;
`;

const Member = styled(Link)``;

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

const FollowingArea = () => {
  const [userData, setUserData] = useState<DocumentData>();
  const [isLargeLoading, setIsLargeLoading] = useState<boolean>(false);
  const followID = useParams().id;

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
      <Wrapper>
        <TypeWrapper>
          <Title>作品集 : </Title>
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
          <Title>履歷 : </Title>
          <CardsArea>
            {userData?.followResumes.map(
              (data: followResumes, index: number) => {
                return (
                  <FollowingResumeCard
                    key={data.userID}
                    data={data}
                    index={index}
                  />
                );
              }
            )}
          </CardsArea>
        </TypeWrapper>

        <TypeWrapper>
          <Title>創作者 : </Title>
          <CardsArea>
            {userData?.followMembers.map(
              (data: followMembers, index: number) => {
                return (
                  <FollowingMemberCard
                    key={data.userID}
                    data={data}
                    index={index}
                  />
                );
              }
            )}
          </CardsArea>
        </TypeWrapper>
      </Wrapper>
      {isLargeLoading ? <LargeLoading backgroundColor={"#ffffff"} /> : null}
    </>
  );
};

export default FollowingArea;
