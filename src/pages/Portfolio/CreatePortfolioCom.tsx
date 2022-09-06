import React from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";

import { portfolioChoice } from "./Portfolio";

const ResumeBtn = styled.button`
  width: 200px;
`;

const CreatePortfolioCom = ({
  addWebsiteCom,
  uploadWebsite,
}: {
  addWebsiteCom: (conIndex: number) => void;
  uploadWebsite: () => void;
}) => {
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.resume
  );
  return isPreview ? null : (
    <>
      <p>新增圖文內容</p>
      <div>
        {portfolioChoice.map((item) => {
          return (
            <button
              key={item.name}
              onClick={() => {
                addWebsiteCom(item.comIndex);
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <ResumeBtn onClick={uploadWebsite}>上架作品集!</ResumeBtn>
    </>
  );
};

export default CreatePortfolioCom;
