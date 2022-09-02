import React, { useState } from "react";
import styled from "styled-components";

import cater from "./cater.png";

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

interface PreviewImageInputProps {
  imageFileList: string[] | null[];
  setImageFileList: any;
  setResumeReducerImage: (file: File, listIndex: number) => void;
  listIndex: number;
}

const PreviewImageInput = ({
  imageFileList,
  setImageFileList,
  setResumeReducerImage,
  listIndex,
}: PreviewImageInputProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : cater;
  return (
    <ImageContainer>
      <ImagePreview previewUrl={previewUrl}>
        <ImageLabel>
          +
          <ImageInput
            type="file"
            id="postImage"
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
