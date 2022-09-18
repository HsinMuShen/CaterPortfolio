import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { websiteChoice } from "./websiteComponents";
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
import { WebsiteComponents } from "./websiteComponents";
import { Link } from "react-router-dom";

export interface websiteComContent {
  image: string[];
  text: string[];
  type: number;
  comName: string;
  id: string;
  portfolioID?: string[];
}

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
        dispatch(websiteLoading(websiteData));
      } else {
        dispatch(websiteAddSetting("name", userData.name));
        dispatch(websiteAddSetting("userID", userData.userID));
      }
    };
    loadWebsite();
  }, [userData]);

  return (
    <WebsiteBody>
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

        <WebsiteLayouts>
          {websiteData.content?.map(
            (content: websiteComContent, index: number) => {
              const TempCom =
                WebsiteComponents[
                  content.comName as keyof typeof WebsiteComponents
                ];
              return (
                <SineleComponent key={content.id}>
                  <TempCom index={index} content={content} />
                  <Delete addDeleteCom={addDeleteCom} index={index} />
                </SineleComponent>
              );
            }
          )}
        </WebsiteLayouts>
        {isPreview ? null : (
          <AddWebsiteCom
            addWebsiteCom={addWebsiteCom}
            uploadWebsite={uploadWebsite}
          />
        )}
        <ResumeBtn onClick={uploadWebsite}>上架網站!</ResumeBtn>
      </Wrapper>
    </WebsiteBody>
  );
};

export default Website;

const WebsiteBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 120px 0;
  background-color: #ffffff;
`;

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  background-color: #ffffff;
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

const WebsiteLayouts = styled.div`
  display: flex;
  width: 960px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SineleComponent = styled.div`
  display: flex;
  width: 960px;
  position: relative;
  margin: 10px 0;
`;

const ResumeBtn = styled.button`
  width: 200px;
`;
