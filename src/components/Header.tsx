import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #000000;
  display: flex;
`;

const Tag = styled(Link)`
  color: #ffffff;
  margin: 20px;
`;

const Header = () => {
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <Tag to={`/`}>CaterPortfolio</Tag>
      <Tag to={`/profile/${localStorage.getItem("userID")}`}>profile</Tag>
      <Tag to={`/resume/${localStorage.getItem("userID")}`}>Resume</Tag>
      <Tag to={`/website/${localStorage.getItem("userID")}`}>Website</Tag>
    </Wrapper>
  );
};

export default Header;
