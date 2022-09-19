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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  width: 900px;
  flex-wrap: wrap;
  margin: 0 auto;
  z-index: 3;
`;

const PortfolioCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin: 20px 5px;
  &:hover {
    scale: 1.1;
  }
`;

const PortfolioImg = styled.div<{ img: string }>`
  width: 210px;
  height: 210px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  margin: 10px 0;
`;

const PortfolioTitle = styled.p`
  color: #555555;
  font-size: 20px;
`;

const AddingPortfolio = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 270px;
  border: 2px solid;
  border-radius: 5px;
  text-decoration: none;
  color: #555555;
  margin: 20px 5px;
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
  const dispatch = useDispatch();
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.website
  );

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
            <PortfolioImg img={content.image[portfolioListIndex]} />
            <PortfolioTitle>{content.text[portfolioListIndex]}</PortfolioTitle>
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
          <AddingPortfolioBtn>
            <FontAwesomeIcon icon={faBook} />
            {" 新增作品集"}
          </AddingPortfolioBtn>
        </AddingPortfolio>
      )}
    </Wrapper>
  );
};

export default PortfolioAreaCom;
