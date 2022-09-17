import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import WebsiteCom1 from "./WebsiteComponents/WebsiteCom1";
import WebsiteCom2 from "./WebsiteComponents/WebsiteCom2";
import WebsiteCom3 from "./WebsiteComponents/WebsiteCom3";
import PortfolioAreaCom from "./WebsiteComponents/PortfolioAreaCom";
import AddWebsiteCom from "./AddWebsiteCom";
import Delete from "../Resume/Delete";

import firebase from "../../utilis/firebase";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  websiteAddCom,
  websiteDeleteCom,
  websiteAddSetting,
  websiteLoading,
  isPreviewWebsite,
} from "../../action";
import { Link } from "react-router-dom";

export interface websiteComContent {
  image: string[];
  text: string[];
  type: number;
  comName: string;
  id: string;
  portfolioID?: string[];
}

export const websiteChoice = [
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
  {
    name: 3,
    comIndex: 3,
    comContent: {
      image: [],
      text: [],
      type: 3,
      portfolioID: [],
    },
  },
];

const Website = () => {
  const websiteID = useParams().id;
  const dispatch = useDispatch();
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.website
  );
  const userData = useSelector((state: RootState) => state.UserReducer);

  const addWebsiteCom = (conIndex: number) => {
    dispatch(websiteAddCom(websiteChoice[conIndex].comContent));
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(websiteDeleteCom(deleteIndex));
  };

  const uploadWebsite = () => {
    const tempWebsiteData = websiteData;
    tempWebsiteData.time = Date.now();
    firebase.uploadDoc("websites", userData.userID, websiteData);
  };

  useEffect(() => {
    const loadWebsite = async () => {
      const websiteData = await firebase.readData("websites", `${websiteID}`);
      if (websiteData) {
        console.log(websiteData);
        dispatch(websiteLoading(websiteData));
      } else {
        dispatch(websiteAddSetting("name", userData.name));
        dispatch(websiteAddSetting("userID", userData.userID));
      }
    };
    loadWebsite();
  }, [userData]);

  return (
    <Wrapper>
      {websiteID === userData.userID ? (
        <PreviewBtn
          onClick={() => {
            dispatch(isPreviewWebsite());
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

      <div>
        {websiteData.content.map(
          (content: websiteComContent, index: number) => {
            switch (content.type) {
              case 0: {
                return (
                  <SineleComponent key={index}>
                    <WebsiteCom1 content={content} index={index} />
                    <Delete addDeleteCom={addDeleteCom} index={index} />
                  </SineleComponent>
                );
              }
              case 1: {
                return (
                  <SineleComponent key={index}>
                    <WebsiteCom2 content={content} index={index} />
                    <Delete addDeleteCom={addDeleteCom} index={index} />
                  </SineleComponent>
                );
              }
              case 2: {
                return (
                  <SineleComponent key={index}>
                    <WebsiteCom3 content={content} index={index} />
                    <Delete addDeleteCom={addDeleteCom} index={index} />
                  </SineleComponent>
                );
              }
              case 3: {
                return (
                  <SineleComponent key={index}>
                    <PortfolioAreaCom
                      content={content}
                      index={index}
                      userID={userData.userID}
                    />
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
      {isPreview ? null : (
        <AddWebsiteCom
          addWebsiteCom={addWebsiteCom}
          uploadWebsite={uploadWebsite}
        />
      )}
      <ResumeBtn onClick={uploadWebsite}>上架網站!</ResumeBtn>
    </Wrapper>
  );
};

export default Website;

const Wrapper = styled.div`
  width: 960px;
  margin: 120px auto;
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

const SineleComponent = styled.div`
  display: flex;
`;

const ResumeBtn = styled.button`
  width: 200px;
`;
