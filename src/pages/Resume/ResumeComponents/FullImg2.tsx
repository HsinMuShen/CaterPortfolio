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

const FullImg2 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const { imageFileList, setResumeReducerImage, setReducerText } =
    useUpdateResumeData({ index, content });

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
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default FullImg2;