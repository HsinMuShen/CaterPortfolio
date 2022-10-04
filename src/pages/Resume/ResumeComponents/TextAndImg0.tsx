import React from "react";
import styled from "styled-components";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import EditText from "../../../utilis/EditText";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

const Wrapper = styled.div`
  display: flex;
  width: 800px;
  margin: 0 auto;
  align-items: center;
  @media screen and (max-width: 1279px) {
    width: 71vw;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const TextAndImg0 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const { setReducerContent } = useUpdateResumeData({
    index,
    content,
  });
  const isRowBased = useMediaQuery("(min-width: 700px)");
  return (
    <Wrapper>
      {content.image.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setReducerContent={setReducerContent}
            listIndex={listIndex}
            image={content.image[listIndex]}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              margin: isRowBased ? "20px 100px 20px 80px" : "0px auto 20px",
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
            setReducerContent={setReducerContent}
            index={index}
            style={{
              width: isRowBased ? "520px" : "70vw",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default TextAndImg0;
