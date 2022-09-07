import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import {
  portfolioAddCom,
  portfolioDeleteCom,
  portfolioLoading,
  isPreviewPortfolio,
} from "../../action";

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

const Portfolio = () => {
  const [portfolioCom, setPortfolioCom] = useState<portfolioComContent[]>([]);
  const dispatch = useDispatch();
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.portfolio
  );
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const portfolioData = useSelector(
    (state: RootState) => state.PortfolioReducer
  );
  const { id } = useParams();
  const portfolioID = id?.split("+")[1];
  const userID = id?.split("+")[0];

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
    const timestamp = Date.now();
    tempPortfolioData.time = timestamp;
    firebase.uploadPortfolio(tempPortfolioData);

    const tempWebsiteData = websiteData;
    tempWebsiteData.time = timestamp;
    firebase.uploadDoc("websites", websiteData);
  };

  useEffect(() => {
    const loadPortfolio = async () => {
      console.log(portfolioID);
      const portfolioData = await firebase.readPortfolioData(
        "portfolios",
        "Xvbmt52vwx9RzFaXE17L",
        `${portfolioID}`
      );
      if (portfolioData) {
        dispatch(portfolioLoading(portfolioData));
        const tempArr: portfolioComContent[] = [];
        portfolioData.content.forEach((content: portfolioComContent) => {
          tempArr.push(content);
        });
        setPortfolioCom(tempArr);
      }
    };
    if (portfolioID !== "create") {
      loadPortfolio();
    }
  }, []);

  return (
    <>
      {userID === localStorage.getItem("userID") ? (
        <Preview
          onClick={() => {
            dispatch(isPreviewPortfolio());
          }}
        >
          Preview
        </Preview>
      ) : null}

      {isPreview ? null : (
        <>
          <InitialSetup portfolioID={portfolioID} />
          <hr />
        </>
      )}

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

export default Portfolio;
