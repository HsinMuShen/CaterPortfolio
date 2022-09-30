import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Alert from "./components/Alert";

import PingFangTCRegular from "./fonts/PingFang-TC-Regular-2.otf";
import PingFangTCThin from "./fonts/PingFang-TC-Thin-2.otf";
import NotoSansTCRegular from "./fonts/NotoSansTC-Regular.otf";
import NotoSansTCBold from "./fonts/NotoSansTC-Bold.otf";
import { setHomepageList } from "./action";

const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCThin}) format('opentype');
    font-weight: 100;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCBold}) format('opentype');
    font-weight: bold;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  }

  body {
    font-family: NotoSansTC;
    background-color: #E7E7E799;
  }




  hr {
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2px 0;
  }


  ul,
  ol {
    padding: 0 25px;
    margin: 3px 8px;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 3px 8px;
  }

  .ProseMirror p {
  margin: 3px 8px;
}
`;

const App: React.FC = () => {
  const homepageList: number[] = [];
  const numbers = [27, 36, 45, 48];
  const dispatch = useDispatch();

  const random = (numbers: number[]) => {
    return numbers[Math.floor(Math.random() * numbers.length)];
  };
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      homepageList.push(random(numbers));
    }
    dispatch(setHomepageList(homepageList));
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Alert />
      <Outlet />
    </>
  );
};

export default App;
