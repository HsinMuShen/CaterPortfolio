import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import InitialSetup from "./InitialSetup";
import Delete from "../Resume/Delete";
import CreatePortfolioCom from "./CreatePortfolioCom";
import SideBar from "../../utilis/SideBar";
import firebase from "../../utilis/firebase";

import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  websiteChangePortfolioID,
  portfolioAddCom,
  portfolioDeleteCom,
  portfolioLoading,
  portfolioAddSetting,
  portfolioInitialSetup,
  isPreviewPortfolio,
  isPreviewTrue,
  setAlert,
  websiteLoading,
} from "../../action";
import { PortfolioComponents } from "./portfolioComponents";
import { portfolioChoice } from "./portfolioComponents";
import Loading from "../../utilis/Loading";
import Move from "../../utilis/Move";
import InitialImg from "../../utilis/cater.png";
import QusetionMark, { introSteps } from "../../utilis/QusetionMark";
import LargeLoading from "../../utilis/LargeLoading";

const Preview = styled.div``;

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

  useEffect(() => {
    const loadPortfolio = async () => {
      setIsLoading(true);
      const portfolioData = await firebase.readPortfolioData(
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
        console.log(
          websiteData.content[websiteContentIndex!].portfolioID.length
        );
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
  }, [userData, websiteData.content.length]);

  return (
    <PortfolioBody>
      <Wrapper>
        {userData.userID === userID || portfolioID === "create" ? (
          <PreviewBtn
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
          </PreviewBtn>
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
          <PortfolioLayouts>
            <PreviewDiv style={{ zIndex: isPreview ? "2" : "-1" }}></PreviewDiv>

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
                  <SingleComponent key={content.id}>
                    <TempCom index={index} content={content} />
                    <Delete addDeleteCom={addDeleteCom} index={index} />
                    <Move />
                  </SingleComponent>
                );
              }
            )}
          </PortfolioLayouts>
        )}

        <CreatePortfolioCom addPortfolioCom={addPortfolioCom} />
      </Wrapper>
      {isPreview ? null : (
        <ResumeBtn onClick={uploadPortfolio} className="portfolioUpload">
          上架作品集!
        </ResumeBtn>
      )}
      <ToWebsiteBtn
        to={`/website/${portfolioData.userID}`}
        id="portfolioToWebsite"
      >
        回到{portfolioData.name}的網站
      </ToWebsiteBtn>
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
    </PortfolioBody>
  );
};

export default Portfolio;

const PortfolioBody = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 120px 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
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

const PortfolioLayouts = styled.div`
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
  width: 960px;
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

const ResumeBtn = styled.div`
  color: #555555;
  background-color: #ffffff;
  padding: 8px;
  width: 180px;
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

const ToWebsiteBtn = styled(Link)`
  margin: 20px auto;
  text-decoration: none;
  color: #ffffff;
  background-color: #555555;
  border: 1px solid;
  padding: 8px;
  border-radius: 5px;
`;
