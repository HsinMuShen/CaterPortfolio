import React, { useState } from "react";
import EditText from "../../../utilis/EditText";
import styled from "styled-components";
import firebase from "../../../utilis/firebase";
import { Link } from "react-router-dom";
import { websiteComContent } from "../Website";
import { useDispatch } from "react-redux";
import {
  websiteFillContent,
  setPortfolioIndex,
  setPortfolioListIndex,
} from "../../../action";

const PortfolioCard = styled(Link)``;

const AddingPortfolio = styled(Link)`
  width: 100px;
  height: 100px;
  border: 1px solid;
`;
const PortfolioAreaCom = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const [textList, setTextList] = useState<string[] | null[]>([
    null,
    null,
    null,
  ]);
  const dispatch = useDispatch();
  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = textList;
    tempArr[listIndex] = text;
    setTextList(tempArr);
    dispatch(websiteFillContent(index, tempArr));
  };
  return (
    <div style={{ display: "flex" }}>
      <>
        {content.portfolioID?.map((portfolioID, portfolioListIndex) => {
          return (
            <PortfolioCard
              key={portfolioID}
              to={`/portfolio/${portfolioID}`}
              onClick={() => {
                dispatch(setPortfolioListIndex(portfolioListIndex));
                dispatch(setPortfolioIndex(index));
              }}
            >
              <img src={content.image[portfolioListIndex]} />
              <p>{content.text[portfolioListIndex]}</p>
            </PortfolioCard>
          );
        })}
        <AddingPortfolio to={"/portfolio/create"}>
          <div
            onClick={() => {
              dispatch(setPortfolioIndex(index));
            }}
          >
            新增作品集
          </div>
        </AddingPortfolio>
      </>
    </div>
  );
};

export default PortfolioAreaCom;
