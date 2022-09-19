import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import InitialSetup from "./InitialSetup";
import PortfolioCom1 from "./PortfolioComponents/PortfolioCom1";
import PortfolioCom2 from "./PortfolioComponents/PortfolioCom2";
import PortfolioCom3 from "./PortfolioComponents/PortfolioCom3";
import Delete from "../Resume/Delete";
import CreatePortfolioCom from "./CreatePortfolioCom";
import SideBar from "../../utilis/SideBar";
import firebase from "../../utilis/firebase";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  websiteAddPortfolioID,
  portfolioAddCom,
  portfolioDeleteCom,
  portfolioLoading,
  portfolioAddSetting,
  portfolioInitialSetup,
  isPreviewPortfolio,
} from "../../action";
import { portfolioComContent } from "./CreatePortfolio";

const Preview = styled.div``;

const SineleComponent = styled.div`
  display: flex;
`;

export const portfolioChoice = [
  {
    name: 0,
    comIndex: 0,
    comContent: {
      image: [""],
      text: ["<h2>標題</h2><p>令人眼睛一亮的介紹</p><p>令人眼睛一亮的介紹</p>"],
      type: 0,
    },
  },
  {
    name: 1,
    comIndex: 1,
    comContent: {
      image: ["", ""],
      text: [],
      type: 1,
    },
  },
  {
    name: 2,
    comIndex: 2,
    comContent: {
      image: [],
      text: [
        "<h3>標題</h3><p>您的英勇事蹟</p><p>您的英勇事蹟</p>",
        "<h3>標題</h3><p>您的英勇事蹟</p><p>您的英勇事蹟</p>",
        "<h3>標題</h3><p>您的英勇事蹟</p><p>您的英勇事蹟</p>",
      ],
      type: 2,
    },
  },
];

const Portfolio = () => {
  const [portfolioCom, setPortfolioCom] = useState<portfolioComContent[]>([]);
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
  const userData = useSelector((state: RootState) => state.UserReducer);
  const portfolioID = useParams().id;

  const addWebsiteCom = (conIndex: number) => {
    dispatch(portfolioAddCom(portfolioChoice[conIndex].comContent));
    // setPortfolioCom([...portfolioCom, portfolioChoice[conIndex].comContent]);
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(portfolioDeleteCom(deleteIndex));
    const tempArr = [...portfolioCom];
    tempArr.splice(deleteIndex, 1);
    setPortfolioCom(tempArr);
  };

  const uploadWebsite = () => {
    const tempPortfolioData = portfolioData;
    const timestamp = Date.now();
    tempPortfolioData.time = timestamp;
    firebase.uploadPortfolio(tempPortfolioData);

    const tempWebsiteData = websiteData;
    tempWebsiteData.time = timestamp;
    firebase.uploadDoc("websites", userData.userID, websiteData);
  };

  useEffect(() => {
    const loadPortfolio = async () => {
      console.log(portfolioID);
      const portfolioData = await firebase.readPortfolioData(
        "portfolios",
        `${portfolioID}`
      );
      if (portfolioData) {
        console.log(portfolioData);
        dispatch(portfolioLoading(portfolioData));
        const tempArr: portfolioComContent[] = [];
        portfolioData.content.forEach((content: portfolioComContent) => {
          tempArr.push(content);
        });
        setUserID(portfolioData.userID);
        setPortfolioCom(tempArr);
      }
    };

    if (portfolioID === "create") {
      dispatch(isPreviewPortfolio());
      const portID = v4();
      const initialPortfolioData = {
        title: "",
        mainImage: "",
        content: [],
        name: userData.name,
        followers: [],
        tags: [],
        time: null,
        userID: userData.userID,
        portfolioID: portID,
      };
      dispatch(portfolioLoading(initialPortfolioData));
      const tempArr = websiteData.content[portfolioIndex.index].portfolioID;
      tempArr[websiteData.content[portfolioIndex.index].portfolioID.length] =
        portID;
      dispatch(websiteAddPortfolioID(portfolioIndex.index, tempArr));
    } else {
      loadPortfolio();
    }
  }, [userData]);

  return (
    <PortfolioBody>
      <Wrapper>
        {userData.userID === userID || portfolioID === "create" ? (
          <PreviewBtn
            onClick={() => {
              dispatch(isPreviewPortfolio());
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

        {isPreview ? null : (
          <>
            <InitialSetup portfolioID={portfolioID} />
            <hr />
          </>
        )}

        <div>
          {portfolioData.content.map(
            (content: portfolioComContent, index: number) => {
              switch (content.type) {
                case 0: {
                  return (
                    <SineleComponent key={index}>
                      <PortfolioCom1 content={content} index={index} />
                      <Delete addDeleteCom={addDeleteCom} index={index} />
                    </SineleComponent>
                  );
                }
                case 1: {
                  return (
                    <SineleComponent key={index}>
                      <PortfolioCom2 content={content} index={index} />
                      <Delete addDeleteCom={addDeleteCom} index={index} />
                    </SineleComponent>
                  );
                }
                case 2: {
                  return (
                    <SineleComponent key={index}>
                      <PortfolioCom3 content={content} index={index} />
                      <Delete addDeleteCom={addDeleteCom} index={index} />
                    </SineleComponent>
                  );
                }
                default:
                  return null;
              }
            }
          )}
        </div>
        <CreatePortfolioCom
          addWebsiteCom={addWebsiteCom}
          uploadWebsite={uploadWebsite}
        />
      </Wrapper>
      <SideBar type={"portfolio"} data={portfolioData} />
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
  border: 1px solid;
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
