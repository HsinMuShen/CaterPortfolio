import React from "react";
import styled from "styled-components";
import PreviewImageInput from "../../../utilis/EditLatouts/PreviewImageInput";
import EditText from "../../../utilis/EditLatouts/EditText";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

const Wrapper = styled.div`
  display: flex;
  width: 800px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1279px) {
    width: 71vw;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Text2 = ({
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
  const isRowBased = useMediaQuery("(min-width: 370px)");
  return (
    <Wrapper>
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
              width: isRowBased ? "250px" : "70vw",
              margin: "10px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default Text2;
