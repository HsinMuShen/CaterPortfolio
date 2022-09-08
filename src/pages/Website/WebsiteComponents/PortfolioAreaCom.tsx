import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
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
  userID,
}: {
  content: websiteComContent;
  index: number;
  userID: string | undefined;
}) => {
  const [textList, setTextList] = useState<string[] | null[]>([
    null,
    null,
    null,
  ]);
  const dispatch = useDispatch();
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.website
  );
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
        {isPreview ? null : (
          <AddingPortfolio to={"/portfolio/create"}>
            <div
              onClick={() => {
                dispatch(setPortfolioIndex(index));
              }}
            >
              新增作品集
            </div>
          </AddingPortfolio>
        )}
      </>
    </div>
  );
};

export default PortfolioAreaCom;
