import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resumeLoading } from "../../action";
import firebase from "../../utilis/firebase";

import styled from "styled-components";
import LoginArea from "./LoginArea";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CreaterArea = styled.div`
  display: flex;
  justify-content: center;
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

const Profile: React.FC = () => {
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);
  const isLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  const dispatch = useDispatch();
  const userID = useParams().id;

  useEffect(() => {
    const loadResume = async () => {
      const resumeData = await firebase.readData(
        "resumes",
        "Xvbmt52vwx9RzFaXE17L"
      );
      if (resumeData) {
        dispatch(resumeLoading(resumeData));
      }
    };
    loadResume();
  }, []);
  return (
    <Wrapper>
      {isLogin ? (
        <CreaterArea>
          <ResumeArea to={`/resume/${userID}`}>
            <PreviewImg src={resumeData.coverImage} />
          </ResumeArea>
          <WebsiteArea to={`/website/${userID}`}>Website</WebsiteArea>
        </CreaterArea>
      ) : (
        <LoginArea />
      )}
    </Wrapper>
  );
};

export default Profile;
