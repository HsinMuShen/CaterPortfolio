import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <Wrapper>
      <ResumeArea to={`/resume`}>Resume</ResumeArea>
      <WebsiteArea to={`/website`}>Website</WebsiteArea>
    </Wrapper>
  );
};

export default Profile;
