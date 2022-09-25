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
  width: 270px;
  height: 360px;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0px 0px 10px #777777;
  }
`;

const IntroArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  margin: 10px 10px 5px;
`;

const Intro = styled(Link)`
  text-decoration: none;
  color: #555555;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const IntroImg = styled.div<{ backgroundImg: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid;
  margin: 5px 10px 5px 0;
  background-image: url(${(props) => props.backgroundImg});
  background-size: cover;
  background-position: center;
`;

const IntroName = styled.p`
  color: #555555;
  font-size: 20px;
`;

const PinImage = styled(Link)<{ mainimage: string }>`
  flex: auto;
  background-image: url(${(props) => props.mainimage});
  background-size: cover;
  background-position: top;
`;

const ResumeCard = ({ size, data }: { size: number; data: DocumentData }) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  // const followPortfolio = async () => {
  //   if (isFollow) {
  //     await firebase.cancelPortfolioFollowing(data, userData);
  //   } else {
  //     await firebase.addPortfolioFollowing(data, userData);
  //   }

  //   const renewPortfolioData = await firebase.readPortfolioData(
  //     "portfolios",
  //     `${data.portfolioID}`
  //   );
  //   if (renewPortfolioData) {
  //     dispatch(portfolioLoading(renewPortfolioData));
  //   }
  // };

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
        <Intro to={`/profile/${data.userID}`}>
          <IntroImg backgroundImg={data.userImage}></IntroImg>
          <IntroName>{data.name}</IntroName>
        </Intro>
        <p>
          {isFollow ? `❤️` : `❤`}
          {data.followers.length}
        </p>
      </IntroArea>
    </SinglePin>
  );
};

export default ResumeCard;
