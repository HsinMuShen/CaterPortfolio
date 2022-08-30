import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import Input from "./pages/Profile/Input";
import Portfolio from "./pages/Portfolio/Portfolio";

const root = ReactDOM.createRoot(document.getElementById("root")as HTMLElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Input />} />
        <Route path="portfolio/:id" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
