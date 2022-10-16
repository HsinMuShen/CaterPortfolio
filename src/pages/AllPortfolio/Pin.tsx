import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { portfolioLoading } from "../../action/PortfolioReducerAction";
import { RootState } from "../../reducers";
import firebase from "../../utilis/firebase";
import useAlertCalling from "../../components/useAlertCalling";
import {
  SinglePinStyle,
  IntroAreaStyle,
  IntroImgStyle,
  IconArea,
  FollowText,
} from "../../utilis/styledExtending";

const SinglePin = styled(SinglePinStyle)<{ size: number }>`
  grid-row-end: span ${(props) => props.size};
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
`;
const IntroArea = styled(IntroAreaStyle)`
  margin: 10px 10px 15px;
`;

const IntroImg = styled(IntroImgStyle)<{ $backgroundImg: string }>`
  background-image: url(${(props) => props.$backgroundImg});
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
`;

const FollowIcon = styled.div<{ backgroundColor: string }>`
  cursor: pointer;
  margin: 5px;
  color: ${(props) => props.backgroundColor};
`;

const Pin = ({ size, data }: { size: number; data: DocumentData }) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const isLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startAlert } = useAlertCalling();

  const followPortfolio = async () => {
    if (!isLogin) {
      startAlert("請先登入才能收藏作品集!");
      navigate(`/login`);
      return;
    }
    if (isFollow) {
      await firebase.cancelPortfolioFollowing(data, userData);
      startAlert("取消收藏!");
    } else {
      await firebase.addPortfolioFollowing(data, userData);
      startAlert("加入收藏!");
    }

    const renewPortfolioData = await firebase.readData(
      "portfolios",
      `${data.portfolioID}`
    );
    if (renewPortfolioData) {
      dispatch(portfolioLoading(renewPortfolioData));
    }
  };

  useEffect(() => {
    const result = data.followers.find(
      (followersData: { userID: string | null }) =>
        followersData.userID === userData.userID
    );
    if (result) {
      setIsFollow(true);
    }
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

        <IconArea>
          <FollowIcon
            onClick={followPortfolio}
            backgroundColor={isFollow ? "#C54545" : "none"}
          >
            <FontAwesomeIcon icon={faHeart} />
          </FollowIcon>
          <FollowText>{data.followers.length}</FollowText>
        </IconArea>
      </IntroArea>
    </SinglePin>
  );
};

export default Pin;
