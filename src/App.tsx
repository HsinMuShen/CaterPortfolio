import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: NotoSansTC;
  }

  #root {
    min-height: 100vh;
    position: relative;

  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
