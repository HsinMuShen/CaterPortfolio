import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { resumeAddCom, resumeDeleteCom } from "../../action";

import firebase from "../../utilis/firebase";

import ResumeCom1 from "./ResumeComponents/ResumeCom1";
import ResumeCom2 from "./ResumeComponents/ResumeCom2";
import ResumeCom3 from "./ResumeComponents/ResumeCom3";

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

const ResumeBtn = styled.button`
  width: 200px;
`;

const resumeChoice = [
  {
    name: 0,
    comIndex: 0,
  },
  {
    name: 1,
    comIndex: 1,
  },
  { name: 2, comIndex: 2 },
];

const Resume: React.FC = () => {
  const [resumeCom, setResumeCom] = useState<number[]>([0, 1, 2]);
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);
  const dispatch = useDispatch();

  const addResumeCom = (conIndex: number) => {
    dispatch(resumeAddCom());
    setResumeCom([...resumeCom, conIndex]);
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

  return (
    <Wrapper>
      <ResumeEditor>
        <ResumeHeader>
          {resumeCom.map((num, index) => {
            switch (num) {
              case 0: {
                return (
                  <SineleComponent key={index}>
                    <ResumeCom1 index={index} />
                    <button
                      onClick={() => {
                        addDeleteCom(index);
                      }}
                    >
                      delete
                    </button>
                  </SineleComponent>
                );
              }
              case 1: {
                return (
                  <SineleComponent key={index}>
                    <ResumeCom2 index={index} />
                    <button
                      onClick={() => {
                        addDeleteCom(index);
                      }}
                    >
                      delete
                    </button>
                  </SineleComponent>
                );
              }
              case 2: {
                return (
                  <SineleComponent key={index}>
                    <ResumeCom3 index={index} />
                    <button
                      onClick={() => {
                        addDeleteCom(index);
                      }}
                    >
                      delete
                    </button>
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
      <div dangerouslySetInnerHTML={{ __html: resumeData.content[0].text }} />
    </Wrapper>
  );
};

export default Resume;
