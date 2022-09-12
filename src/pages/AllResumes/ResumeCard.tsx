import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { portfolioLoading } from "../../action";
import { RootState } from "../../reducers";
import firebase from "../../utilis/firebase";

const SinglePin = styled.div<{ size: number }>`
  margin: 15px 10px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid;
  width: 240px;
  height: 280px;
  display: flex;
  flex-direction: column;
`;

const IntroArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
`;

const Intro = styled(Link)``;

const PinImage = styled(Link)<{ mainimage: string }>`
  flex: auto;
  background-image: url(${(props) => props.mainimage});
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0 0;
`;

const ResumeCard = ({ size, data }: { size: number; data: DocumentData }) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  const followPortfolio = async () => {
    if (isFollow) {
      await firebase.cancelPortfolioFollowing(data, userData);
    } else {
      await firebase.addPortfolioFollowing(data, userData);
    }

    const renewPortfolioData = await firebase.readPortfolioData(
      "portfolios",
      `${data.portfolioID}`
    );
    if (renewPortfolioData) {
      dispatch(portfolioLoading(renewPortfolioData));
    }
  };

  useEffect(() => {
    data.followers.forEach((followersData: { userID: string | null }) => {
      if (followersData.userID === userData.userID) {
        setIsFollow(true);
      }
    });
    return () => {
      setIsFollow(false);
    };
  }, [data]);
  return (
    <SinglePin size={size}>
      <PinImage to={`/resume/${data.userID}`} mainimage={data.coverImage} />
      <IntroArea>
        <Intro to={`/profile/${data.userID}`}>{data.name}</Intro>
        <p>
          {isFollow ? `❤️` : `❤`}
          {data.followers.length}
        </p>
      </IntroArea>
    </SinglePin>
  );
};

export default ResumeCard;
