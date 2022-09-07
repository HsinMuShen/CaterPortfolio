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
import { portfolioChoice } from "./Portfolio";

const Preview = styled.div``;

const SineleComponent = styled.div`
  display: flex;
`;

export interface portfolioComContent {
  image: string[];
  text: string[];
  type: number;
}

const CreatePortfolio = () => {
  const [portfolioCom, setPortfolioCom] = useState<portfolioComContent[]>([]);
  const dispatch = useDispatch();
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
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
    const timestamp = Date.now();
    tempPortfolioData.time = timestamp;
    firebase.uploadPortfolio(tempPortfolioData);

    const tempWebsiteData = websiteData;
    tempWebsiteData.time = timestamp;
    firebase.uploadDoc("websites", websiteData);
  };

  return (
    <>
      {/* <InitialSetup /> */}
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
