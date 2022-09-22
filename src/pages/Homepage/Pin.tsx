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
  border: 1.5px solid #555555;
  grid-row-end: span ${(props) => props.size};
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
  margin: 10px 10px 20px;
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
`;

const IntroImg = styled(Link)<{ $backgroundImg: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid;
  margin: 5px 10px 5px 0;
  background-image: url(${(props) => props.$backgroundImg});
  background-size: cover;
  background-position: center;
`;

const Intro = styled(Link)`
  text-decoration: none;
  color: #555555;
  font-size: 14px;
`;

const PinImage = styled(Link)<{ mainimage: string }>`
  flex: auto;
  background-image: url(${(props) => props.mainimage});
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0 0;
  /* border-bottom:1px solid ; */
`;

const Pin = ({ size, data }: { size: number; data: DocumentData }) => {
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
      if (followersData.userID === localStorage.getItem("userID")) {
        setIsFollow(true);
      }
    });
    return () => {
      setIsFollow(false);
    };
  }, [data]);
  return (
    <SinglePin size={size}>
      <PinImage
        to={`/portfolio/${data.portfolioID}`}
        mainimage={data.mainImage}
      />
      <IntroArea>
        <UserArea>
          <IntroImg
            to={`/profile/${data.userID}`}
            $backgroundImg={data.userImage}
          ></IntroImg>
          <Intro to={`/profile/${data.userID}`}>{data.name}</Intro>
        </UserArea>

        <Intro to={`/portfolio/${data.portfolioID}`}>{data.title}</Intro>

        <p>
          {isFollow ? `❤️ ` : `❤ `}
          {data.followers.length}
        </p>
      </IntroArea>
    </SinglePin>
  );
};

export default Pin;
