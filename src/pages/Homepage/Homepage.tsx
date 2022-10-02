import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import DesktopLogo from "../../images/caterportfolio_homepageLogo0.png";
import ResumeEdit from "./resumeEdit.png";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const Wrapper = styled.div`
  width: 1080px;
  display: flex;
  flex-direction: column;
  margin: 120px auto 0;
  align-items: center;
`;

const SingleLayoutArea = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: center;
  margin: 60px 0;
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
`;

const IntroTextArea = styled.div`
  width: 580px;
  display: flex;
  flex-direction: column;
  padding: 50px 0 50px 150px;
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
  margin: 20px 10px;
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
  const isLogin = useSelector(
    (state: RootState) => state.IsPreviewReducer.userIsLogin
  );
  return (
    <Wrapper>
      <SingleLayoutArea direction="column">
        <LogoImg backgroundImg={DesktopLogo}></LogoImg>
        <IntroText>為擁有精彩經歷的您，輕鬆建立專屬的線上履歷與網站</IntroText>
        <LoginBtn to={isLogin ? `/profile/${userData.userID}` : "/login"}>
          {isLogin ? `進入個人頁面` : "點此註冊，開始體驗!"}
        </LoginBtn>
        {/* <IntroText>上架您的精彩</IntroText>
        <IntroText>讓世界看見您的別出心裁!</IntroText> */}
      </SingleLayoutArea>
      <SingleLayoutArea direction="row">
        <DescribeImg backgroundImg={ResumeEdit}></DescribeImg>
        <IntroTextArea>
          <Title>線上履歷編輯系統</Title>
          <SmallText>可自由擴充樣板內容</SmallText>
          <SmallText>編輯文字樣式</SmallText>
          <SmallText>及時預覽功能</SmallText>
          <SmallText>設定隱私模式</SmallText>
          <RouteBtn to={isLogin ? `/resume/${userData.userID}` : "/login"}>
            {isLogin ? `進入個人履歷頁面` : "點此註冊"}
          </RouteBtn>
        </IntroTextArea>
      </SingleLayoutArea>
      <Hr />
      <SingleLayoutArea direction="row">
        <IntroTextArea>
          <Title>線上網站編輯系統</Title>
          <SmallText>自由擴充樣板內容</SmallText>
          <SmallText>編輯文字樣式與圖片位置</SmallText>
          <SmallText>新增作品集子層，歸納網站內容</SmallText>
          <RouteBtn to={isLogin ? `/website/${userData.userID}` : "/login"}>
            {isLogin ? `進入個人網站頁面` : "點此註冊"}
          </RouteBtn>
        </IntroTextArea>
        <DescribeImg backgroundImg={ResumeEdit}></DescribeImg>
      </SingleLayoutArea>
      <Hr />
      <SingleLayoutArea direction="row">
        <DescribeImg backgroundImg={ResumeEdit}></DescribeImg>
        <IntroTextArea>
          <Title>社群系統</Title>
          <SmallText>查看其他創作者的網站與公開履歷</SmallText>
          <SmallText>將喜愛的內容加入收藏</SmallText>
          <SmallText>與其他創作者開啟聊天模式</SmallText>
          <RouteBtn to={"/allportfolios"}>進入作品集區探索</RouteBtn>
        </IntroTextArea>
      </SingleLayoutArea>
      <Hr />
      <SingleLayoutArea direction="column">
        <IntroText>上架您精彩的經歷</IntroText>
        <IntroText>祝您大吉大利，萬象更新</IntroText>
        <LoginBtn to={isLogin ? `/profile/${userData.userID}` : "/login"}>
          {isLogin ? `進入個人頁面` : "點此註冊，開始體驗!"}
        </LoginBtn>
      </SingleLayoutArea>
    </Wrapper>
  );
};

export default Homepage;
