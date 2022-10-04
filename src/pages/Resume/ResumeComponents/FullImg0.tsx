import React from "react";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";
import styled from "styled-components";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 1279px) {
    width: 71vw;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const FullImg0 = ({
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
  const isRowBased = useMediaQuery("(min-width: 1279px)");

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
              width: isRowBased ? "800px" : "70vw",
              height: "350px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default FullImg0;
