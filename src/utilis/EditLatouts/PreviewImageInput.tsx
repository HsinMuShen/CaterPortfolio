import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import { isPreviewReducer } from "../../reducers/IsPreviewContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import LargeLoading from "../LargeLoading";
import firebase from "../firebase";

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
      : "1px solid"};
  @media screen and (max-width: 1279px) {
    margin: 5px;
  }
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
  setReducerContent: (
    type: string,
    string: string,
    listIndex: number
  ) => Promise<void>;
  listIndex: number;
  image: string;
  style?: any;
}

const PreviewImageInput = ({
  setReducerContent,
  listIndex,
  image,
  style,
}: PreviewImageInputProps) => {
  const isPreviewData = useSelector(
    (state: RootState) => state.IsPreviewReducer
  );
  const [isLargeLoading, setIsLargeLoading] = useState<boolean>(false);

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
            onChange={async (e) => {
              setIsLargeLoading(true);
              const imageUrl = await firebase.getImageUrl(e.target.files![0]);
              setReducerContent("image", imageUrl, listIndex);
              setIsLargeLoading(false);
            }}
          />
        </ImageLabel>
      </ImagePreview>
      {isLargeLoading ? <LargeLoading backgroundColor={"#ffffffb3"} /> : null}
    </ImageContainer>
  );
};

export default PreviewImageInput;
