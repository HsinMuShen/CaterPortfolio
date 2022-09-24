import React, { useState } from "react";
import styled from "styled-components";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const QusetionMarkWrapper = styled.div`
  position: fixed;
  top: 9px;
  right: 175px;
  font-size: 28px;
  color: #333333;
  cursor: pointer;
  z-index: 6;
`;

interface State {
  run: boolean;
  steps: Step[];
}

const QusetionMark = ({ stepType }: { stepType: Step[] }) => {
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: stepType,
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setState({
      run: true,
      steps,
    });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false, steps });
    }
  };

  return (
    <QusetionMarkWrapper onClick={handleClickStart}>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: style.options,
        }}
      />

      <FontAwesomeIcon icon={faCircleQuestion} />
    </QusetionMarkWrapper>
  );
};

export default QusetionMark;

const style = {
  options: {
    zIndex: 11,
    color: "#555555",
    primaryColor: "#555555",
    arrowColor: "#456673",
  },
};

export const introSteps: {
  homepageLogin: Step[];
  homepageLogout: Step[];
  profileUser: Step[];
  profileOthers: Step[];
} = {
  homepageLogin: [
    {
      content: "歡迎來到Caterportfolio!",
      placement: "center",
      target: "body",
      disableBeacon: true,
    },
    {
      content: "點擊Logo! 回到首頁",
      target: "#logo",
      placement: "bottom",
    },
    {
      content: "點擊CaterPortfolio! 查看所有作品集!",
      target: "#allPortfolios",
      placement: "bottom",
    },
    {
      content: "點擊All Resumes! 查看所有履歷!",
      target: "#allResumes",
      placement: "bottom",
    },
    {
      content: "輸入關鍵字可以找尋到符合標題與創作者姓名的作品集",
      target: "#searchBtn",
      placement: "bottom",
    },
    {
      content: "點擊可進入聊天室",
      target: "#chatroomIcon",
      placement: "bottom",
    },
    {
      content: "點擊可開啟個人側邊欄",
      target: "#profileIcon",
      placement: "bottom",
    },
    {
      content: "作品集區，點擊單一作品集可以進入該作品集頁面",
      target: "#portfoliosContainer",
      placement: "top-start",
    },
  ],
  homepageLogout: [
    {
      content: "歡迎來到Caterportfolio!",
      placement: "center",
      target: "body",
      disableBeacon: true,
    },
    {
      content: "點擊Logo! 回到首頁",
      target: "#logo",
      placement: "bottom",
    },
    {
      content: "點擊CaterPortfolio! 查看所有作品集!",
      target: "#allPortfolios",
      placement: "bottom",
    },
    {
      content: "點擊All Resumes! 查看所有履歷!",
      target: "#allResumes",
      placement: "bottom",
    },
    {
      content: "輸入關鍵字可以找尋到符合標題與創作者姓名的作品集",
      target: "#searchBtn",
      placement: "bottom",
    },
    {
      content: "點擊可進入登入註冊頁面",
      target: "#login",
      placement: "bottom",
    },
    {
      content: "作品集區，點擊單一作品集可以進入該作品集頁面",
      target: "#portfoliosContainer",
      placement: "top-start",
    },
  ],
  profileUser: [
    {
      content: "點擊編輯個人基本資料",
      placement: "bottom",
      target: "#editProfileData",
      disableBeacon: true,
    },
    {
      content: "點擊進入追蹤名單頁面",
      target: "#checkFollowingList",
      placement: "bottom",
    },
    {
      content: "點擊進入履歷編輯頁面",
      target: "#resumeArea",
      placement: "bottom",
    },
    {
      content: "點擊進入網站編輯頁面",
      target: "#websiteArea",
      placement: "bottom",
    },
  ],
  profileOthers: [
    {
      content: "點擊追蹤這位創作者",
      placement: "bottom",
      target: "#followButton",
      disableBeacon: true,
    },
    {
      content: "點擊與這位創作者對話",
      target: "#chatroomButton",
      placement: "bottom",
    },
    {
      content: "點擊查看這位創作者的追蹤名單",
      target: "#checkFollowingList",
      placement: "bottom",
    },
    {
      content: "點擊查看這位創作者的履歷",
      target: "#resumeArea",
      placement: "bottom",
    },
    {
      content: "點擊查看這位創作者的網站",
      target: "#websiteArea",
      placement: "bottom",
    },
  ],
};
