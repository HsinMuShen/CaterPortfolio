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
  websiteAddPortfolioID,
} from "../../action";

import cater from "../../utilis/cater.png";

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ImagePreview = styled.div<{ previewUrl: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: solid 1px black;
  border-radius: 90px;
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

const InitialSetup = ({ portfolioID }: { portfolioID: string | undefined }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  const previewUrl = imageFile
    ? URL.createObjectURL(imageFile)
    : portfolioID === "create"
    ? cater
    : portfolioReducer.mainImage;

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
    if (portfolioID === undefined) {
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
      const portID = v4();
      dispatch(portfolioInitialSetup("portfolioID", portID));
      const tempArr = websiteReducer.content[portfolioIndex.index].portfolioID;
      tempArr[websiteReducer.content[portfolioIndex.index].portfolioID.length] =
        portID;
      dispatch(websiteAddPortfolioID(portfolioIndex.index, tempArr));
    }
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <ImageContainer>
        <ImagePreview previewUrl={previewUrl}>
          <ImageLabel>
            +
            <ImageInput
              type="file"
              id="postImage"
              onChange={(e) => {
                setImageFile(e.target.files![0]);
                setPortfolioMainImage(e.target.files![0]);
              }}
            />
          </ImageLabel>
        </ImagePreview>
      </ImageContainer>
      <input
        type="text"
        placeholder={
          portfolioID === "create" ? "Title" : portfolioReducer.title
        }
        onChange={(e) => {
          dispatch(portfolioInitialSetup("title", e.target.value));
          setToWebsite(e.target.value);
        }}
      />
    </div>
  );
};

export default InitialSetup;
