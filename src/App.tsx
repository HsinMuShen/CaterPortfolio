import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: NotoSansTC;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
};

export default App;
