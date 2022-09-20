import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../utilis/firebase";
import { v4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import {
  portfolioInitialSetup,
  websiteFillContent,
  websiteAddImage,
  websiteChangePortfolioID,
} from "../../action";
import InitialImg from "../../utilis/cater.png";

import cater from "../../utilis/cater.png";

const Wrapper = styled.div`
  display: flex;
  width: 900px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 40px;
  background-color: #eaeaea;
  border-radius: 15px;
`;

const Intro = styled.p`
  margin-top: 40px;
`;

const SettingArea = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 40px 40px 40px 0;
`;

const ImagePreview = styled.div<{ previewUrl: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 210px;
  border: solid 1px black;
  background-position: center;
  background-image: url(${(props) => props.previewUrl});
  background-size: cover;
`;
const ImageLabel = styled.label`
  font-size: 150%;
  cursor: pointer;
`;
const ImageInput = styled.input`
  display: none;
`;

const InputFrame = styled.input`
  width: 200px;
  height: 40px;
`;

const InitialSetup = ({ portfolioID }: { portfolioID: string | undefined }) => {
  const websiteReducer = useSelector(
    (state: RootState) => state.WebsiteReducer
  );
  const portfolioReducer = useSelector(
    (state: RootState) => state.PortfolioReducer
  );
  const portfolioIndex = useSelector(
    (state: RootState) => state.PortfolioIndex
  );
  const dispatch = useDispatch();

  const setPortfolioMainImage = async (file: File) => {
    const imageUrl = await firebase.getImageUrl(file);
    dispatch(portfolioInitialSetup("mainImage", imageUrl));
    const tempArr = websiteReducer.content[portfolioIndex.index].image;
    if (portfolioID === "create") {
      tempArr[
        websiteReducer.content[portfolioIndex.index].portfolioID.length - 1
      ] = imageUrl;
    } else {
      tempArr[portfolioIndex.portfolioListIndex] = imageUrl;
    }

    dispatch(websiteAddImage(portfolioIndex.index, tempArr));
  };

  const setToWebsite = (text: string) => {
    const tempArr = websiteReducer.content[portfolioIndex.index].text;
    if (portfolioID === "create") {
      tempArr[
        websiteReducer.content[portfolioIndex.index].portfolioID.length - 1
      ] = text;
    } else {
      tempArr[portfolioIndex.portfolioListIndex] = text;
    }

    dispatch(websiteFillContent(portfolioIndex.index, tempArr));
  };

  useEffect(() => {
    if (portfolioID === "create") {
      setToWebsite("title");
      const tempArr = websiteReducer.content[portfolioIndex.index].image;
      tempArr[
        websiteReducer.content[portfolioIndex.index].portfolioID.length - 1
      ] = InitialImg;
      dispatch(websiteAddImage(portfolioIndex.index, tempArr));
    }
  }, []);
  return (
    <Wrapper>
      <Intro>請先新增顯示在網站頁面的圖片與標題</Intro>
      <SettingArea>
        <ImageContainer>
          <ImagePreview previewUrl={portfolioReducer.mainImage}>
            <ImageLabel>
              +
              <ImageInput
                type="file"
                id="postImage"
                onChange={(e) => {
                  setPortfolioMainImage(e.target.files![0]);
                }}
              />
            </ImageLabel>
          </ImagePreview>
        </ImageContainer>
        <InputFrame
          type="text"
          value={portfolioReducer.title}
          onChange={(e) => {
            dispatch(portfolioInitialSetup("title", e.target.value));
            setToWebsite(e.target.value);
          }}
        />
      </SettingArea>
    </Wrapper>
  );
};

export default InitialSetup;
