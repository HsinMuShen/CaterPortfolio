import React, { useState, useEffect } from "react";
import styled from "styled-components";

import InitialSetup from "./InitialSetup";
import PortfolioCom1 from "./PortfolioComponents/PortfolioCom1";
import PortfolioCom2 from "./PortfolioComponents/PortfolioCom2";
import PortfolioCom3 from "./PortfolioComponents/PortfolioCom3";
import Delete from "../Resume/Delete";
import CreatePortfolioCom from "./CreatePortfolioCom";
import firebase from "../../utilis/firebase";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { portfolioAddCom, portfolioDeleteCom } from "../../action";
import { Link } from "react-router-dom";

const Preview = styled.div``;

const SineleComponent = styled.div`
  display: flex;
`;

export interface portfolioComContent {
  image: string[];
  text: string[];
  type: number;
}

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

const CreatePortfolio = () => {
  const [portfolioCom, setPortfolioCom] = useState<portfolioComContent[]>([]);
  const dispatch = useDispatch();
  const portfolioData = useSelector(
    (state: RootState) => state.PortfolioReducer
  );
  console.log(portfolioData);
  const addWebsiteCom = (conIndex: number) => {
    dispatch(portfolioAddCom(portfolioChoice[conIndex].comContent));
    setPortfolioCom([...portfolioCom, portfolioChoice[conIndex].comContent]);
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(portfolioDeleteCom(deleteIndex));
    const tempArr = [...portfolioCom];
    tempArr.splice(deleteIndex, 1);
    setPortfolioCom(tempArr);
  };

  const uploadWebsite = () => {
    const tempPortfolioData = portfolioData;
    tempPortfolioData.time = Date.now();
    firebase.uploadDoc("websites", tempPortfolioData);
  };

  return (
    <>
      <InitialSetup />
      <hr />
      <Preview>Preview</Preview>
      <div>
        {portfolioCom.map((content, index) => {
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
        })}
      </div>
      <CreatePortfolioCom
        addWebsiteCom={addWebsiteCom}
        uploadWebsite={uploadWebsite}
      />
    </>
  );
};

export default CreatePortfolio;
