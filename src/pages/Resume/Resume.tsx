import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  resumeAddCom,
  resumeDeleteCom,
  resumeLoading,
  resumeAddSetting,
  isPreviewResume,
  isPreviewTrue,
} from "../../action";

import firebase from "../../utilis/firebase";
import Delete from "./Delete";
import AddComArea from "./AddComArea";
import SideBar from "../../utilis/SideBar";
import { resumeChoice } from "./resumeComponents";

import { ResumeComponents } from "./resumeComponents";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
`;

const ResumeEditor = styled.div`
  position: relative;
  width: 960px;
  margin: 60px auto;
  border: 1px solid;
  border-radius: 5px;
  padding: 30px 40px;
  background-color: #ffffff;
`;

const PreviewDiv = styled.div`
  position: absolute;
  /* border: 1px solid; */
  width: 880px;
  height: 100%;
  z-index: 2;
`;

const ResumeHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 880px;
`;

const SineleComponent = styled.div`
  display: flex;
  width: 880px;
  position: relative;
  margin: 10px 0;
`;

const ToProfileLink = styled(Link)``;

export interface resumeComContent {
  image: string[];
  text: string[];
  type: number;
  comName: string;
}

const Resume: React.FC = () => {
  const [resumeCom, setResumeCom] = useState<resumeComContent[]>([]);
  const refPhoto = useRef<HTMLDivElement>(null);
  const resumeID = useParams().id;
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);
  let isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.resume
  );
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  const addResumeCom = (comIndex: number) => {
    console.log(resumeChoice);
    dispatch(resumeAddCom(resumeChoice[comIndex].comContent));
    setResumeCom([...resumeCom, resumeChoice[comIndex].comContent]);
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(resumeDeleteCom(deleteIndex));
    const tempArr = [...resumeCom];
    tempArr.splice(deleteIndex, 1);
    setResumeCom(tempArr);
  };
  const uploadResume = async () => {
    firebase.uploadDoc("resumes", `${resumeID}`, resumeData);
  };
  const getCoverImage = () => {
    html2canvas(refPhoto.current!).then(function (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      console.log(dataUrl);
      dispatch(resumeAddSetting("coverImage", dataUrl));
    });
  };

  useEffect(() => {
    const loadResume = async () => {
      const resumeData = await firebase.readData("resumes", `${resumeID}`);
      if (resumeData) {
        dispatch(resumeLoading(resumeData));
        const tempArr: resumeComContent[] = [];
        resumeData.content.forEach(
          (content: {
            image: string[];
            text: string[];
            type: number;
            comName: string;
          }) => {
            tempArr.push(content);
          }
        );
        setResumeCom(tempArr);
      } else {
        dispatch(resumeAddSetting("name", userData.name));
        dispatch(resumeAddSetting("userID", userData.userID));
      }
    };
    loadResume();
  }, [userData]);

  return (
    <>
      <Wrapper>
        {resumeID === userData.userID ? (
          <button
            onClick={() => {
              dispatch(isPreviewResume());
            }}
          >
            編輯/預覽
          </button>
        ) : null}

        <ResumeEditor ref={refPhoto}>
          <PreviewDiv style={{ zIndex: isPreview ? "2" : "-1" }}></PreviewDiv>
          <ResumeHeader>
            {resumeCom?.map((content, index) => {
              const TempCom =
                ResumeComponents[
                  content.comName as keyof typeof ResumeComponents
                ];
              return (
                <SineleComponent key={index}>
                  <TempCom index={index} content={content} />
                  <Delete addDeleteCom={addDeleteCom} index={index} />
                </SineleComponent>
              );
            })}
          </ResumeHeader>
          <AddComArea addResumeCom={addResumeCom} uploadResume={uploadResume} />
        </ResumeEditor>

        <div
          onClick={() => {
            getCoverImage();
            dispatch(isPreviewTrue("resume"));
          }}
        >
          確定完成編輯? 預覽看看吧
        </div>
        <ToProfileLink to={`/profile`}>profile</ToProfileLink>
      </Wrapper>
      <SideBar type={"resume"} data={resumeData} />
    </>
  );
};

export default Resume;
