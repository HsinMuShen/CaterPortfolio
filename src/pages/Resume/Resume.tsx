import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as htmlToImage from "html-to-image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";

import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  resumeAddCom,
  resumeDeleteCom,
  resumeLoading,
  resumeAddSetting,
  resumeRenewContent,
} from "../../action/ResumeReducerAction";
import { isPreviewTrue } from "../../action/IsPreviewReducerAction";

import firebase from "../../utilis/firebase";
import Loading from "../../utilis/Loading";
import LargeLoading from "../../utilis/LargeLoading";
import PreviewBtn from "../../utilis/PreviewBtn";
import Delete from "./Delete";
import AddComArea from "./AddComArea";
import SideBar from "../../utilis/SideBar";
import QusetionMark, { introSteps } from "../../utilis/QusetionMark";
import { resumeChoice } from "./resumeComponents";
import { ResumeComponents } from "./resumeComponents";
import useAlertCalling from "../../components/useAlertCalling";
import {
  LinkButton,
  UploadButton,
  MoveBtn,
  PreviewDiv,
  SingleComponentUnit,
  EditContentLayout,
} from "../../utilis/styledExtending";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 0;
`;

const ResumeEditArea = styled.div`
  position: relative;
  width: 960px;
  margin: 60px auto;
  border: 1px solid;
  border-radius: 5px;
  padding: 30px 40px;
  background-color: #ffffff;
  @media screen and (max-width: 1280px) {
    width: 85vw;
    padding: 10px;
  }
`;

const ResumePreviewDiv = styled(PreviewDiv)`
  width: 880px;
  @media screen and (max-width: 1280px) {
    width: 85vw;
  }
`;

const ResumeEditContentLayout = styled(EditContentLayout)`
  width: 880px;
  @media screen and (max-width: 1279px) {
    width: 75vw;
  }
`;

const SingleComponent = styled(SingleComponentUnit)`
  width: 880px;
  @media screen and (max-width: 1279px) {
    width: 80vw;
  }
`;

const FinalEditArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PublicSetArea = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;

const PublicSetText = styled.p`
  margin: 0 20px;
`;

const ResumeUpoloadBtn = styled(UploadButton)<{
  width: string;
  backgroundColor: string;
}>`
  width: ${(props) => props.width};
  background-color: ${(props) => props.backgroundColor};
  margin: 20px 0;
`;

export interface resumeComContent {
  image: string[];
  text: string[];
  comName: string;
  id: string;
}

const Resume: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLargeLoading, setIsLargeLoading] = useState<boolean>(false);
  const refPhoto = useRef<HTMLDivElement>(null);
  const resumeID = useParams().id;
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);
  const userData = useSelector((state: RootState) => state.UserReducer);
  let isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.resume
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { startAlert } = useAlertCalling();

  const addResumeCom = (comIndex: number) => {
    dispatch(resumeAddCom(resumeChoice[comIndex]));
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(resumeDeleteCom(deleteIndex));
  };

  const changePublicMode = () => {
    dispatch(resumeAddSetting("isPublic", !resumeData.isPublic));
  };

  const uploadResume = async () => {
    setIsLargeLoading(true);
    htmlToImage
      .toPng(refPhoto.current!)
      .then(async (dataUrl) => {
        dispatch(resumeAddSetting("coverImage", dataUrl));
        const tempData = { ...resumeData };
        tempData.coverImage = dataUrl;
        try {
          await firebase.uploadDoc("resumes", `${resumeID}`, tempData);
          setIsLargeLoading(false);
          startAlert("成功更新履歷!");
        } catch (e) {
          startAlert("履歷更新失敗!");
        }
      })
      .catch(async () => {
        await firebase.uploadDoc("resumes", `${resumeID}`, resumeData);
        setIsLargeLoading(false);
        startAlert("成功更新履歷!");
      });
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items: resumeComContent[] = [...resumeData.content];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(resumeRenewContent(items));
  };

  useEffect(() => {
    const loadResume = async () => {
      setIsLoading(true);
      const resumeData = await firebase.readData("resumes", `${resumeID}`);
      if (resumeData) {
        dispatch(resumeLoading(resumeData));
      } else {
        if (resumeID !== userData.userID) {
          startAlert("查無結果，請確定網址輸入正確");
          navigate(`/`);
        } else {
          dispatch(
            resumeLoading({
              title: "",
              coverImage: "",
              content: [],
              name: userData.name,
              followers: [],
              tags: [],
              time: null,
              userID: userData.userID,
              userImage: userData.userImage,
              isPublic: false,
            })
          );
        }
      }
      setIsLoading(false);
    };
    loadResume();
    return () => {
      dispatch(isPreviewTrue("resume"));
    };
  }, [userData.userID, resumeID]);

  return (
    <Wrapper>
      <ResumeEditArea>
        <ResumePreviewDiv
          style={{ zIndex: isPreview ? "2" : "-1" }}
        ></ResumePreviewDiv>
        {isLoading ? (
          <Loading />
        ) : resumeID !== userData.userID && !resumeData.isPublic ? (
          "履歷不公開"
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div ref={refPhoto}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ResumeEditContentLayout
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {resumeData.content.length === 0 ? (
                      <p style={{ margin: "0 auto" }}>尚未建立履歷</p>
                    ) : null}

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
                              <SingleComponent
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
                              </SingleComponent>
                            )}
                          </Draggable>
                        );
                      }
                    )}
                    {provided.placeholder}
                  </ResumeEditContentLayout>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        )}

        <AddComArea addResumeCom={addResumeCom} uploadResume={uploadResume} />
      </ResumeEditArea>

      {isPreview ? null : (
        <FinalEditArea>
          <PublicSetArea>
            <PublicSetText>
              {resumeData.isPublic
                ? "目前履歷為公開模式，是否要切換為隱私模式?"
                : "目前履歷為隱私模式，是否要切換為公開模式?"}
            </PublicSetText>
            <ResumeUpoloadBtn
              width="100px"
              backgroundColor="none"
              onClick={changePublicMode}
            >
              {resumeData.isPublic ? "設為隱私" : "設為公開"}
            </ResumeUpoloadBtn>
          </PublicSetArea>
          <ResumeUpoloadBtn
            onClick={() => {
              if (resumeData.content.length === 0) {
                startAlert("請先新增內容再將履歷儲存!");
              } else {
                dispatch(isPreviewTrue("resume"));
                uploadResume();
              }
            }}
            width="160px"
            backgroundColor="#ffffff"
            className="resumeUpload"
          >
            儲存履歷!
          </ResumeUpoloadBtn>
        </FinalEditArea>
      )}

      <LinkButton to={`/profile/${resumeID}`} id="resumeToProfile">
        <FontAwesomeIcon
          icon={faUserAstronaut}
          style={{ marginRight: "10px" }}
        />
        前往{resumeData.name}的個人頁面
      </LinkButton>
      {resumeID === userData.userID ? (
        <PreviewBtn isPreview={isPreview} id={"resumePreviewBtn"} />
      ) : null}
      <QusetionMark
        stepType={
          resumeID === userData.userID
            ? introSteps.resumeUser
            : introSteps.resumeOthers
        }
        type={resumeID === userData.userID ? "resume" : ""}
      />
      <SideBar type={"resume"} data={resumeData} />
      {isLargeLoading ? <LargeLoading backgroundColor={"#ffffffb3"} /> : null}
    </Wrapper>
  );
};

export default Resume;
