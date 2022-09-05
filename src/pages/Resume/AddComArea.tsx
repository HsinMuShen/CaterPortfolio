import React from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";

import { resumeChoice } from "./Resume";

const ResumeBtn = styled.button`
  width: 200px;
`;

const AddComArea = ({
  addResumeCom,
  uploadResume,
}: {
  addResumeCom: (conIndex: number) => void;
  uploadResume: () => void;
}) => {
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.resume
  );
  return isPreview ? null : (
    <>
      <p>新增圖文內容</p>
      <div>
        {resumeChoice.map((item) => {
          return (
            <button
              key={item.name}
              onClick={() => {
                addResumeCom(item.comIndex);
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <ResumeBtn onClick={uploadResume}>送出!</ResumeBtn>
    </>
  );
};

export default AddComArea;
