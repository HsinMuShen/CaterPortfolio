import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { setAlert } from "../../action/IsPreviewReducerAction";
import { RootState } from "../../reducers";
import { ResumeReducer } from "../../reducers";

import firebase from "../../utilis/firebase";
import useAlertCalling from "../../components/useAlertCalling";

const SinglePin = styled.div<{ size: number }>`
  margin: 15px 15px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid;
  width: 320px;
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

const IconArea = styled.div`
  display: flex;
  align-items: center;
`;

const FollowText = styled.p`
  margin: 5px;
  font-size: 14px;
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
    <SinglePin size={size}>
      <PinImage to={`/resume/${data.userID}`} mainimage={data.coverImage} />
      <IntroArea>
        <Intro to={`/profile/${data.userID}`}>
          <IntroImg backgroundImg={data.userImage}></IntroImg>
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
