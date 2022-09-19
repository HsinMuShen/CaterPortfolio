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

const Wrapper = styled.div`
  display: flex;
  width: 900px;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const PortfolioCard = styled(Link)``;

const AddingPortfolio = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 210px;
  border: 2px solid;
  border-radius: 5px;
  text-decoration: none;
  color: #555555;
  &:hover {
    color: #ffffff;
    background-color: #555555;
  }
`;

const AddingPortfolioBtn = styled.p`
  pointer-events: none;
  font-size: 16px; ;
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
    <Wrapper>
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
        <AddingPortfolio
          to={"/portfolio/create"}
          onClick={() => {
            dispatch(setPortfolioIndex(index));
          }}
        >
          <AddingPortfolioBtn>新增作品集</AddingPortfolioBtn>
        </AddingPortfolio>
      )}
    </Wrapper>
  );
};

export default PortfolioAreaCom;
