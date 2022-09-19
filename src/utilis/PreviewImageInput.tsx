import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImagePreview = styled.div<{
  previewUrl: string;
  style: any;
  isPreview: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-image: url(${(props) => props.previewUrl});
  background-size: cover;
  ${(props) => props.style}
  border: ${(props) => (props.isPreview ? "0px solid" : "1px solid")}
`;
const ImageLabel = styled.label`
  font-size: 150%;
  cursor: pointer;
`;
const ImageInput = styled.input`
  display: none;
`;

interface PreviewImageInputProps {
  setResumeReducerImage: (file: File, listIndex: number) => void;
  listIndex: number;
  image: string;
  style?: any;
}

const PreviewImageInput = ({
  setResumeReducerImage,
  listIndex,
  image,
  style,
}: PreviewImageInputProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.resume
  );

  return (
    <ImageContainer>
      <ImagePreview previewUrl={image} style={style} isPreview={isPreview}>
        <ImageLabel>
          {isPreview ? null : "+"}

          <ImageInput
            type="file"
            id="postImage"
            disabled={isPreview}
            onChange={(e) => {
              setImageFile(e.target.files![0]);
              setResumeReducerImage(e.target.files![0], listIndex);
            }}
          />
        </ImageLabel>
      </ImagePreview>
    </ImageContainer>
  );
};

export default PreviewImageInput;
