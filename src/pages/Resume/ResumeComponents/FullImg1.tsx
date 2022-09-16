import React from "react";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FullImg1 = ({
  index,
  content,
  resumeCom,
  setResumeCom,
}: {
  index: number;
  content: resumeComContent;
  resumeCom: resumeComContent[];
  setResumeCom: (arr: resumeComContent[]) => void;
}) => {
  const { imageFileList, textList, setResumeReducerImage, setReducerText } =
    useUpdateResumeData({ index, content, resumeCom, setResumeCom });

  return (
    <Wrapper>
      {imageFileList.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setResumeReducerImage={setResumeReducerImage}
            listIndex={listIndex}
            image={content.image[listIndex]}
            style={{
              width: "800px",
              height: "200px",
              border: "1px solid",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default FullImg1;
