import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  resumeAddCom,
  resumeDeleteCom,
  resumeLoading,
  isPreviewResume,
} from "../../action";

import firebase from "../../utilis/firebase";
import ResumeCom1 from "./ResumeComponents/ResumeCom1";
import ResumeCom2 from "./ResumeComponents/ResumeCom2";
import ResumeCom3 from "./ResumeComponents/ResumeCom3";
import Delete from "./Delete";
import AddComArea from "./AddComArea";
import preImage from "../../utilis/cat.jpg";

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

const SineleComponent = styled.div`
  display: flex;
`;

const ResumeBody = styled.div``;

const ResumeFooter = styled.div``;

const ToProfileLink = styled(Link)``;

export interface resumeComContent {
  image: string[];
  text: string[];
  type: number;
}

export const resumeChoice = [
  {
    name: 0,
    comIndex: 0,
    comContent: {
      image: [preImage],
      text: ["<h2>姓名</h2><p>Email</p><p>聯絡資訊</p>"],
      type: 0,
    },
  },
  {
    name: 1,
    comIndex: 1,
    comContent: {
      image: [preImage, preImage, preImage],
      text: [],
      type: 1,
    },
  },
  {
    name: 2,
    comIndex: 2,
    comContent: {
      image: [],
      text: ["<h3>標題</h3><p>您的英勇事蹟</p><p>您的英勇事蹟</p>"],
      type: 2,
    },
  },
];

const Resume: React.FC = () => {
  const [resumeCom, setResumeCom] = useState<resumeComContent[]>([]);
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.resume
  );

  const dispatch = useDispatch();

  const addResumeCom = (conIndex: number) => {
    dispatch(resumeAddCom(resumeChoice[conIndex].comContent));
    setResumeCom([...resumeCom, resumeChoice[conIndex].comContent]);
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(resumeDeleteCom(deleteIndex));
    const tempArr = [...resumeCom];
    tempArr.splice(deleteIndex, 1);
    console.log(tempArr);
    setResumeCom(tempArr);
  };
  const uploadResume = async () => {
    firebase.uploadDoc("resumes", resumeData);
  };

  useEffect(() => {
    const loadResume = async () => {
      const resumeData = await firebase.readData(
        "resumes",
        "Xvbmt52vwx9RzFaXE17L"
      );
      if (resumeData) {
        dispatch(resumeLoading(resumeData));
        const tempArr: resumeComContent[] = [];
        resumeData.content.forEach(
          (content: { image: string[]; text: string[]; type: number }) => {
            tempArr.push(content);
          }
        );
        setResumeCom(tempArr);
      }
    };
    loadResume();
  }, []);

  return (
    <Wrapper>
      <button
        onClick={() => {
          dispatch(isPreviewResume());
        }}
      >
        編輯/預覽
      </button>
      <ResumeEditor>
        <ResumeHeader>
          {resumeCom.map((content, index) => {
            switch (content.type) {
              case 0: {
                return (
                  <SineleComponent key={index}>
                    <ResumeCom1 index={index} content={content} />
                    <Delete addDeleteCom={addDeleteCom} index={index} />
                  </SineleComponent>
                );
              }
              case 1: {
                return (
                  <SineleComponent key={index}>
                    <ResumeCom2 index={index} content={content} />
                    <Delete addDeleteCom={addDeleteCom} index={index} />
                  </SineleComponent>
                );
              }
              case 2: {
                return (
                  <SineleComponent key={index}>
                    <ResumeCom3 index={index} content={content} />
                    <Delete addDeleteCom={addDeleteCom} index={index} />
                  </SineleComponent>
                );
              }
              default:
                return null;
            }
          })}
        </ResumeHeader>
        <ResumeBody></ResumeBody>
        <ResumeFooter></ResumeFooter>
      </ResumeEditor>
      <AddComArea addResumeCom={addResumeCom} uploadResume={uploadResume} />

      <ToProfileLink to={`/profile`}>profile</ToProfileLink>
    </Wrapper>
  );
};

export default Resume;
