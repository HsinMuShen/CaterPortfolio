import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "./reducers";
import { Provider } from "react-redux";

import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import AllResumes from "./pages/AllResumes/AllResumes";
import Profile from "./pages/Profile/Profile";
import FollowingArea from "./pages/Following/FollowingArea";
import Resume from "./pages/Resume/Resume";
import Website from "./pages/Website/Website";
import Portfolio from "./pages/Portfolio/Portfolio";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Login from "./pages/Login/Login";

const store = createStore(allReducers, composeWithDevTools());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="allresumes" element={<AllResumes />} />
          <Route path="login" element={<Login />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="follow/:id" element={<FollowingArea />} />
          <Route path="resume/:id" element={<Resume />} />
          <Route path="website/:id" element={<Website />} />
          <Route path="portfolio/:id" element={<Portfolio />} />
          <Route path="chatroom/:id" element={<ChatRoom />} />
          {/* <Route path="portfolio/:id" element={<Portfolio />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
