import React from "react";
import styled from "styled-components";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import EditText from "../../../utilis/EditText";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  width: 800px;
  margin: 0 auto;
  align-items: center;
`;

const TextAndImg2 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const { imageFileList, textList, setResumeReducerImage, setReducerText } =
    useUpdateResumeData({ index, content });

  return (
    <Wrapper>
      {textList.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            listIndex={listIndex}
            setReducerText={setReducerText}
            style={{
              width: "390px",
              padding: " 0 10px",
            }}
          />
        );
      })}
      {imageFileList.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setResumeReducerImage={setResumeReducerImage}
            listIndex={listIndex}
            image={content.image[listIndex]}
            style={{
              width: "390px",
              height: "200px",
              margin: "0 0 0 20px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default TextAndImg2;
