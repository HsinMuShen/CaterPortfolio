import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../reducers";
import { websiteReducer } from "../../reducers/WebsiteContent";
import {
  websiteAddImage,
  websiteChangeText,
  websiteLoading,
} from "../../action/WebsiteReducerAction";
import { portfolioInitialSetup } from "../../action/PortfolioReducerAction";

import firebase from "../../utilis/firebase";
import InitialImg from "../../utilis/cater.png";

const Wrapper = styled.div`
  display: flex;
  width: 900px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 40px;
  background-color: #eaeaea;
  border-radius: 15px;
  @media screen and (max-width: 1279px) {
    width: 85vw;
  }
`;

const Intro = styled.p`
  margin-top: 40px;
`;

const SettingArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media screen and (max-width: 799px) {
    width: 400px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 40px 40px 40px 0;
  @media screen and (max-width: 799px) {
    margin: 40px;
  }
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

const InitialSetup = ({
  portfolioID,
  websiteData,
  setIsLargeLoading,
}: {
  portfolioID: string | undefined;
  websiteData: websiteReducer;
  setIsLargeLoading: (value: boolean) => void;
}) => {
  const [haveWebsiteData, setHaveWebsiteData] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.UserReducer);
  const portfolioData = useSelector(
    (state: RootState) => state.PortfolioReducer
  );
  const portfolioIndex = useSelector(
    (state: RootState) => state.PortfolioIndex
  );
  const websiteContentIndex = Number(
    window.localStorage.getItem("websiteContentIndex")
  );
  const portfolioListIndex = Number(
    window.localStorage.getItem("portfolioListIndex")
  );
  const dispatch = useDispatch();

  const setPortfolioMainImage = async (file: File) => {
    setIsLargeLoading(true);
    const imageUrl = await firebase.getImageUrl(file);
    dispatch(portfolioInitialSetup("mainImage", imageUrl));
    const tempArr = [...websiteData.content[websiteContentIndex].image];
    if (portfolioID === "create") {
      tempArr[
        websiteData.content[websiteContentIndex].portfolioID!.length - 1
      ] = imageUrl;
    } else {
      tempArr[portfolioListIndex] = imageUrl;
    }

    dispatch(websiteAddImage(websiteContentIndex, tempArr));
    setIsLargeLoading(false);
  };

  const setToWebsite = (text: string) => {
    const tempArr = [...websiteData.content[websiteContentIndex].text];
    if (portfolioID === "create") {
      tempArr[
        websiteData.content[websiteContentIndex].portfolioID!.length - 1
      ] = text;
    } else {
      tempArr[portfolioListIndex] = text;
    }

    dispatch(websiteChangeText(websiteContentIndex, tempArr));
  };

  useEffect(() => {
    const loadWebsite = async () => {
      if (userData.userID) {
        const websiteData = await firebase.readData(
          "websites",
          `${userData.userID}`
        );
        if (websiteData) {
          dispatch(websiteLoading(websiteData));
          setHaveWebsiteData(true);
        }
      }
    };

    if (portfolioID === "create") {
      if (websiteData.content.length === 0) {
        loadWebsite();
      }

      if (websiteData.content.length > 0) {
        setToWebsite("title");
        const tempArr = [...websiteData.content[websiteContentIndex].image];
        tempArr[
          websiteData.content[websiteContentIndex].portfolioID!.length - 1
        ] = InitialImg;
        dispatch(websiteAddImage(websiteContentIndex, tempArr));
      }
    }
  }, [userData, haveWebsiteData]);
  return (
    <Wrapper>
      <Intro>請先新增顯示在網站頁面的圖片與標題</Intro>
      <SettingArea>
        <ImageContainer>
          <ImagePreview previewUrl={portfolioData.mainImage}>
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
          value={portfolioData.title}
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
