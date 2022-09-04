import React from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";

import { websiteChoice } from "./Website";

const ResumeBtn = styled.button`
  width: 200px;
`;

const AddWebsiteCom = ({
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
        {websiteChoice.map((item) => {
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
      <ResumeBtn onClick={uploadWebsite}>上架網站!</ResumeBtn>
    </>
  );
};

export default AddWebsiteCom;
