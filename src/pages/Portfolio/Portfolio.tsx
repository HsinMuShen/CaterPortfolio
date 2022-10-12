import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { v4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEye,
  faUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  websiteChangePortfolioID,
  websiteLoading,
} from "../../action/WebsiteReducerAction";
import {
  portfolioAddCom,
  portfolioDeleteCom,
  portfolioLoading,
  portfolioRenewContent,
} from "../../action/PortfolioReducerAction";
import {
  isPreviewPortfolio,
  isPreviewTrue,
  setAlert,
} from "../../action/IsPreviewReducerAction";

import { PortfolioComponents, portfolioChoice } from "./portfolioComponents";
import InitialSetup from "./InitialSetup";
import Delete from "../Resume/Delete";
import Loading from "../../utilis/Loading";
import InitialImg from "../../utilis/cater.png";
import QusetionMark, { introSteps } from "../../utilis/QusetionMark";
import LargeLoading from "../../utilis/LargeLoading";
import CreatePortfolioCom from "./CreatePortfolioCom";
import SideBar from "../../utilis/SideBar";
import firebase from "../../utilis/firebase";
import {
  EditPageWrapper,
  LinkButton,
  UploadButton,
  EditToggleButton,
  MoveBtn,
  PreviewDiv,
  SingleComponentUnit,
  EditContentLayout,
} from "../../utilis/styledExtending";

export interface portfolioComContent {
  image: string[];
  text: string[];
  type: number;
  comName: string;
  id: string;
}

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLargeLoading, setIsLargeLoading] = useState<boolean>(false);
  const [userID, setUserID] = useState("");
  const dispatch = useDispatch();
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.portfolio
  );
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const portfolioData = useSelector(
    (state: RootState) => state.PortfolioReducer
  );
  const portfolioIndex = useSelector(
    (state: RootState) => state.PortfolioIndex
  );
  const websiteContentIndex = Number(
    window.localStorage.getItem("websiteContentIndex")
  );
  const portfolioListIndex = Number(
    window.localStorage.getItem("portfolioListIndex")
  );
  const userData = useSelector((state: RootState) => state.UserReducer);
  const portfolioID = useParams().id;

  const addPortfolioCom = (conIndex: number) => {
    dispatch(portfolioAddCom(portfolioChoice[conIndex].comContent));
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(portfolioDeleteCom(deleteIndex));
  };

  const uploadPortfolio = async () => {
    const tempPortfolioData = { ...portfolioData };
    const timestamp = Date.now();
    tempPortfolioData.time = timestamp;

    const tempWebsiteData = { ...websiteData };
    tempWebsiteData.time = timestamp;

    try {
      await firebase.uploadDoc("websites", userData.userID, websiteData);
      firebase.uploadPortfolio(tempPortfolioData);
      dispatch(setAlert({ isAlert: true, text: "成功更新網站與作品集!" }));
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
    const items: portfolioComContent[] = [...portfolioData.content];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(portfolioRenewContent(items));
  };

  useEffect(() => {
    const loadPortfolio = async () => {
      setIsLoading(true);
      const portfolioData = await firebase.readData(
        "portfolios",
        `${portfolioID}`
      );
      if (portfolioData) {
        dispatch(portfolioLoading(portfolioData));
        setUserID(portfolioData.userID);
        const websiteData = await firebase.readData(
          "websites",
          `${portfolioData.userID}`
        );
        if (websiteData) {
          dispatch(websiteLoading(websiteData));
        }
      }
      setIsLoading(false);
    };

    if (portfolioID === "create") {
      setIsLoading(true);
      dispatch(isPreviewPortfolio());
      const portID = v4();
      const initialPortfolioData = {
        title: "title",
        mainImage: InitialImg,
        content: [],
        name: userData.name,
        followers: [],
        tags: [],
        time: null,
        userID: userData.userID,
        portfolioID: portID,
        userImage: userData.userImage,
      };
      dispatch(portfolioLoading(initialPortfolioData));

      if (websiteData.content.length > 0) {
        const tempArr = [
          ...websiteData.content[websiteContentIndex!].portfolioID,
        ];
        tempArr[websiteData.content[websiteContentIndex!].portfolioID.length] =
          portID;
        dispatch(websiteChangePortfolioID(websiteContentIndex!, tempArr));
      }
      setIsLoading(false);
    } else {
      loadPortfolio();
    }

    return () => {
      dispatch(isPreviewTrue("portfolio"));
    };
  }, [userData.userID, websiteData.content.length]);

  return (
    <EditPageWrapper>
      {userData.userID === userID || portfolioID === "create" ? (
        <EditToggleButton
          onClick={() => {
            dispatch(isPreviewPortfolio());
          }}
          id="portfolioPreviewBtn"
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
        </EditToggleButton>
      ) : null}

      {isPreview ? null : (
        <InitialSetup
          portfolioID={portfolioID}
          websiteData={websiteData}
          setIsLargeLoading={setIsLargeLoading}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <PortfolioEditContentLayout
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <PortfolioPreviewDiv
                  style={{ zIndex: isPreview ? "2" : "-1" }}
                ></PortfolioPreviewDiv>
                {portfolioData.content.length === 0 ? (
                  <p>尚未建立此作品集</p>
                ) : null}

                {portfolioData.content.map(
                  (content: portfolioComContent, index: number) => {
                    const TempCom =
                      PortfolioComponents[
                        content.comName as keyof typeof PortfolioComponents
                      ];
                    return (
                      <Draggable
                        key={content.id}
                        draggableId={content.id}
                        index={index}
                      >
                        {(provided) => (
                          <SingleComponentUnit
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <TempCom index={index} content={content} />
                            <Delete addDeleteCom={addDeleteCom} index={index} />
                            <MoveBtn {...provided.dragHandleProps}>
                              {isPreview ? null : (
                                <FontAwesomeIcon icon={faUpDownLeftRight} />
                              )}
                            </MoveBtn>
                          </SingleComponentUnit>
                        )}
                      </Draggable>
                    );
                  }
                )}
                {provided.placeholder}
              </PortfolioEditContentLayout>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <CreatePortfolioCom addPortfolioCom={addPortfolioCom} />

      {isPreview ? null : (
        <PortfolioUpoloadBtn
          onClick={uploadPortfolio}
          className="portfolioUpload"
        >
          上架作品集!
        </PortfolioUpoloadBtn>
      )}
      <LinkButton
        to={`/website/${portfolioData.userID}`}
        id="portfolioToWebsite"
      >
        回到{portfolioData.name}的網站
      </LinkButton>
      <QusetionMark
        stepType={
          userData.userID === userID
            ? introSteps.portfolioUser
            : introSteps.portfolioOthers
        }
        type={userData.userID === userID ? "portfolio" : ""}
      />
      <SideBar type={"portfolio"} data={portfolioData} />
      {isLargeLoading ? <LargeLoading backgroundColor={"#ffffffb3"} /> : null}
    </EditPageWrapper>
  );
};

export default Portfolio;

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  background-color: #ffffff;
  @media screen and (max-width: 1279px) {
    width: 90%;
  }
`;

const PortfolioEditContentLayout = styled(EditContentLayout)`
  width: 960px;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const PortfolioPreviewDiv = styled(PreviewDiv)`
  width: 960px;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const PortfolioUpoloadBtn = styled(UploadButton)`
  background-color: #ffffff;
  width: 180px;
  margin: 40px auto 20px;
`;
