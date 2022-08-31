import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import Input from "./pages/Homepage/Input";
import Portfolio from "./pages/Portfolio/Portfolio";
import Profile from "./pages/Profile/Profile";
import Resume from "./pages/Resume/Resume";
import Website from "./pages/Website/Website";

const root = ReactDOM.createRoot(document.getElementById("root")as HTMLElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Input />} />
        <Route path="profile" element={<Profile />} />
        <Route path="resume" element={<Resume />} />
        <Route path="website" element={<Website />} />
        <Route path="portfolio/:id" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
