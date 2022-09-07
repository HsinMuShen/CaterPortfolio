import React, { useState, useEffect } from "react";
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
  websiteLoading,
  isPreviewWebsite,
} from "../../action";
import { Link } from "react-router-dom";

const Preview = styled.div`
  cursor: pointer;
`;

const SineleComponent = styled.div`
  display: flex;
`;

export interface websiteComContent {
  image: string[];
  text: string[];
  type: number;
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
  const [websiteCom, setWebsiteCom] = useState<websiteComContent[]>([]);
  const dispatch = useDispatch();
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.website
  );

  const addWebsiteCom = (conIndex: number) => {
    dispatch(websiteAddCom(websiteChoice[conIndex].comContent));
    setWebsiteCom([...websiteCom, websiteChoice[conIndex].comContent]);
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(websiteDeleteCom(deleteIndex));
    const tempArr = [...websiteCom];
    tempArr.splice(deleteIndex, 1);
    setWebsiteCom(tempArr);
  };

  const uploadWebsite = () => {
    const tempWebsiteData = websiteData;
    tempWebsiteData.time = Date.now();
    firebase.uploadDoc("websites", websiteData);
  };

  useEffect(() => {
    const loadWebsite = async () => {
      const websiteData = await firebase.readData(
        "websites",
        "Xvbmt52vwx9RzFaXE17L"
      );
      if (websiteData) {
        dispatch(websiteLoading(websiteData));
        const tempArr: websiteComContent[] = [];
        websiteData.content.forEach((content: websiteComContent) => {
          tempArr.push(content);
        });
        setWebsiteCom(tempArr);
      }
    };
    loadWebsite();
  }, []);

  return (
    <>
      <Preview
        onClick={() => {
          dispatch(isPreviewWebsite());
        }}
      >
        {`${isPreview}`}
      </Preview>
      <div>
        {websiteCom.map((content, index) => {
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
                  <PortfolioAreaCom content={content} index={index} />
                  <Delete addDeleteCom={addDeleteCom} index={index} />
                </SineleComponent>
              );
            }
            default:
              return null;
          }
        })}
      </div>
      {isPreview ? null : (
        <AddWebsiteCom
          addWebsiteCom={addWebsiteCom}
          uploadWebsite={uploadWebsite}
        />
      )}
    </>
  );
};

export default Website;
