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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 60px;
`;

const CreaterArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 960px;
`;
const ResumeArea = styled(Link)`
  width: 320px;
  height: 400px;
  border: 1px solid #555555;
  border-radius: 15px;
  text-decoration: none;
  overflow: hidden;
`;

const ImgArea = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const PreviewImg = styled.img<{ width: string }>`
  object-fit: scale-down;
  object-position: center 0%;
  width: ${(props) => props.width};
  height: 360px;
  background-color: #ffffff;
  border: 0px solid;
  transition: scale 0.5s, background-color 0.5s;
  &:hover {
    scale: 1.05;
    background-color: #55555540;
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
`;

const WebsiteDiv = styled.div`
  width: 620px;
  height: 360px;
  scale: 0.8;
  overflow: hidden;
`;

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<UserReducer | {}>({});
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
    };
    loadData();
  }, [profileUserID, userData.followMembers]);

  return (
    <Wrapper>
      <>
        <MemberIntro
          profileData={profileData}
          setProfileData={setProfileData}
        />
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
        <QusetionMark
          stepType={
            profileData.userID === userData.userID
              ? introSteps.profileUser
              : introSteps.profileOthers
          }
        />
      </>
    </Wrapper>
  );
};

export default Profile;
