import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resumeLoading, userLoading } from "../../action";
import Resume from "../Resume/Resume";
import { UserReducer } from "../../reducers";

import firebase from "../../utilis/firebase";
import styled from "styled-components";
import LoginArea from "./LoginArea";
import MemberIntro from "./MemberIntro";
import ChatButton from "./ChatButton";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 60px;
`;

const CreaterArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  border-radius: 15px;
  border: 2px solid;
  overflow: hidden;
`;
const ResumeArea = styled(Link)`
  width: 300px;
  height: 400px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PreviewImg = styled.img`
  object-fit: cover;
  width: 300px;
  height: 400px;
`;
const WebsiteArea = styled(Link)`
  width: 600px;
  height: 400px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FollowingArea = styled(Link)``;

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<UserReducer | {}>({});
  const userData = useSelector((state: RootState) => state.UserReducer);
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);
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
            tags: ["design"],
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
          <ResumeArea to={`/resume/${profileUserID}`}>
            <PreviewImg src={resumeData.coverImage} />
          </ResumeArea>
          <WebsiteArea to={`/website/${profileUserID}`}>Website</WebsiteArea>
        </CreaterArea>
      </>
    </Wrapper>
  );
};

export default Profile;
