import React from "react";
import styled, { keyframes } from "styled-components";

import Fish from "../images/fish.png";

const float = keyframes`{
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(40px);
	}
	100% {
		transform: translatey(0px);
	}
}`;
const swim = keyframes`{
	0% {margin-left: -400px}
	80% {margin-left: 100%;}
	100% {margin-left: 100%;}
}`;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  flex-direction: column;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
`;

const Logo = styled.img<{ delay: string }>`
  position: absolute;
  top: 45%;
  color: #333333;
  text-decoration: none;
  width: 80px;
  height: 45px;
  object-fit: contain;
  margin: 0 0px 0 20px;
  animation: ${float} 2s ease-in-out infinite, ${swim} 8s linear infinite;
  animation-delay: ${(props) => props.delay};
`;

const LoadingP = styled.p`
  position: absolute;
  top: 45%;
  color: #333333;
  font-size: 40px;
  animation: ${float} 2s ease-in-out infinite, ${swim} 8s linear infinite;
  animation-delay: -2s;
`;

const Loading = () => {
  return (
    <Wrapper>
      <Logo src={Fish} delay={"0s"}></Logo>
      <Logo src={Fish} delay={"-0.4s"}></Logo>
      <Logo src={Fish} delay={"-2.2s"}></Logo>
      <Logo src={Fish} delay={"-3s"}></Logo>
    </Wrapper>
  );
};

export default Loading;
