import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

import DesktopLogo from "../../images/caterportfolio_homepageLogo0.png";
import ResumeEdit from "./resumeEdit.gif";
import WebsiteEdit from "./websiteEdit.gif";
import AllPortfolios from "./allPortfolios.gif";
import QusetionMark, {
  introSteps,
} from "../../utilis/usefulComponents/QusetionMark";
import { useMediaQuery } from "../../utilis/useMediaQuery";

const Wrapper = styled.div`
  width: 1080px;
  display: flex;
  flex-direction: column;
  margin: 120px auto 0;
  align-items: center;
  @media screen and (max-width: 1279px) {
    width: 90vw;
  }
`;

const SingleLayoutArea = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: center;
  margin: 60px 0;
  align-items: center;
  flex-wrap: wrap;
`;

const Hr = styled.hr`
  width: 200px;
  border-top: 3px solid #555555;
  margin: 40px 0;
`;

const LogoImg = styled.div<{ backgroundImg: string }>`
  width: 600px;
  height: 120px;
  background-image: url(${(props) => props.backgroundImg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 20px auto 60px;
  @media screen and (max-width: 1279px) {
    width: 80vw;
    margin: 20px auto 40px;
  }
`;

const IntroTextArea = styled.div`
  width: 580px;
  display: flex;
  flex-direction: column;
  padding: 50px 0 50px 200px;
  @media screen and (max-width: 1279px) {
    width: 80vw;
    margin: 20px auto;
    padding: 0;
    align-items: center;
  }
`;

const IntroText = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 5px auto;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SmallText = styled.p`
  font-size: 16px;
  margin: 2px 0;
`;

const LoginBtn = styled(Link)`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  margin: 30px auto;
  border: 2px solid;
  border-radius: 5px;
  text-decoration: none;
  color: #555555;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

const DescribeImg = styled.div<{ backgroundImg: string }>`
  width: 500px;
  height: 245px;
  background-image: url(${(props) => props.backgroundImg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 20px 0;
  @media screen and (max-width: 1279px) {
    width: 80vw;
    height: 40vw;
    margin: 20px auto;
  }
`;

const RouteBtn = styled(Link)`
  width: 170px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  border: 2px solid;
  border-radius: 5px;
  margin-top: 10px;
  text-decoration: none;
  color: #555555;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

const Homepage = () => {
  const userData = useSelector((state: RootState) => state.UserReducer);
  const { userIsLogin } = useSelector(
    (state: RootState) => state.IsPreviewReducer
  );
  const isRowBased = useMediaQuery("(min-width: 901px)");
  return (
    <Wrapper>
      <SingleLayoutArea direction="column">
        <LogoImg backgroundImg={DesktopLogo}></LogoImg>
        <IntroText>????????????????????????????????????????????????????????????????????????</IntroText>
        <LoginBtn to={userIsLogin ? `/profile/${userData.userID}` : "/login"}>
          {userIsLogin ? `??????????????????` : "???????????????????????????!"}
        </LoginBtn>
      </SingleLayoutArea>
      <SingleLayoutArea direction="row">
        <DescribeImg backgroundImg={ResumeEdit}></DescribeImg>
        <IntroTextArea>
          <Title>????????????????????????</Title>
          <SmallText>???????????????????????????</SmallText>
          <SmallText>??????????????????</SmallText>
          <SmallText>??????????????????</SmallText>
          <SmallText>??????????????????</SmallText>
          <RouteBtn to={userIsLogin ? `/resume/${userData.userID}` : "/login"}>
            {userIsLogin ? `????????????????????????` : "????????????"}
          </RouteBtn>
        </IntroTextArea>
      </SingleLayoutArea>
      <Hr />
      <SingleLayoutArea direction="row">
        <IntroTextArea>
          <Title>????????????????????????</Title>
          <SmallText>????????????????????????</SmallText>
          <SmallText>?????????????????????????????????</SmallText>
          <SmallText>??????????????????????????????????????????</SmallText>
          <RouteBtn to={userIsLogin ? `/website/${userData.userID}` : "/login"}>
            {userIsLogin ? `????????????????????????` : "????????????"}
          </RouteBtn>
        </IntroTextArea>
        <DescribeImg backgroundImg={WebsiteEdit}></DescribeImg>
      </SingleLayoutArea>
      <Hr />
      <SingleLayoutArea direction="row">
        <DescribeImg backgroundImg={AllPortfolios}></DescribeImg>
        <IntroTextArea>
          <Title>????????????</Title>
          <SmallText>?????????????????????????????????????????????</SmallText>
          <SmallText>??????????????????????????????</SmallText>
          <SmallText>????????????????????????????????????</SmallText>
          <RouteBtn to={"/allportfolios"}>????????????????????????</RouteBtn>
        </IntroTextArea>
      </SingleLayoutArea>
      <Hr />
      <SingleLayoutArea direction="column">
        <IntroText>??????????????????</IntroText>
        <IntroText>?????????????????????????????????</IntroText>
        <LoginBtn to={userIsLogin ? `/profile/${userData.userID}` : "/login"}>
          {userIsLogin ? `??????????????????` : "???????????????????????????!"}
        </LoginBtn>
      </SingleLayoutArea>
      {isRowBased ? (
        <QusetionMark
          stepType={
            userIsLogin ? introSteps.homepageLogin : introSteps.homepageLogout
          }
        />
      ) : null}
    </Wrapper>
  );
};

export default Homepage;
