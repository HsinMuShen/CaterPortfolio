import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
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
      <ResumeArea to={`/resume/${userID}`}>Resume</ResumeArea>
      <WebsiteArea to={`/website/${userID}`}>Website</WebsiteArea>
    </Wrapper>
  );
};

export default Profile;
