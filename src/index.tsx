import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "./reducers";
import { Provider } from "react-redux";

import App from "./App";
import Input from "./pages/Homepage/Input";
import Profile from "./pages/Profile/Profile";
import Resume from "./pages/Resume/Resume";
import Website from "./pages/Website/Website";
import CreatePortfolio from "./pages/Portfolio/CreatePortfolio";

const store = createStore(allReducers, composeWithDevTools());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Input />} />
          <Route path="profile" element={<Profile />} />
          <Route path="resume" element={<Resume />} />
          <Route path="website" element={<Website />} />
          <Route path="website/preview" element={<Website />} />
          <Route path="createportfolio" element={<CreatePortfolio />} />
          {/* <Route path="portfolio/:id" element={<Portfolio />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
