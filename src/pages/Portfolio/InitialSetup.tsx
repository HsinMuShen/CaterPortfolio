import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../../utilis/firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { portfolioInitialSetup, websiteFillContent } from "../../action";

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

const InitialSetup = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : cater;
  const websiteReducer = useSelector(
    (state: RootState) => state.WebsiteReducer
  );
  const portfolioIndex = useSelector(
    (state: RootState) => state.PortfolioIndex
  );
  const dispatch = useDispatch();

  const setPortfolioMainImage = async (file: File) => {
    const imageUrl = await firebase.getImageUrl(file);
    dispatch(portfolioInitialSetup("mainImage", imageUrl));
  };

  const setToWebsite = (text: string) => {
    const tempArr = websiteReducer.content[portfolioIndex.index].text;
    tempArr[websiteReducer.content[portfolioIndex.index].portfolioID.length] =
      text;
    websiteFillContent(portfolioIndex.index, tempArr);
    console.log(tempArr);
  };
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
        placeholder="Title"
        onChange={(e) => {
          dispatch(portfolioInitialSetup("title", e.target.value));
          //   setToWebsite(e.target.value);
        }}
      />
    </div>
  );
};

export default InitialSetup;
