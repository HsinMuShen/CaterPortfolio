import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import { isPreviewReducer } from "../reducers/IsPreviewContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImagePreview = styled.div<{
  previewUrl: string;
  style: any;
  isPreviewData: isPreviewReducer;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-image: url(${(props) => props.previewUrl});
  background-size: cover;
  ${(props) => props.style}
  border: ${(props) =>
    props.isPreviewData.resume &&
    props.isPreviewData.website &&
    props.isPreviewData.portfolio
      ? "0px solid"
      : "1px solid"}
`;
const ImageLabel = styled.label`
  font-size: 150%;
  cursor: pointer;
`;

const AddImgBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffffb3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const ImageInput = styled.input`
  display: none;
`;

interface PreviewImageInputProps {
  setPreviewReducerImage: (file: File, listIndex: number) => void;
  listIndex: number;
  image: string;
  style?: any;
}

const PreviewImageInput = ({
  setPreviewReducerImage,
  listIndex,
  image,
  style,
}: PreviewImageInputProps) => {
  const isPreviewData = useSelector(
    (state: RootState) => state.IsPreviewReducer
  );

  return (
    <ImageContainer>
      <ImagePreview
        previewUrl={image}
        style={style}
        isPreviewData={isPreviewData}
      >
        <ImageLabel>
          {isPreviewData.resume &&
          isPreviewData.website &&
          isPreviewData.portfolio ? null : (
            <AddImgBtn>
              <FontAwesomeIcon icon={faPlus} />
            </AddImgBtn>
          )}

          <ImageInput
            type="file"
            id="postImage"
            onChange={(e) => {
              setPreviewReducerImage(e.target.files![0], listIndex);
            }}
          />
        </ImageLabel>
      </ImagePreview>
    </ImageContainer>
  );
};

export default PreviewImageInput;
