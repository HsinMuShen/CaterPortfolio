import React from "react";
import styled, { keyframes } from "styled-components";
import LogoImg from "../../images/caterportfolio_logo.png";

const spin = keyframes`{
	100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); }
}`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const Logo = styled.img`
  color: #333333;
  text-decoration: none;
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin: 20px;
  animation: ${spin} 4s linear infinite;
  opacity: 0.6;
`;

const Loading = () => {
  return (
    <Wrapper>
      <Logo src={LogoImg}></Logo>
    </Wrapper>
  );
};

export default Loading;
