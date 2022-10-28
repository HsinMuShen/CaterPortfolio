import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
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
import PreviewBtn from "../../utilis/PreviewBtn";
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
  MoveBtn,
  PreviewDiv,
  SingleComponentUnit,
  EditContentLayout,
} from "../../utilis/styledExtending";
import useAlertCalling from "../../components/useAlertCalling";

export interface portfolioComContent {
  image: string[];
  text: string[];
  comName: string;
  id: string;
}

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLargeLoading, setIsLargeLoading] = useState<boolean>(false);
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { startAlert } = useAlertCalling();
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.portfolio
  );
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const portfolioData = useSelector(
    (state: RootState) => state.PortfolioReducer
  );
  const websiteContentIndex = Number(
    window.localStorage.getItem("websiteContentIndex")
  );
  const userData = useSelector((state: RootState) => state.UserReducer);
  const portfolioID = useParams().id;

  const addPortfolioCom = (conIndex: number) => {
    dispatch(portfolioAddCom(portfolioChoice[conIndex]));
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
      startAlert("成功更新網站與作品集!");
    } catch (e) {
      startAlert("作品集更新失敗");
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
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
      } else {
        startAlert("查無結果，請確定網址輸入正確");
        navigate(`/`);
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

      {userData.userID === userID || portfolioID === "create" ? (
        <PreviewBtn isPreview={isPreview} id={"portfolioPreviewBtn"} />
      ) : null}
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
