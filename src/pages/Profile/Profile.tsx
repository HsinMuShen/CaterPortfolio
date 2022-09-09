import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
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
  height: 800px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WebsiteArea = styled(Link)`
  width: 600px;
  height: 800px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Profile: React.FC = () => {
  const userID = useParams().id;
  return (
    <Wrapper>
      <LoginArea />
      <CreaterArea>
        <ResumeArea to={`/resume/${userID}`}>Resume</ResumeArea>
        <WebsiteArea to={`/website/${userID}`}>Website</WebsiteArea>
      </CreaterArea>
    </Wrapper>
  );
};

export default Profile;
