import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg } from "html-to-image";
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
  setAlert,
} from "../../action";

import firebase from "../../utilis/firebase";
import Delete from "./Delete";
import Move from "../../utilis/Move";
import AddComArea from "./AddComArea";
import SideBar from "../../utilis/SideBar";
import { resumeChoice } from "./resumeComponents";
import { ResumeComponents } from "./resumeComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

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
  };
  const uploadResume = async () => {
    htmlToImage.toPng(refPhoto.current!).then(function (dataUrl) {
      console.log(dataUrl);
    });
    // html2canvas(refPhoto.current!).then(async function (canvas) {
    //   const dataUrl = canvas.toDataURL("image/png");
    //   dispatch(resumeAddSetting("coverImage", dataUrl));
    //   const tempData = resumeData;
    //   tempData.coverImage = dataUrl;
    //   try {
    //     await firebase.uploadDoc("resumes", `${resumeID}`, tempData);
    //     dispatch(setAlert({ isAlert: true, text: "成功更新履歷!" }));
    //     setTimeout(() => {
    //       dispatch(setAlert({ isAlert: false, text: "" }));
    //     }, 3000);
    //   } catch (e) {
    //     dispatch(setAlert({ isAlert: true, text: `${e}` }));
    //     setTimeout(() => {
    //       dispatch(setAlert({ isAlert: false, text: "" }));
    //     }, 3000);
    //   }
    // });
  };
  const getCoverImage = () => {
    html2canvas(refPhoto.current!).then(function (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      dispatch(resumeAddSetting("coverImage", dataUrl));
    });
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
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
      } else {
        dispatch(resumeAddSetting("name", userData.name));
        dispatch(resumeAddSetting("userID", userData.userID));
        dispatch(resumeAddSetting("userImage", userData.userImg));
      }
    };
    loadResume();
    return () => {
      dispatch(isPreviewTrue("resume"));
    };
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
                          key={content.id}
                          draggableId={content.id}
                          index={index}
                        >
                          {(provided) => (
                            <SineleComponent
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <TempCom index={index} content={content} />
                              <Delete
                                addDeleteCom={addDeleteCom}
                                index={index}
                              />
                              <MoveBtn {...provided.dragHandleProps}>
                                {isPreview ? null : (
                                  <FontAwesomeIcon icon={faUpDownLeftRight} />
                                )}
                              </MoveBtn>
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
          <UpoloadBtn onClick={uploadResume} width={"120px"}>
            送出!
          </UpoloadBtn>
        ) : (
          <UpoloadBtn
            onClick={() => {
              dispatch(isPreviewTrue("resume"));
            }}
            width={"200px"}
          >
            確定完成編輯? 預覽檢查
          </UpoloadBtn>
        )}

        <ToProfileLink to={`/profile/${resumeID}`}>
          <FontAwesomeIcon
            icon={faUserAstronaut}
            style={{ marginRight: "10px" }}
          />
          前往{resumeData.name}的個人頁面
        </ToProfileLink>
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
  margin: 120px 0;
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

const MoveBtn = styled.div`
  position: absolute;
  right: 4.5px;
  top: 30px;
  font-size: 20px;
`;

const UpoloadBtn = styled.div<{ width: string }>`
  display: flex;
  justify-content: center;
  width: ${(props) => props.width};
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

const ToProfileLink = styled(Link)`
  margin: 40px 0 20px;
  text-decoration: none;
  color: #ffffff;
  background-color: #555555;
  border: 1px solid;
  padding: 8px;
  border-radius: 5px;
`;
