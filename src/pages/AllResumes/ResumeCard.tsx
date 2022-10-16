import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "../../reducers";
import { ResumeReducer } from "../../reducers";

import firebase from "../../utilis/firebase";
import useAlertCalling from "../../components/useAlertCalling";
import {
  SinglePinStyle,
  IntroAreaStyle,
  IntroImgStyle,
  IconArea,
  FollowText,
} from "../../utilis/styledExtending";

const SinglePin = styled(SinglePinStyle)`
  width: 320px;
  height: 360px;
`;

const IntroArea = styled(IntroAreaStyle)`
  margin: 10px 10px 5px;
`;

const Intro = styled(Link)`
  text-decoration: none;
  color: #555555;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const IntroImg = styled(IntroImgStyle)<{ backgroundImg: string }>`
  background-image: url(${(props) => props.backgroundImg});
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

const FollowIcon = styled.div<{ backgroundColor: string }>`
  cursor: pointer;
  margin: 5px;
  color: ${(props) => props.backgroundColor};
`;

const ResumeCard = ({ size, data }: { size: number; data: ResumeReducer }) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const isLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const navigate = useNavigate();
  const { startAlert } = useAlertCalling();

  const followPortfolio = async () => {
    if (!isLogin) {
      startAlert("請先登入才能收藏履歷!");
      navigate(`/login`);
      return;
    }
    if (isFollow) {
      await firebase.cancelResumeFollowing(data, userData);
      startAlert("取消收藏!");
    } else {
      await firebase.addResumeFollowing(data, userData);
      startAlert("加入收藏!");
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
    <SinglePin>
      <PinImage to={`/resume/${data.userID}`} mainimage={data.coverImage} />
      <IntroArea>
        <Intro to={`/profile/${data.userID}`}>
          <IntroImg
            backgroundImg={data.userImage}
            to={`/profile/${data.userID}`}
          ></IntroImg>
          <IntroName>{data.name}</IntroName>
        </Intro>

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

export default ResumeCard;
