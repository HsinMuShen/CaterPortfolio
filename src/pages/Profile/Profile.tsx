import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resumeLoading, userLoading, websiteLoading } from "../../action";
import { UserReducer } from "../../reducers";

import firebase from "../../utilis/firebase";
import styled from "styled-components";
import QusetionMark, { introSteps } from "../../utilis/QusetionMark";
import MemberIntro from "./MemberIntro";
import initialResume from "../../images/initialResume.png";
import initialWebsite from "../../images/initialWebsite.png";
import LargeLoading from "../../utilis/LargeLoading";
import FollowingArea from "../Following/FollowingArea";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 60px;
`;

const Hr = styled.hr`
  border-top: 2px solid #9a9a9a;
  width: 900px;
  margin: 20px auto 30px;
  @media screen and (max-width: 1279px) {
    width: 80vw;
    margin: 20px 0 30px;
  }
`;

const CreaterArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 960px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    width: 90vw;
    align-items: center;
  }
`;

const ResumeArea = styled(Link)`
  width: 320px;
  height: 400px;
  border: 1px solid #555555;
  border-radius: 15px;
  text-decoration: none;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 0px 10px #777777;
  }
  @media screen and (max-width: 1279px) {
    height: 240px;
    width: 60vw;
    margin: 10px 0;
  }
`;

const ImgArea = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const PreviewImg = styled.img<{ width: string }>`
  object-fit: cover;
  object-position: center 0%;
  width: ${(props) => props.width};
  height: 360px;
  background-color: #ffffff;
  border: 0px solid;
  transition: scale 0.5s, background-color 0.5s;
  &:hover {
    scale: 1.05;
  }
  @media screen and (max-width: 1279px) {
    height: 200px;
    width: 60vw;
  }
`;

const CreaterLabelArea = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;

  background-color: #ffffff;
`;

const CreaterLabel = styled.p`
  color: #555555;
  font-weight: 500;
  margin-top: 5px;
`;

const WebsiteArea = styled(Link)`
  width: 620px;
  height: 400px;
  border: 1px solid #555555;
  border-radius: 15px;
  text-decoration: none;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 0px 10px #777777;
  }
  @media screen and (max-width: 1279px) {
    height: 240px;
    width: 60vw;
    margin: 10px 0;
  }
`;

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLargeLoading, setIsLargeLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<UserReducer | {}>({});
  const [isCreaterArea, setIsCreaterArea] = useState<boolean>(true);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const isLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const dispatch = useDispatch();
  const profileUserID = useParams().id;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const resumeData = await firebase.readData("resumes", `${profileUserID}`);
      if (resumeData) {
        dispatch(resumeLoading(resumeData));
      } else {
        dispatch(
          resumeLoading({
            title: "",
            coverImage: "",
            content: [],
            name: "",
            followers: [],
            tags: [],
            time: null,
            userID: "",
            userImage: "",
          })
        );
      }

      const websiteData = await firebase.readData(
        "websites",
        `${profileUserID}`
      );
      if (websiteData) {
        dispatch(websiteLoading(websiteData));
      } else {
        dispatch(
          websiteLoading({
            title: "",
            coverImage: "",
            content: [],
            name: "",
            followers: [],
            tags: [],
            time: null,
            userID: "",
          })
        );
      }

      const userData = await firebase.readData("users", `${profileUserID}`);
      if (userData) {
        setProfileData(userData);
      }
      setIsLoading(false);
    };
    loadData();
    return () => {
      setIsCreaterArea(true);
    };
  }, [profileUserID]);

  useEffect(() => {
    const LoadProfile = async () => {
      const userData = await firebase.readData("users", `${profileUserID}`);
      if (userData) {
        setProfileData(userData);
      }
    };
    LoadProfile();
  }, [userData.followMembers]);

  useEffect(() => {
    setProfileData(userData);
  }, [userData.userImage, userData.backgroundImage]);

  return (
    <Wrapper>
      <MemberIntro
        profileData={profileData}
        setProfileData={setProfileData}
        setIsLargeLoading={setIsLargeLoading}
        isCreaterArea={isCreaterArea}
        setIsCreaterArea={setIsCreaterArea}
      />
      <Hr />
      {isCreaterArea ? (
        <CreaterArea>
          <ResumeArea to={`/resume/${profileUserID}`} id="resumeArea">
            <ImgArea>
              <PreviewImg
                src={
                  resumeData.coverImage ? resumeData.coverImage : initialResume
                }
                width={"320px"}
              />
            </ImgArea>
            <CreaterLabelArea>
              <CreaterLabel>{profileData.name}的履歷</CreaterLabel>
            </CreaterLabelArea>
          </ResumeArea>
          <WebsiteArea to={`/website/${profileUserID}`} id="websiteArea">
            <ImgArea>
              <PreviewImg
                src={
                  websiteData.coverImage
                    ? websiteData.coverImage
                    : initialWebsite
                }
                width={"620px"}
              />
            </ImgArea>
            <CreaterLabelArea>
              <CreaterLabel>{profileData.name}的網站</CreaterLabel>
            </CreaterLabelArea>
          </WebsiteArea>
        </CreaterArea>
      ) : (
        <FollowingArea followID={profileUserID} />
      )}

      <QusetionMark
        stepType={
          profileData.userID === userData.userID
            ? introSteps.profileUser
            : introSteps.profileOthers
        }
      />

      {isLoading ? <LargeLoading backgroundColor={"#ffffff"} /> : null}
      {isLargeLoading ? <LargeLoading backgroundColor={"#ffffffb3"} /> : null}
    </Wrapper>
  );
};

export default Profile;
