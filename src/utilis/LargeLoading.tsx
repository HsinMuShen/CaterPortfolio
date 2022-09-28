import React from "react";
import styled, { keyframes } from "styled-components";
import LogoImg from "../images/caterportfolio_logo.png";

const spin = keyframes`{
	100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); }
}`;

const Wrapper = styled.div<{ backgroundColor: string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-color: ${(props) => props.backgroundColor};
  top: 60px;
  left: 0;
`;

const Logo = styled.img`
  color: #333333;
  text-decoration: none;
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 60px;
  animation: ${spin} 4s linear infinite;
  opacity: 0.6;
`;

const LargeLoading = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Logo src={LogoImg}></Logo>
    </Wrapper>
  );
};

export default LargeLoading;
