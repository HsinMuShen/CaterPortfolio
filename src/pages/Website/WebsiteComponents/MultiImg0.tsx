import React from "react";
import styled from "styled-components";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import { websiteComContent } from "../Website";
import useUpdateResumeData from "./WebsiteUpdateDataFunction";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 900px;
  @media screen and (max-width: 1279px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const MultiImg0 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const isRowBased = useMediaQuery("(min-width: 500px)");
  const { setReducerContent } = useUpdateResumeData({
    index,
    content,
  });
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
              width: isRowBased ? "440px" : "85vw",
              height: "240px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default MultiImg0;
