import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEye,
  faUpDownLeftRight,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { websiteChoice } from "./websiteComponents";
import Loading from "../../utilis/Loading";
import AddWebsiteCom from "./AddWebsiteCom";
import Delete from "../Resume/Delete";
import PopUp from "../../utilis/PopUp";

import firebase from "../../utilis/firebase";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  websiteAddCom,
  websiteDeleteCom,
  websiteAddSetting,
  websiteRenewContent,
  websiteLoading,
  isPreviewWebsite,
  isPreviewTrue,
  isPreviewFalse,
  setAlert,
} from "../../action";
import { WebsiteComponents } from "./websiteComponents";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import QusetionMark, { introSteps } from "../../utilis/QusetionMark";
import WebsiteInitialSetup from "./WebsiteInitialSetup";
import LargeLoading from "../../utilis/LargeLoading";

export interface websiteComContent {
  image: string[];
  text: string[];
  type: number;
  comName: string;
  id: string;
  portfolioID?: string[];
}

const Website = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLargeLoading, setIsLargeLoading] = useState<boolean>(false);
  const deletePortfolioContent = useRef<number>();
  const websiteID = useParams().id;
  const dispatch = useDispatch();
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.website
  );
  const userData = useSelector((state: RootState) => state.UserReducer);
  const isPop = useSelector((state: RootState) => state.IsPreviewReducer.popup);

  const addWebsiteCom = (conIndex: number) => {
    dispatch(websiteAddCom(websiteChoice[conIndex].comContent));
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(websiteDeleteCom(deleteIndex));
  };

  const sureToDelete = (isSure: boolean) => {
    if (isSure) {
      deletePortCom(deletePortfolioContent.current!);
    }
    dispatch(isPreviewFalse("popup"));
  };

  const deletePortCom = async (deleteIndex: number) => {
    let deletePromiswArr: Promise<void>[] = [];
    websiteData.content[deleteIndex].portfolioID.forEach(
      (portfolioID: string) => {
        deletePromiswArr.push(deleteDoc(doc(db, "portfolios", portfolioID)));
      }
    );
    await Promise.all(deletePromiswArr);

    dispatch(websiteDeleteCom(deleteIndex));

    const tempContentArr = [...websiteData.content];
    console.log(tempContentArr);
    tempContentArr.splice(deleteIndex, 1);
    const newResumeData = { ...websiteData, content: tempContentArr };
    console.log(newResumeData.content);
    firebase.uploadDoc("websites", userData.userID, newResumeData);
  };

  const uploadWebsite = async () => {
    const tempData = { ...websiteData };
    tempData.time = Date.now();
    try {
      await firebase.uploadDoc("websites", `${websiteID}`, tempData);
      dispatch(setAlert({ isAlert: true, text: "成功更新網站!" }));
      setTimeout(() => {
        dispatch(setAlert({ isAlert: false, text: "" }));
      }, 3000);
    } catch (e) {
      dispatch(setAlert({ isAlert: true, text: `${e}` }));
      setTimeout(() => {
        dispatch(setAlert({ isAlert: false, text: "" }));
      }, 3000);
    }
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items: websiteComContent[] = [...websiteData.content];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(websiteRenewContent(items));
  };

  useEffect(() => {
    setIsLoading(true);
    const loadWebsite = async () => {
      const websiteData = await firebase.readData("websites", `${websiteID}`);
      if (websiteData) {
        dispatch(websiteLoading(websiteData));
      } else {
        dispatch(
          websiteLoading({
            title: "",
            coverImage: "",
            content: [],
            name: userData.name,
            followers: [],
            tags: [],
            time: null,
            userID: userData.userID,
          })
        );
      }
      setIsLoading(false);
    };
    loadWebsite();
    return () => {
      dispatch(isPreviewTrue("website"));
    };
  }, [userData, websiteID]);

  return (
    <WebsiteBody>
      <Wrapper>
        {websiteID === userData.userID ? (
          <PreviewBtn
            onClick={() => {
              dispatch(isPreviewWebsite());
            }}
            id="websitePreviewBtn"
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
        {isPreview ? null : (
          <WebsiteInitialSetup setIsLargeLoading={setIsLargeLoading} />
        )}

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <WebsiteLayouts
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <PreviewDiv
                  style={{ zIndex: isPreview ? "2" : "-1" }}
                ></PreviewDiv>
                {isLoading ? <Loading /> : null}
                {websiteData.content.length === 0 ? <p>尚未建立網站</p> : null}
                {websiteData.content?.map(
                  (content: websiteComContent, index: number) => {
                    const TempCom =
                      WebsiteComponents[
                        content.comName as keyof typeof WebsiteComponents
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
                            <TempCom
                              index={index}
                              content={content}
                              userID={userData.userID}
                            />
                            <Delete
                              addDeleteCom={
                                content.comName === "Portfolio0"
                                  ? () => {
                                      deletePortfolioContent.current = index;
                                      dispatch(isPreviewTrue("popup"));
                                    }
                                  : addDeleteCom
                              }
                              index={index}
                            />
                            <PopUp
                              isPopup={isPop}
                              text={
                                "是否確定要刪除此作品集列? 一旦刪除將無法回復"
                              }
                              sureToDelete={sureToDelete}
                            ></PopUp>

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
              </WebsiteLayouts>
            )}
          </Droppable>
        </DragDropContext>
        {isPreview ? null : (
          <AddWebsiteCom
            addWebsiteCom={addWebsiteCom}
            uploadWebsite={uploadWebsite}
          />
        )}
      </Wrapper>
      {isPreview ? null : (
        <ResumeBtn
          onClick={() => {
            dispatch(isPreviewTrue("website"));
            uploadWebsite();
          }}
          className="websiteUpload"
        >
          將網站儲存上架!
        </ResumeBtn>
      )}
      <ToProfileLink to={`/profile/${websiteID}`} id="websiteToProfile">
        <FontAwesomeIcon
          icon={faUserAstronaut}
          style={{ marginRight: "10px" }}
        />
        前往{websiteData.name}的個人頁面
      </ToProfileLink>
      <QusetionMark
        stepType={
          websiteID === userData.userID
            ? introSteps.websiteUser
            : introSteps.websiteOthers
        }
        type={websiteID === userData.userID ? "website" : ""}
      />
      {isLargeLoading ? <LargeLoading backgroundColor={"#ffffffb3"} /> : null}
    </WebsiteBody>
  );
};

export default Website;

const WebsiteBody = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 120px 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  background-color: #ffffff;
  @media screen and (max-width: 1279px) {
    width: 90%;
  }
`;

const PreviewBtn = styled.div`
  position: fixed;
  top: 180px;
  right: 25px;
  width: 80px;
  background-color: #ffffff;
  padding: 5px 8px;
  border-radius: 10px;
  border: 1px solid;
  cursor: pointer;
  z-index: 4;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
  @media screen and (max-width: 1279px) {
    font-size: 14px;
    width: 70px;
    padding: 3px 3px;
    right: 5px;
  }
`;

const WebsiteLayouts = styled.div`
  position: relative;
  display: flex;
  width: 960px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const PreviewDiv = styled.div`
  position: absolute;
  width: 900px;
  height: 100%;
  z-index: 2;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const SingleComponent = styled.div`
  display: flex;
  width: 960px;
  position: relative;
  margin: 10px 0;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const MoveBtn = styled.div`
  position: absolute;
  right: 4.5px;
  top: 25px;
  font-size: 20px;
`;

const ResumeBtn = styled.button`
  color: #555555;
  background-color: #ffffff;
  padding: 8px;
  width: 120px;
  border-radius: 5px;
  font-weight: 600;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 20px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #555555;
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
