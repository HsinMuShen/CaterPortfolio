import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  resumeAddCom,
  resumeDeleteCom,
  resumeLoading,
  resumeAddSetting,
  resumeRenewContent,
  isPreviewResume,
  isPreviewTrue,
} from "../../action";

import firebase from "../../utilis/firebase";
import Delete from "./Delete";
import AddComArea from "./AddComArea";
import SideBar from "../../utilis/SideBar";
import { resumeChoice } from "./resumeComponents";
import { ResumeComponents } from "./resumeComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";

export interface resumeComContent {
  image: string[];
  text: string[];
  type: number;
  comName: string;
  id: string;
}

const Resume: React.FC = () => {
  const refPhoto = useRef<HTMLDivElement>(null);
  const resumeID = useParams().id;
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);
  let isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.resume
  );
  const userData = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  const addResumeCom = (comIndex: number) => {
    dispatch(resumeAddCom(resumeChoice[comIndex].comContent));
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(resumeDeleteCom(deleteIndex));
    const tempArr = [...resumeData.content];
    tempArr.splice(deleteIndex, 1);
  };
  const uploadResume = async () => {
    html2canvas(refPhoto.current!).then(function (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      dispatch(resumeAddSetting("coverImage", dataUrl));
      const tempData = resumeData;
      tempData.coverImage = dataUrl;
      console.log(tempData);
      firebase.uploadDoc("resumes", `${resumeID}`, tempData);
    });
  };
  const getCoverImage = () => {
    html2canvas(refPhoto.current!).then(function (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      dispatch(resumeAddSetting("coverImage", dataUrl));
    });
  };

  const handleOnDragEnd = (result: any) => {
    const items: resumeComContent[] = [...resumeData.content];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(resumeRenewContent(items));
  };

  useEffect(() => {
    const loadResume = async () => {
      const resumeData = await firebase.readData("resumes", `${resumeID}`);
      if (resumeData) {
        dispatch(resumeLoading(resumeData));
        const tempArr: resumeComContent[] = [];
        resumeData.content.forEach((content: resumeComContent) => {
          tempArr.push(content);
        });
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
          <PreviewBtn
            onClick={() => {
              dispatch(isPreviewResume());
            }}
          >
            {isPreview ? (
              <>
                <FontAwesomeIcon icon={faPen} />
                <span> 編輯</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faEye} />
                <span> 預覽</span>
              </>
            )}
          </PreviewBtn>
        ) : null}

        <ResumeEditor ref={refPhoto}>
          <PreviewDiv style={{ zIndex: isPreview ? "2" : "-1" }}></PreviewDiv>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ResumeHeader
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {resumeData.content?.map(
                    (content: resumeComContent, index: number) => {
                      const TempCom =
                        ResumeComponents[
                          content.comName as keyof typeof ResumeComponents
                        ];

                      return (
                        <Draggable
                          key={index + content.id}
                          draggableId={index + content.id}
                          index={index}
                        >
                          {(provided) => (
                            <SineleComponent
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <TempCom index={index} content={content} />
                              <Delete
                                addDeleteCom={addDeleteCom}
                                index={index}
                              />
                            </SineleComponent>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </ResumeHeader>
              )}
            </Droppable>
          </DragDropContext>
          <AddComArea addResumeCom={addResumeCom} uploadResume={uploadResume} />
        </ResumeEditor>

        {isPreview ? (
          <UpoloadBtn onClick={uploadResume}>送出!</UpoloadBtn>
        ) : (
          <div
            onClick={() => {
              dispatch(isPreviewTrue("resume"));
            }}
          >
            確定完成編輯? 預覽檢查
          </div>
        )}

        <ToProfileLink to={`/profile`}>profile</ToProfileLink>
      </Wrapper>
      <SideBar type={"resume"} data={resumeData} />
    </>
  );
};

export default Resume;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
`;

const PreviewBtn = styled.div`
  position: fixed;
  top: 180px;
  right: 25px;
  background-color: #ffffff;
  padding: 5px 8px;
  border-radius: 10px;
  border: 1px solid;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
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

const UpoloadBtn = styled.div`
  display: flex;
  justify-content: center;
  width: 120px;
  background-color: #ffffff;
  padding: 5px 8px;
  border-radius: 10px;
  border: 1px solid;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

const ToProfileLink = styled(Link)``;
