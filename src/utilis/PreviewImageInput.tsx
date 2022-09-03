import React, { useState } from "react";
import styled from "styled-components";

import preImage from "./cat.jpg";

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
  setResumeReducerImage: (file: File, listIndex: number) => void;
  listIndex: number;
  image: string;
}

const PreviewImageInput = ({
  setResumeReducerImage,
  listIndex,
  image,
}: PreviewImageInputProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : image;
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
