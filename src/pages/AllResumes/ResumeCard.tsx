import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { portfolioLoading, setAlert } from "../../action";
import { RootState } from "../../reducers";
import firebase from "../../utilis/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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

const ResumeCard = ({ size, data }: { size: number; data: DocumentData }) => {
  const [isFollow, setIsFollow] = useState(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const isLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const followPortfolio = async () => {
    if (!isLogin) {
      dispatch(setAlert({ isAlert: true, text: "請先登入再進行操作!" }));
      navigate(`/login`);
      setTimeout(() => {
        dispatch(setAlert({ isAlert: false, text: "" }));
      }, 3000);
      return;
    }
    if (isFollow) {
      await firebase.cancelResumeFollowing(data, userData);
    } else {
      await firebase.addResumeFollowing(data, userData);
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
