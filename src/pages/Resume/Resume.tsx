import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";

import firebase from "../../utilis/firebase";

import ResumeCom1 from "./ResumeComponents/ResumeCom1";
import ResumeCom2 from "./ResumeComponents/ResumeCom2";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResumeEditor = styled.div`
  width: 960px;
  margin: 60px auto;
  border: 1px solid;
  border-radius: 15px;
  padding: 20px 40px;
`;
const ResumeHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const ImagePreview = styled.div<{ previewUrl: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: solid 1px black;
  border-radius: 90px;
  background-position: center;
  background-image: url(${(props) => props.previewUrl});
  background-size: cover;
`;
const ImageLabel = styled.label`
  font-size: 150%;
  cursor: pointer;
`;
const ImageInput = styled.input`
  display: none;
`;

const ResumeBody = styled.div``;

const ResumeFooter = styled.div``;

const ResumeBtn = styled.button`
  width: 200px;
`;

const HeaderForm = [
  {
    placeholder: "姓名",
    key: "name",
  },
  {
    placeholder: "職業",
    key: "profession",
  },
  {
    placeholder: "地區",
    key: "region",
  },
  {
    placeholder: "email",
    key: "電子郵件",
  },
];

const Resume: React.FC = () => {
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);

  const uploadResume = async () => {
    firebase.uploadDoc("resumes", resumeData);
  };

  return (
    <Wrapper>
      <ResumeEditor>
        <ResumeHeader>
          <ResumeCom1 index={0} />
          <ResumeCom2 index={1} />
        </ResumeHeader>
        <ResumeBody></ResumeBody>
        <ResumeFooter></ResumeFooter>
      </ResumeEditor>
      <p>新增圖文內容</p>
      <div>
        <button>1</button>
        <button>2</button>
      </div>
      <ResumeBtn onClick={uploadResume}>送出!</ResumeBtn>
      <div dangerouslySetInnerHTML={{ __html: resumeData.content[0].text }} />
    </Wrapper>
  );
};

export default Resume;
