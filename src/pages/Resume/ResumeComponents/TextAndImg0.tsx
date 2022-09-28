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

const TextAndImg0 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const { setResumeReducerImage, setReducerText } = useUpdateResumeData({
    index,
    content,
  });
  return (
    <Wrapper>
      {content.image.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setResumeReducerImage={setResumeReducerImage}
            listIndex={listIndex}
            image={content.image[listIndex]}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              margin: "0 100px 0 80px",
            }}
          />
        );
      })}

      {content.text.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            id={content.id}
            listIndex={listIndex}
            setReducerText={setReducerText}
            style={{
              width: "520px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default TextAndImg0;
